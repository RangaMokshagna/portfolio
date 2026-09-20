import {
  type GitHubRepo,
  type ProcessedRepo,
  excludedRepoNames,
  repoOverrides,
  fallbackGitHubRepos,
} from "@/data/projects";

const GITHUB_USERNAME = "RangaMokshagna";

/**
 * Clean up repo name: replace hyphens/underscores with spaces and convert to Title Case.
 */
export function formatRepoTitle(name: string): string {
  return name
    .replace(/[-_]+/g, " ")
    .trim()
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Format ISO date string to "Updated <Month Year>" (e.g. "Updated Aug 2026").
 */
export function formatUpdatedDate(isoDate: string): string {
  try {
    const date = new Date(isoDate);
    const formatted = new Intl.DateTimeFormat("en-US", {
      month: "short",
      year: "numeric",
    }).format(date);
    return `Updated ${formatted}`;
  } catch {
    return "Recently updated";
  }
}

/**
 * Extract the first meaningful sentence or line from a raw README markdown string.
 * Strips badges, markdown headings, HTML, and truncates to 140 characters.
 */
export function extractReadmeDescription(markdown: string): string | null {
  if (!markdown) return null;

  const lines = markdown.split(/\r?\n/);
  for (const rawLine of lines) {
    let line = rawLine.trim();

    // Skip empty lines, code fences, markdown tables, and separators
    if (
      !line ||
      line.startsWith("```") ||
      line.startsWith("|") ||
      line.startsWith("---") ||
      line.startsWith("===")
    ) {
      continue;
    }

    // Strip markdown image badges [![...](...)](...) and ![...](...)
    line = line.replace(/\[!\[.*?\]\(.*?\)\]\(.*?\)/g, "").trim();
    line = line.replace(/!\[.*?\]\(.*?\)/g, "").trim();

    // Strip markdown links [text](url) -> text
    line = line.replace(/\[(.*?)\]\(.*?\)/g, "$1").trim();

    // Strip header prefixes (#, ##, ###)
    line = line.replace(/^#+\s*/, "").trim();

    // Strip blockquote prefixes (> )
    line = line.replace(/^>\s*/, "").trim();

    // Strip basic HTML tags
    line = line.replace(/<[^>]*>/g, "").trim();

    // Skip short or empty lines remaining
    if (line.length < 15) continue;

    // Truncate to 140 characters
    if (line.length > 140) {
      return line.slice(0, 137).trim() + "...";
    }

    return line;
  }

  return null;
}

/**
 * Fetch raw README from GitHub for fallback descriptions.
 */
async function fetchReadmeFallback(
  repoName: string,
  headers: HeadersInit
): Promise<string | null> {
  try {
    const res = await fetch(
      `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${repoName}/main/README.md`,
      {
        headers,
        next: { revalidate: 3600 },
      }
    );

    if (res.ok) {
      const text = await res.text();
      return extractReadmeDescription(text);
    }
  } catch {
    // Non-critical, return null if unavailable
  }

  return null;
}

/**
 * Server-side fetching of public GitHub repositories.
 * Cached for 3600 seconds (1 hour). Falls back to static data if unavailable.
 */
export async function getGitHubRepos(): Promise<ProcessedRepo[]> {
  const headers: HeadersInit = {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "RangaMokshagna-Portfolio",
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=pushed`,
      {
        headers,
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) {
      console.warn(
        `GitHub API returned ${res.status}: ${res.statusText}. Using fallback static repositories.`
      );
      return fallbackGitHubRepos;
    }

    const repos: GitHubRepo[] = await res.json();

    // Filter out forks, archived, excluded repos, and explicitly hidden overrides
    const filtered = repos.filter((repo) => {
      if (repo.fork || repo.archived) return false;
      if (excludedRepoNames.includes(repo.name)) return false;

      const override = repoOverrides[repo.name];
      if (override?.hidden) return false;

      return true;
    });

    // Process each repo with descriptions and overrides
    const processedPromises: Promise<ProcessedRepo | null>[] = filtered.map(
      async (repo) => {
        const override = repoOverrides[repo.name];

        let description =
          override?.description ||
          repo.description ||
          (await fetchReadmeFallback(repo.name, headers));

        // Skip repos that have neither description nor readable README
        if (!description) {
          return null;
        }

        if (description.length > 140) {
          description = description.slice(0, 137).trim() + "...";
        }

        const title = override?.title || formatRepoTitle(repo.name);
        const topics = Array.isArray(repo.topics)
          ? repo.topics.slice(0, 4)
          : [];

        return {
          id: String(repo.id),
          name: repo.name,
          title,
          description,
          url: repo.html_url,
          homepage: repo.homepage || undefined,
          language: repo.language || undefined,
          topics,
          stars: repo.stargazers_count || 0,
          updatedAt: formatUpdatedDate(repo.pushed_at),
          screenshot: override?.screenshot,
          pinned: override?.pinned,
        };
      }
    );

    const results = await Promise.all(processedPromises);
    const validRepos = results.filter((r): r is ProcessedRepo => r !== null);

    if (validRepos.length === 0) {
      return fallbackGitHubRepos;
    }

    // Sort: pinned first, then preserve recent pushed order
    validRepos.sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      return 0;
    });

    return validRepos.slice(0, 6);
  } catch (err) {
    console.error("Error fetching repositories from GitHub:", err);
    return fallbackGitHubRepos;
  }
}

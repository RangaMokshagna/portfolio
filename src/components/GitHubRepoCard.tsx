"use client";

import Image from "next/image";
import { GlassCard } from "./GlassCard";
import type { ProcessedRepo } from "@/data/projects";

// Language color mapping for dot indicator
const languageColors: Record<string, string> = {
  Python: "#3572A5",
  JavaScript: "#F7DF1E",
  TypeScript: "#3178C6",
  HTML: "#E34C26",
  CSS: "#563D7C",
  "Jupyter Notebook": "#DA5B0B",
  C: "#555555",
  "C++": "#F34B7D",
  Java: "#B07219",
  Shell: "#89E051",
  Go: "#00ADD8",
  Rust: "#DEA584",
};

interface GitHubRepoCardProps {
  repo: ProcessedRepo;
}

export function GitHubRepoCard({ repo }: GitHubRepoCardProps) {
  const dotColor = repo.language
    ? languageColors[repo.language] || "#8B949E"
    : null;

  return (
    <GlassCard className="flex flex-col h-full p-5 md:p-6" tilt={true}>
      {/* Optional Screenshot */}
      {repo.screenshot && (
        <div className="relative w-full h-36 mb-4 rounded-xl overflow-hidden bg-black/20">
          <Image
            src={repo.screenshot}
            alt={`${repo.title} screenshot`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="lazy"
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      )}

      {/* Header: Title & Pin/Stars */}
      <div className="flex items-start justify-between gap-3 mb-2">
        <h4 className="font-serif text-lg md:text-xl leading-snug tracking-tight text-[var(--text-primary)]">
          {repo.title}
        </h4>
        <div className="flex items-center gap-2 shrink-0">
          {repo.pinned && (
            <span
              className="text-[10px] uppercase font-semibold tracking-wider px-2 py-0.5 rounded-full bg-white/10 dark:bg-white/5 border border-white/15 text-[var(--text-secondary)]"
              title="Pinned project"
            >
              Pinned
            </span>
          )}
          {repo.stars > 0 && (
            <span className="flex items-center gap-1 text-xs text-[var(--text-secondary)]">
              <svg
                className="w-3.5 h-3.5 text-amber-400 fill-current"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {repo.stars}
            </span>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed mb-4 flex-grow">
        {repo.description}
      </p>

      {/* Meta: Language & Topics */}
      <div className="space-y-3 mb-5 pt-3 border-t border-white/10 dark:border-white/5">
        <div className="flex items-center justify-between text-xs text-[var(--text-secondary)]">
          {repo.language && (
            <div className="flex items-center gap-1.5">
              <span
                className="w-2.5 h-2.5 rounded-full inline-block"
                style={{ backgroundColor: dotColor || "#8B949E" }}
                aria-hidden="true"
              />
              <span className="font-medium text-[var(--text-primary)]">
                {repo.language}
              </span>
            </div>
          )}
          <span>{repo.updatedAt}</span>
        </div>

        {/* Topic Chips */}
        {repo.topics.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {repo.topics.map((topic) => (
              <span
                key={topic}
                className="glass-chip px-2.5 py-0.5 text-[11px] text-[var(--text-secondary)]"
              >
                #{topic}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3 pt-2 mt-auto">
        <a
          href={repo.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--text-primary)] hover:text-accent-blue transition-colors"
          aria-label={`View ${repo.title} source code on GitHub`}
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          GitHub ↗
        </a>

        {repo.homepage && (
          <a
            href={repo.homepage}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-medium text-accent-blue dark:text-accent-blue-light hover:underline ml-auto"
            aria-label={`Visit live demo for ${repo.title}`}
          >
            Live Demo ↗
          </a>
        )}
      </div>
    </GlassCard>
  );
}

/**
 * Glass Skeleton Card for loading state (zero layout shift)
 */
export function GitHubRepoCardSkeleton() {
  return (
    <GlassCard className="flex flex-col h-[280px] p-5 md:p-6 animate-pulse" tilt={false}>
      <div className="h-6 w-3/4 bg-white/10 dark:bg-white/5 rounded-md mb-3" />
      <div className="h-4 w-full bg-white/10 dark:bg-white/5 rounded-md mb-2" />
      <div className="h-4 w-5/6 bg-white/10 dark:bg-white/5 rounded-md mb-6" />
      <div className="mt-auto space-y-3 pt-3 border-t border-white/10 dark:border-white/5">
        <div className="flex justify-between">
          <div className="h-3 w-16 bg-white/10 dark:bg-white/5 rounded-md" />
          <div className="h-3 w-20 bg-white/10 dark:bg-white/5 rounded-md" />
        </div>
        <div className="flex gap-1.5">
          <div className="h-4 w-12 bg-white/10 dark:bg-white/5 rounded-full" />
          <div className="h-4 w-14 bg-white/10 dark:bg-white/5 rounded-full" />
        </div>
      </div>
    </GlassCard>
  );
}

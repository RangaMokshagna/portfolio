import { profile } from "@/data/profile";

/**
 * Footer — copyright and direct profile links.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="px-6 py-6 text-center border-t border-black/10 dark:border-white/5">
      <div className="flex items-center justify-center gap-6 mb-3">
        <a
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          aria-label="GitHub profile of Ranga Mokshagna"
        >
          GitHub
        </a>
        <span className="text-[var(--text-secondary)] opacity-40">•</span>
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          aria-label="LinkedIn profile of Ranga Mokshagna Jayavaram"
        >
          LinkedIn
        </a>
        <span className="text-[var(--text-secondary)] opacity-40">•</span>
        <a
          href={`mailto:${profile.email}`}
          className="text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          aria-label={`Send email to ${profile.email}`}
        >
          Email
        </a>
        <span className="text-[var(--text-secondary)] opacity-40">•</span>
        <a
          href={profile.resume}
          download="Ranga_Mokshagna_Resume.pdf"
          className="text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          aria-label="Download resume (PDF)"
        >
          Resume
        </a>
      </div>
      <p className="text-xs text-[var(--text-secondary)]">
        © {year} {profile.name}.
      </p>
    </footer>
  );
}

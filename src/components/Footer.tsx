/**
 * Footer — copyright and direct profile links.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="px-6 py-10 text-center border-t border-white/10 dark:border-white/5">
      <div className="flex items-center justify-center gap-6 mb-4">
        <a
          href="https://github.com/RangaMokshagna"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          aria-label="GitHub profile of Ranga Mokshagna"
        >
          GitHub
        </a>
        <span className="text-[var(--text-secondary)] opacity-40">•</span>
        <a
          href="https://www.linkedin.com/in/ranga-mokshagna-jayavaram-3a1b33298/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          aria-label="LinkedIn profile of Ranga Mokshagna Jayavaram"
        >
          LinkedIn
        </a>
        <span className="text-[var(--text-secondary)] opacity-40">•</span>
        <a
          href="mailto:jayavaramrangamokshagna@gmail.com"
          className="text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          aria-label="Send email to jayavaramrangamokshagna@gmail.com"
        >
          Email
        </a>
      </div>
      <p className="text-xs text-[var(--text-secondary)]">
        © {year} Ranga Mokshagna Jayavaram.
      </p>
    </footer>
  );
}

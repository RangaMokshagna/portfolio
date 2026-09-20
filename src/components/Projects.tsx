"use client";

import { useState, useEffect, useCallback, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  projects,
  fallbackGitHubRepos,
  type Project,
  type ProcessedRepo,
} from "@/data/projects";
import { GlassCard } from "./GlassCard";
import { ScrollReveal } from "./ScrollReveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import {
  GitHubRepoCard,
  GitHubRepoCardSkeleton,
} from "./GitHubRepoCard";

interface ProjectsProps {
  initialRepos?: ProcessedRepo[];
}

/**
 * Projects section — 3 large glass cards with key stats from resume,
 * followed by an automated "More Projects" grid fetched from GitHub.
 */
export function Projects({ initialRepos }: ProjectsProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [gitHubRepos, setGitHubRepos] = useState<ProcessedRepo[]>(() => {
    return initialRepos && initialRepos.length > 0
      ? initialRepos
      : fallbackGitHubRepos;
  });
  const [isLoading, setIsLoading] = useState(() => {
    return !initialRepos || initialRepos.length === 0;
  });

  // Only fetch client-side if initialRepos was not provided by server
  useEffect(() => {
    if (initialRepos && initialRepos.length > 0) {
      return;
    }

    let isMounted = true;
    fetch("/api/github-repos")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load GitHub repositories");
        return res.json();
      })
      .then((data: ProcessedRepo[]) => {
        if (isMounted && Array.isArray(data) && data.length > 0) {
          setGitHubRepos(data);
        }
      })
      .catch((err) => {
        console.warn("Using fallback GitHub projects due to fetch error:", err);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [initialRepos]);

  return (
    <section id="projects" className="px-6 py-24 md:py-32">
      <div className="max-w-content mx-auto">
        {/* Section Header */}
        <ScrollReveal>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-4 text-center">
            Featured Projects
          </h2>
          <p className="text-[var(--text-secondary)] text-center mb-14 max-w-md mx-auto">
            End-to-end builds — from data collection to deployment
          </p>
        </ScrollReveal>

        {/* 3 Main Featured Project Cards Grid */}
        <div className="grid gap-6 md:gap-8">
          {projects.map((project, i) => (
            <ScrollReveal key={project.id} delay={i * 0.1}>
              <ProjectCard
                project={project}
                onSelect={() => setSelectedProject(project)}
              />
            </ScrollReveal>
          ))}
        </div>

        {/* ── More Projects from GitHub ───────────────────────────────────── */}
        <div className="mt-24 md:mt-32">
          <ScrollReveal>
            <div className="text-center mb-10">
              <h3 className="font-serif text-2xl md:text-3xl mb-3">
                More Projects
              </h3>
              <p className="text-[var(--text-secondary)] text-sm max-w-md mx-auto">
                Open-source repositories and experiments from GitHub
              </p>
            </div>
          </ScrollReveal>

          {/* 3-col on desktop, 2-col on tablet, 1-col on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <GitHubRepoCardSkeleton key={i} />
              ))
            ) : (
              gitHubRepos.map((repo, i) => (
                <ScrollReveal key={repo.id} delay={i * 0.08}>
                  <GitHubRepoCard repo={repo} />
                </ScrollReveal>
              ))
            )}
          </div>

          {/* "View all on GitHub" glass capsule button */}
          <ScrollReveal delay={0.2}>
            <div className="mt-12 flex justify-center">
              <a
                href="https://github.com/RangaMokshagna"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-btn px-7 py-3 text-sm font-medium text-[var(--text-primary)] hover:text-white transition-colors"
                aria-label="View all repositories on GitHub"
              >
                <span className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  View all on GitHub ↗
                </span>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Modal for featured project */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */

function ProjectCard({
  project,
  onSelect,
}: {
  project: Project;
  onSelect: () => void;
}) {
  return (
    <GlassCard className="p-6 md:p-8 group" onClick={onSelect}>
      <article>
        {/* Title row */}
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3 className="font-serif text-xl md:text-2xl">{project.title}</h3>
          <span className="text-[var(--text-secondary)] text-xs shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
            Click for details →
          </span>
        </div>

        {/* Summary */}
        <p className="text-[var(--text-secondary)] text-sm md:text-base mb-6 max-w-2xl">
          {project.summary}
        </p>

        {/* Key metrics — big, scannable numbers */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {project.metrics.map((metric) => (
            <div key={metric.label}>
              <div className="font-serif text-2xl md:text-3xl font-normal tracking-tight">
                {metric.value}
              </div>
              <div className="text-[var(--text-secondary)] text-xs mt-1">
                {metric.label}
              </div>
            </div>
          ))}
        </div>

        {/* Tech chips */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-xs rounded-full
                bg-white/10 dark:bg-white/[0.06]
                border border-white/[0.12] dark:border-white/[0.08]
                backdrop-blur-sm
                text-[var(--text-secondary)]"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium text-accent-blue dark:text-accent-blue-light hover:underline"
            onClick={(e) => e.stopPropagation()}
            aria-label={`View ${project.title} on GitHub`}
          >
            GitHub ↗
          </a>
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium text-accent-blue dark:text-accent-blue-light hover:underline"
              onClick={(e) => e.stopPropagation()}
              aria-label={`View ${project.title} live demo`}
            >
              Live Demo ↗
            </a>
          )}
        </div>
      </article>
    </GlassCard>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */

function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const reduced = useReducedMotion();

  // Close on Escape
  const handleKeyDown = useCallback(
    (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  // Focus trap: re-focus close button on tab
  const handleModalKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Tab") {
      const focusable = e.currentTarget.querySelectorAll<HTMLElement>(
        'button, a[href], [tabindex]:not([tabindex="-1"])'
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-8"
      initial={reduced ? {} : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reduced ? {} : { opacity: 0 }}
      transition={{ duration: 0.2 }}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} project details`}
      onKeyDown={handleModalKeyDown}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal content */}
      <motion.div
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto
          bg-white/10 dark:bg-white/[0.06] backdrop-blur-[30px]
          border border-white/[0.18] dark:border-white/[0.10]
          rounded-2xl p-6 md:p-8 shadow-2xl"
        initial={reduced ? {} : { scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={reduced ? {} : { scale: 0.95, y: 20 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Top highlight */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none rounded-t-2xl" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full
            [-webkit-tap-highlight-color:transparent] transition-colors"
          aria-label="Close modal"
          autoFocus
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Title */}
        <h3 className="font-serif text-2xl md:text-3xl mb-2 pr-10">
          {project.title}
        </h3>
        <p className="text-[var(--text-secondary)] text-sm mb-6">
          {project.summary}
        </p>

        {/* Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {project.metrics.map((metric) => (
            <div key={metric.label}>
              <div className="font-serif text-2xl tracking-tight">
                {metric.value}
              </div>
              <div className="text-[var(--text-secondary)] text-xs mt-1">
                {metric.label}
              </div>
            </div>
          ))}
        </div>

        {/* Full description */}
        <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-6">
          {project.description}
        </p>

        {/* Conference (if any) */}
        {project.conference && (
          <p className="text-xs text-accent-blue dark:text-accent-blue-light mb-6 italic">
            {project.conference}
          </p>
        )}

        {/* Tech chips */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-xs rounded-full
                bg-white/10 dark:bg-white/[0.06]
                border border-white/[0.12] dark:border-white/[0.08]
                backdrop-blur-sm
                text-[var(--text-secondary)]"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-4">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-full text-sm font-medium
              bg-[var(--text-primary)] text-[var(--bg)]
              hover:opacity-90 transition-opacity"
            aria-label={`View ${project.title} on GitHub`}
          >
            View on GitHub
          </a>
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full text-sm font-medium
                bg-white/10 dark:bg-white/[0.06]
                border border-white/[0.18] dark:border-white/[0.10]
                [-webkit-tap-highlight-color:transparent]
                transition-colors"
              aria-label={`View ${project.title} live demo`}
            >
              Live Demo
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

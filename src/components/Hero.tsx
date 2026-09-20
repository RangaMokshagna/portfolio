"use client";

import { useEffect, useRef, useState } from "react";
import { ScrollReveal } from "./ScrollReveal";
import { profile } from "@/data/profile";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useScrollPosition } from "@/hooks/useScrollPosition";

/* ─── Stats row data ──────────────────────────────────────────────────────── */
const stats = [
  { value: 99.79, suffix: "%", label: "Model accuracy" },
  { value: 31103, suffix: "", label: "Real samples", format: "comma" },
  { value: 194, suffix: "", label: "Countries analyzed" },
] as const;

/* ─── Count-up hook ───────────────────────────────────────────────────────── */
function useCountUp(
  target: number,
  duration: number,
  active: boolean,
  reduced: boolean
) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!active) return;
    if (reduced) {
      setDisplay(target);
      return;
    }
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(eased * target);
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration, reduced]);

  return display;
}

/* ─── Single stat tile ────────────────────────────────────────────────────── */
function StatTile({
  value,
  suffix,
  label,
  format,
  active,
  reduced,
}: {
  value: number;
  suffix: string;
  label: string;
  format?: string;
  active: boolean;
  reduced: boolean;
}) {
  const count = useCountUp(value, 1.2, active, reduced);

  let displayed: string;
  if (format === "comma") {
    displayed = Math.round(count).toLocaleString("en-US");
  } else if (Number.isInteger(value)) {
    displayed = Math.round(count).toString();
  } else {
    displayed = count.toFixed(2);
  }

  return (
    <div className="relative flex-1 min-w-[90px] rounded-xl overflow-hidden
      bg-white/[0.06] dark:bg-white/[0.05]
      border border-white/[0.12] dark:border-white/[0.08]
      backdrop-blur-[16px] px-4 py-3 text-center
      [-webkit-tap-highlight-color:transparent]">
      {/* Gold top line */}
      <div
        className="absolute inset-x-0 top-0 h-[1.5px] pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, var(--accent), transparent)" }}
        aria-hidden="true"
      />
      <div className="font-serif text-2xl sm:text-3xl tracking-tight text-white dark:text-white leading-none mb-1">
        {displayed}{suffix}
      </div>
      <div className="text-[10px] sm:text-xs text-[var(--text-secondary)] leading-tight">
        {label}
      </div>
    </div>
  );
}

/* ─── Hero component ──────────────────────────────────────────────────────── */
export function Hero() {
  const reduced = useReducedMotion();
  const scrollY = useScrollPosition();
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);

  /* Observe stats row for count-up trigger */
  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* Scroll cue fades out after user scrolls past 80px */
  const showScrollCue = scrollY < 80;

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center px-6 pt-24 pb-16 overflow-hidden"
    >
      {/* ── Warm gold ambient glow (behind name, off-center left) ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[15%] top-[30%] w-[700px] h-[700px] rounded-full animate-gold-glow"
        style={{
          background: "radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)",
          filter: "blur(80px)",
          opacity: 0.9,
        }}
      />
      {/* ── Cool steel-blue ambient glow (bottom-right) ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[5%] bottom-[15%] w-[500px] h-[500px] rounded-full animate-cool-glow"
        style={{
          background: "radial-gradient(circle, rgba(59,90,150,0.12) 0%, transparent 70%)",
          filter: "blur(90px)",
          opacity: 0.9,
        }}
      />

      {/* ── Floating decorative glass shapes (hidden on mobile) ── */}
      <div
        aria-hidden="true"
        className="hidden lg:block pointer-events-none absolute left-[3%] top-[38%]
          w-[56px] h-[24px] rounded-full animate-float-shape-a
          border border-white/[0.09] bg-white/[0.04] backdrop-blur-[6px]"
      />
      <div
        aria-hidden="true"
        className="hidden lg:block pointer-events-none absolute left-[6%] top-[55%]
          w-[40px] h-[40px] rounded-full animate-float-shape-b
          border border-white/[0.07] bg-white/[0.03] backdrop-blur-[6px]"
      />
      <div
        aria-hidden="true"
        className="hidden lg:block pointer-events-none absolute right-[4%] top-[42%]
          w-[48px] h-[20px] rounded-full animate-float-shape-a
          border border-white/[0.08] bg-white/[0.04] backdrop-blur-[6px]"
        style={{ animationDelay: "3s" }}
      />

      {/* ── Main content ── */}
      <div className="relative z-10 max-w-content mx-auto text-center">

        {/* 1. Status chip */}
        <ScrollReveal delay={0.04}>
          <div className="inline-flex items-center gap-2 mb-7
            px-4 py-1.5 rounded-full
            bg-white/[0.07] dark:bg-white/[0.06]
            border border-white/[0.14] dark:border-white/[0.10]
            backdrop-blur-[16px]
            text-xs text-[var(--text-secondary)]">
            {/* Pulsing gold dot */}
            <span
              aria-hidden="true"
              className="w-2 h-2 rounded-full shrink-0 animate-status-pulse"
              style={{ background: "var(--accent)" }}
            />
            <span>Open to entry-level roles · Chennai</span>
          </div>
        </ScrollReveal>

        {/* 2. Name */}
        <ScrollReveal delay={0.08}>
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] tracking-tight leading-[1.08] mb-6">
            {profile.firstName}
            <br />
            {/* "Jayavaram" — gold gradient, italic */}
            <span
              className="italic"
              style={{
                background: "linear-gradient(90deg, var(--accent-soft) 0%, var(--accent) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {profile.lastName}
            </span>
          </h1>
        </ScrollReveal>

        {/* 4. Tagline */}
        <ScrollReveal delay={0.16}>
          <p className="font-sans text-lg md:text-xl text-[var(--text-primary)] opacity-70 dark:opacity-80 max-w-xl mx-auto mb-10 leading-relaxed">
            {profile.tagline}
          </p>
        </ScrollReveal>

        {/* 5. CTA buttons */}
        <ScrollReveal delay={0.24}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">

            {/* Primary — warm gold glass capsule */}
            <a
              href="#projects"
              className="relative inline-flex items-center justify-center overflow-hidden
                px-7 py-3 font-sans text-sm font-[600] rounded-full
                transition-all duration-200
                hover:-translate-y-[2px] active:scale-[0.97]
                [-webkit-tap-highlight-color:transparent]
                focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px]
                shadow-[0_6px_24px_-6px_var(--accent-deep)]"
              style={{
                background: `linear-gradient(135deg, var(--accent-soft) 0%, var(--accent) 100%)`,
                color: "var(--accent-text)",
              }}
              aria-label="View Projects"
            >
              {/* Top specular highlight */}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-1/2 pointer-events-none rounded-full"
                style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.35) 0%, transparent 100%)" }}
              />
              <span className="relative z-10">View Projects</span>
            </a>

            {/* Secondary — glass with thin gold hover border */}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-btn px-7 py-3 font-sans text-sm font-medium
                text-[var(--text-primary)] transition-colors duration-200
                hover:border-[var(--accent)]/40"
              style={{ border: "1px solid transparent" }}
              aria-label="Download resume PDF"
            >
              Download Resume
            </a>
          </div>
        </ScrollReveal>

        {/* 6. Stats row */}
        <ScrollReveal delay={0.3}>
          <div
            ref={statsRef}
            className="flex flex-row gap-3 sm:gap-4 justify-center mb-10 flex-wrap sm:flex-nowrap"
          >
            {stats.map((s) => (
              <StatTile
                key={s.label}
                value={s.value}
                suffix={s.suffix}
                label={s.label}
                format={"format" in s ? s.format : undefined}
                active={statsVisible}
                reduced={reduced}
              />
            ))}
          </div>
        </ScrollReveal>

        {/* 7. Social icons — gold on hover */}
        <ScrollReveal delay={0.36}>
          <div className="flex items-center justify-center gap-6">
            {/* GitHub */}
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-secondary)] transition-colors duration-200"
              style={{} as React.CSSProperties}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "")}
              aria-label={`GitHub profile of ${profile.name}`}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-secondary)] transition-colors duration-200"
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "")}
              aria-label={`LinkedIn profile of ${profile.name}`}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>

            {/* Email */}
            <a
              href={`mailto:${profile.email}`}
              className="text-[var(--text-secondary)] transition-colors duration-200"
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "")}
              aria-label={`Send email to ${profile.name}`}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </a>
          </div>
        </ScrollReveal>
      </div>

      {/* 8. Scroll cue */}
      <div
        aria-hidden="true"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 transition-opacity duration-500 pointer-events-none"
        style={{ opacity: showScrollCue ? 1 : 0 }}
      >
        <div className="flex flex-col items-center gap-1.5
          px-3 py-2 rounded-full
          bg-white/[0.06] dark:bg-white/[0.05]
          border border-white/[0.10] backdrop-blur-[12px]">
          <span className="text-[9px] uppercase tracking-widest text-[var(--text-secondary)]">
            Scroll
          </span>
          <svg
            className="w-3 h-3 text-[var(--text-secondary)] animate-scroll-cue"
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
      </div>
    </section>
  );
}

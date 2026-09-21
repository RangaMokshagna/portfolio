"use client";

import { useEffect, useState } from "react";
import { ScrollReveal } from "./ScrollReveal";
import { profile } from "@/data/profile";

export function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-[100svh] flex items-center justify-center px-6 pt-[var(--section-pt)] pb-16 overflow-hidden"
    >
      {/* ── Ambient Background Glow ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(90,110,150,0.14) 0%, transparent 65%)",
          filter: "blur(120px)",
        }}
      />

      {/* ── Main Layout (Two Columns on Desktop) ── */}
      <div className="relative z-10 w-full max-w-[1200px] mx-auto flex flex-col lg:flex-row items-center lg:justify-between gap-12 lg:gap-8">
        
        {/* ── Left Column: Text Content ── */}
        <div className="w-full lg:w-[55%] flex flex-col items-start text-left shrink-0">
          
          <ScrollReveal delay={0.08}>
            <h1 className="font-serif text-[12vw] leading-[1.05] sm:text-7xl lg:text-[5.5rem] tracking-tight mb-5 lg:mb-6 text-white dark:text-white">
              <span className="block text-gray-800 dark:text-[#C9CDD6]">{profile.firstName}</span>
              <span className="block italic text-gray-500 dark:text-[#A6ABB8]">{profile.lastName}</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.16}>
            <p className="font-sans text-lg lg:text-xl text-gray-600 dark:text-[#A6ABB8] max-w-[30ch] mb-8 lg:mb-10 leading-relaxed">
              {profile.tagline}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.24}>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10 w-full sm:w-auto">
              
              {/* Primary CTA */}
              <button
                onClick={() => {
                  import("@/lib/scrollUtils").then((mod) => mod.scrollToSection("projects"));
                }}
                className="relative inline-flex items-center justify-center overflow-hidden px-7 py-3 font-sans text-sm font-[600] rounded-full transition-all duration-200
                  bg-[rgba(11,13,18,0.92)] text-white dark:bg-[rgba(255,255,255,0.92)] dark:text-[#0B0D12] 
                  backdrop-blur-xl [-webkit-tap-highlight-color:transparent]
                  shadow-[0_8px_20px_-6px_rgba(0,0,0,0.2)]
                  hover:-translate-y-[2px] active:scale-[0.97]
                  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[#0B0D12] dark:focus-visible:outline-white
                  before:absolute before:inset-x-0 before:top-0 before:h-1/2 before:bg-gradient-to-b before:from-white/25 dark:before:from-white/80 before:to-transparent before:z-0 before:pointer-events-none"
                aria-label="View Projects"
              >
                <span className="relative z-10">View Projects</span>
              </button>

              {/* Secondary CTA */}
              <a
                href={profile.resume}
                download="Ranga_Mokshagna_Resume.pdf"
                className="glass-btn flex items-center justify-center gap-2 px-7 py-3 font-sans text-sm font-medium
                  text-[var(--text-primary)] hover:text-white transition-colors duration-200 text-center"
                aria-label="Download resume (PDF)"
              >
                <svg className="w-[18px] h-[18px] text-current" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
                Download Resume
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.32}>
            <div className="flex items-center gap-6">
              {/* GitHub */}
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 dark:text-[#7A7F8D] hover:text-gray-900 dark:hover:text-white transition-colors duration-200" aria-label={`GitHub profile of ${profile.name}`}>
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              {/* LinkedIn */}
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 dark:text-[#7A7F8D] hover:text-gray-900 dark:hover:text-white transition-colors duration-200" aria-label={`LinkedIn profile of ${profile.name}`}>
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              {/* Email */}
              <a href={`mailto:${profile.email}`} className="text-gray-400 dark:text-[#7A7F8D] hover:text-gray-900 dark:hover:text-white transition-colors duration-200" aria-label={`Send email to ${profile.name}`}>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </a>
            </div>
          </ScrollReveal>
        </div>

        {/* ── Right Column: The Visual (Giant Text) ── */}
        <div className="w-full lg:w-[45%] h-[220px] sm:h-[280px] lg:h-[350px] flex items-center justify-center lg:justify-end shrink-0 relative mt-12 lg:mt-0">
          
          {/* Giant Word (Backdrop) */}
          <div 
            className={`absolute lg:right-[-10%] whitespace-nowrap text-right font-serif pointer-events-none select-none transition-opacity duration-1000 delay-500 ${
              mounted ? "opacity-[0.06] dark:opacity-[0.08]" : "opacity-0"
            }`}
            style={{
              fontSize: "clamp(34vw, 22vw, 300px)",
              lineHeight: 0.85,
              color: "var(--text-primary)"
            }}
            aria-hidden="true"
          >
            DATA<br/>&amp; ML
          </div>


        </div>
      </div>
    </section>
  );
}

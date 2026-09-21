"use client";

import { ScrollReveal } from "./ScrollReveal";
import { GlassCard } from "./GlassCard";
import { profile } from "@/data/profile";

/**
 * Contact section — glass card with email, location, phone, and social links.
 */
export function Contact() {
  return (
    <section id="contact" className="px-6 pt-[var(--section-pt)] pb-8 flex-1 flex flex-col items-center justify-start min-h-[700px]:justify-center">
      <div className="max-w-[1040px] w-full mx-auto">
        <ScrollReveal>
          <div data-scroll-target className="text-center mb-8">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-3">
              Get in Touch
            </h2>
            <p className="text-[var(--text-secondary)] max-w-md mx-auto">
              Open to opportunities, collaborations, or just a good conversation about data.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <GlassCard className="px-6 py-8 md:px-14 md:py-11 w-full" tilt={false}>
            {/* Flex container: row on desktop, column on mobile */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between">
              
              {/* Left Side: Email, Phone, Location */}
              <div className="flex flex-col space-y-6">
                
                {/* Email */}
                <div className="flex items-center gap-4">
                  <div className="w-[60px] h-[60px] rounded-xl bg-black/5 dark:bg-white/[0.06] flex items-center justify-center shrink-0">
                    <svg className="w-7 h-7 text-gray-700 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-base text-[var(--text-secondary)] mb-0.5">Email</p>
                    <a href={`mailto:${profile.email}`} className="text-[22px] hover:underline underline-offset-4 decoration-white/30 transition-all break-all" aria-label={`Send email to ${profile.email}`}>
                      {profile.email}
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-4">
                  <div className="w-[60px] h-[60px] rounded-xl bg-black/5 dark:bg-white/[0.06] flex items-center justify-center shrink-0">
                    <svg className="w-7 h-7 text-gray-700 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.48-4.18-7.076-7.076l1.293-.97c.362-.271.527-.733.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-base text-[var(--text-secondary)] mb-0.5">Phone</p>
                    <a href={`tel:${profile.phone.replace(/\s+/g, '')}`} className="text-[22px] hover:underline underline-offset-4 decoration-white/30 transition-all" aria-label={`Call ${profile.phone}`}>
                      {profile.phone}
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-4">
                  <div className="w-[60px] h-[60px] rounded-xl bg-black/5 dark:bg-white/[0.06] flex items-center justify-center shrink-0">
                    <svg className="w-7 h-7 text-gray-700 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-base text-[var(--text-secondary)] mb-0.5">Location</p>
                    <p className="text-[22px]">{profile.location}</p>
                  </div>
                </div>
              </div>

              {/* Divider: horizontal on mobile, vertical on desktop */}
              <hr className="my-6 lg:my-0 lg:mx-10 border-t lg:border-t-0 lg:border-l border-black/10 dark:border-white/10 lg:h-32" />

              {/* Right Side: Social links */}
              <div className="flex items-center gap-5">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-[60px] h-[60px] rounded-xl bg-black/5 dark:bg-white/[0.06] flex items-center justify-center
                    [-webkit-tap-highlight-color:transparent] hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                  aria-label="GitHub profile"
                >
                  <svg className="w-7 h-7 text-gray-700 dark:text-gray-300" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-[60px] h-[60px] rounded-xl bg-black/5 dark:bg-white/[0.06] flex items-center justify-center
                    [-webkit-tap-highlight-color:transparent] hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                  aria-label="LinkedIn profile"
                >
                  <svg className="w-7 h-7 text-gray-700 dark:text-gray-300" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>
          </GlassCard>
        </ScrollReveal>
      </div>
    </section>
  );
}

"use client";

import { ScrollReveal } from "./ScrollReveal";
import { GlassCard } from "./GlassCard";
import { ProfilePhotoFrame } from "./ProfilePhotoFrame";
import { profile } from "@/data/profile";

/**
 * About section — two-column layout on desktop:
 * - Left column: profile photo inside a liquid glass frame (centered on mobile)
 * - Right column: bio paragraph + education card
 */
export function About() {
  return (
    <section id="about" className="px-6 section-padding">
      <div className="max-w-[1200px] mx-auto">
        <ScrollReveal>
          <div data-scroll-target className="mb-12 md:mb-16 text-center">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl">
              About
            </h2>
          </div>
        </ScrollReveal>

        {/* Two-column layout on desktop; stacked on mobile with photo first */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 lg:gap-16 items-center">
          {/* Left Column: Portrait Photo Frame (md: 5 cols) */}
          <div className="md:col-span-5 flex justify-center">
            <ScrollReveal delay={0.1}>
              <ProfilePhotoFrame />
            </ScrollReveal>
          </div>

          {/* Right Column: Bio + Education (md: 7 cols) */}
          <div className="md:col-span-7 space-y-8">
            {/* Bio Paragraph */}
            <ScrollReveal delay={0.2}>
              <p className="text-[var(--text-secondary)] text-base md:text-lg leading-relaxed">
                I&apos;m a Computer Science Engineering student specializing in Big Data Analytics, with a strong interest in data, technology, and problem-solving. I enjoy working with real-world datasets, building machine learning solutions, and developing applications that turn complex data into meaningful insights. My experience includes Python, SQL, machine learning, data analysis, visualization, and full-stack project development. I&apos;m continuously learning new technologies and looking for opportunities to apply my skills to real-world challenges while growing as a technology professional.
              </p>
            </ScrollReveal>

            {/* Education Card */}
            <ScrollReveal delay={0.3}>
              <GlassCard className="p-6 md:p-8" tilt={false}>
                <div className="flex items-start gap-4">
                  {/* Graduation cap icon */}
                  <div className="w-10 h-10 rounded-xl bg-white/10 dark:bg-white/[0.06] flex items-center justify-center shrink-0 mt-0.5">
                    <svg
                      className="w-5 h-5 text-accent-blue dark:text-accent-blue-light"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
                      />
                    </svg>
                  </div>

                  <div>
                    <h3 className="font-sans font-semibold text-sm mb-1">
                      {profile.education.institution}
                    </h3>
                    <p className="text-[var(--text-secondary)] text-sm mb-2">
                      {profile.education.degree} ({profile.education.specialization})
                    </p>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[var(--text-secondary)]">
                      <span>{profile.education.period}</span>
                      <span className="font-medium text-[var(--text-primary)]">
                        CGPA {profile.education.cgpa}
                      </span>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

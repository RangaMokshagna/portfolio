"use client";

import { skillGroups } from "@/data/projects";
import { ScrollReveal } from "./ScrollReveal";

/**
 * Skills section — grouped glass chips.
 */
export function Skills() {
  return (
    <section id="skills" className="px-6 py-24 md:py-32">
      <div className="max-w-content mx-auto">
        <ScrollReveal>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-14 text-center">
            Skills
          </h2>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 gap-8 md:gap-10 max-w-3xl mx-auto">
          {skillGroups.map((group, i) => (
            <ScrollReveal key={group.category} delay={i * 0.08}>
              <div>
                <h3 className="font-sans text-xs font-semibold uppercase tracking-widest text-[var(--text-secondary)] mb-4">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 text-sm rounded-full
                        bg-white/10 dark:bg-white/[0.06]
                        border border-white/[0.18] dark:border-white/[0.10]
                        backdrop-blur-[20px]
                        text-[var(--text-primary)]
                        [-webkit-tap-highlight-color:transparent]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

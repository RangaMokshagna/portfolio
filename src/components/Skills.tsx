"use client";

import { skillGroups } from "@/data/projects";
import { ScrollReveal } from "./ScrollReveal";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Skills section — 4 rows in a large glass panel.
 */
export function Skills() {
  const reduced = useReducedMotion();

  // Reorder skill groups as requested: Languages, Data & AI, Fundamentals, Tools
  const orderedGroups = [
    skillGroups.find((g) => g.category === "Languages"),
    skillGroups.find((g) => g.category === "Data & AI"),
    skillGroups.find((g) => g.category === "Fundamentals"),
    skillGroups.find((g) => g.category === "Tools"),
  ].filter(Boolean) as typeof skillGroups;

  return (
    <section id="skills" className="px-6 section-padding">
      <div className="max-w-[960px] mx-auto">
        <ScrollReveal>
          <div data-scroll-target className="text-center mb-14">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-3 text-[var(--text-primary)]">
              Skills
            </h2>
            <p className="font-sans text-sm text-[var(--text-secondary)]">
              Tools and topics I work with.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.08}>
          {/* Main Glass Panel */}
          <div className="glass !rounded-[32px] overflow-hidden flex flex-col">
            {orderedGroups.map((group, i) => {
              const isLast = i === orderedGroups.length - 1;

              return (
                <div
                  key={group.category}
                  className={cn(
                    "flex flex-col md:flex-row gap-6 md:gap-8 px-6 py-7 sm:p-8 md:py-7 md:px-9 transition-all duration-700 ease-out fill-mode-both",
                    !isLast && "border-b border-black/10 dark:border-white/[0.08]"
                  )}
                  style={{
                    animationName: reduced ? "none" : "fade-in-up",
                    animationDuration: "700ms",
                    animationDelay: `${150 + i * 60}ms`,
                  }}
                >
                  {/* Left Column (Category Name) */}
                  <div className="md:w-[220px] shrink-0 pt-1">
                    <h3 className="font-serif text-[22px] leading-snug text-[var(--text-primary)]">
                      {group.category}
                    </h3>
                    <p className="text-xs text-[var(--text-secondary)] mt-1">
                      {group.skills.length} {group.skills.length === 1 ? "skill" : "skills"}
                    </p>
                  </div>

                  {/* Right Column (Chips) */}
                  <div className="flex-1 flex flex-wrap gap-2.5 items-start">
                    {group.skills.map((skill, j) => {
                      return (
                        <div
                          key={skill}
                          className="glass-chip px-4 py-2 flex items-center text-sm text-gray-800 dark:text-white/90
                            transition-all duration-200 hover:-translate-y-[2px] hover:border-black/20 dark:hover:border-white/20
                            [-webkit-tap-highlight-color:transparent] fill-mode-both"
                          style={{
                            animationName: reduced ? "none" : "fade-in",
                            animationDuration: "500ms",
                            animationDelay: `${250 + i * 60 + j * 30}ms`,
                          }}
                        >
                          <span className="leading-none mt-[1px]">{skill}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollReveal>
      </div>

      {/* Embedded keyframes for specific stagger animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}} />
    </section>
  );
}

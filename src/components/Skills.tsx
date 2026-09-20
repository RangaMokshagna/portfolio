"use client";

import { skillGroups } from "@/data/projects";
import { ScrollReveal } from "./ScrollReveal";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/** ─── Icons ─────────────────────────────────────────────────────────────── */
const ICONS: Record<string, React.ReactNode> = {
  Python: (
    <svg className="w-[14px] h-[14px]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h4.3v-3.1h-3.1l-.19-.01-.24-.04-.28-.08-.32-.13-.34-.18-.35-.25-.36-.33-.36-.42-.34-.52-.31-.63-.27-.75-.23-.88-.18-1.03-.13-1.18-.07-1.35.02-1.51.11-1.66.21-1.8.31-1.93.42-2.06.52-2.19.63-2.3.73-2.42.84-2.52.95-2.6 1.05-2.68 1.15-2.74 1.25-2.79 1.34-2.83 1.44-2.85 1.54-2.85h1.64zM12 2.66c-.32 0-.6.11-.82.33-.22.22-.33.5-.33.82 0 .32.11.6.33.82.22.22.5.33.82.33.32 0 .6-.11.82-.33.22-.22.33-.5.33-.82 0-.32-.11-.6-.33-.82-.22-.22-.5-.33-.82-.33z"/>
    </svg>
  ),
  Git: (
    <svg className="w-[14px] h-[14px]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.888.441.516.515.658 1.258.438 1.9l2.759 2.759c.64-.213 1.381-.07 1.89.439.636.636.636 1.672 0 2.31-.637.636-1.673.636-2.311 0-.537-.536-.659-1.309-.364-1.924l-2.78-2.78v3.985c.203.096.386.239.535.422.636.636.636 1.672 0 2.31-.637.636-1.672.636-2.311 0-.636-.636-.636-1.672 0-2.31.253-.254.559-.413.886-.492V9.387c-.309-.066-.609-.22-.857-.467-.534-.535-.658-1.308-.363-1.924l-2.76-2.76-6.173 6.173c-.603.604-.603 1.584 0 2.188l10.48 10.48c.604.604 1.582.604 2.188 0l8.375-8.375c.603-.604.603-1.584 0-2.189z"/>
    </svg>
  ),
  "VS Code": (
    <svg className="w-[14px] h-[14px]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-1.474-1.353zM18.8 19.349L8.03 9.475l4.31-3.692L18.8 13.9v5.449zm0-9.845l-6.46-8.118 4.31-3.692 6.46 8.118v5.449z"/>
    </svg>
  ),
  Jupyter: (
    <svg className="w-[14px] h-[14px]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M11.972 13.08a.908.908 0 1 1 0-1.815.908.908 0 0 1 0 1.815zm11.977-.852c-.057.411-.564.444-1.27.054a10.824 10.824 0 0 0-.256-.128c-1.315-.658-2.616-1.127-3.905-1.408 0 .01-.005.023-.008.032l.006-.002c-.378.147-.735.321-1.077.525.962.33 1.834.787 2.593 1.365a6.002 6.002 0 0 1 1.416 1.496c.294.457.423.856.386 1.123-.11.787-1.34 1.134-3.325.94-2.001-.194-3.903-1.053-5.151-2.32a.149.149 0 0 0-.012-.01l-.014-.016a13.385 13.385 0 0 1-.413-.435c-.144.403-.276.814-.39 1.233.155.039.311.08.468.12 1.439.373 2.915.547 4.331.512 2.148-.052 3.699-.545 3.738-1.183.023-.393-.306-.87-1.002-1.442a8.625 8.625 0 0 0-2.388-1.364c1.173-.803 2.525-1.363 3.968-1.637 1.464-.283 2.871-.247 3.993.104.66.208 1.096.53 1.157.944a1.008 1.008 0 0 1-.035.395c.205-.022.42-.047.625-.07.039.117.067.241.082.37zm-3.031-4.708a1.328 1.328 0 1 1 0-2.657 1.328 1.328 0 0 1 0 2.657zm-.595 14.18a.908.908 0 1 1 0-1.815.908.908 0 0 1 0 1.815zm1.488-5.32c-.105-.402-.572-.432-1.181 0-.15.093-.289.176-.411.268-1.088.795-2.062 1.638-2.923 2.523 0 .01-.013.024-.022.025l.006.002c-.378-.146-.745-.297-1.127-.417.842-.56 1.547-1.258 2.066-2.072A5.992 5.992 0 0 0 17.511 16c.15-.521.144-.944-.017-1.182-.472-.64-1.642-.647-3.321-.02-1.684.628-3.016 1.838-3.606 3.284a.152.152 0 0 0-.007.016l-.01.018a13.313 13.313 0 0 1-.223.541c.28.322.585.626.899.923.151-.051.3-.099.452-.149 1.365-.453 2.684-1.125 3.87-1.97 1.802-1.282 2.871-2.915 2.695-3.513-.105-.355-.544-.73-1.39-1.07-1.147-.464-2.689-.607-4.22-.441-1.317.142-2.581.492-3.684 1.016a13.565 13.565 0 0 1 1.401 1.077c1.35-1.045 2.836-1.785 4.316-2.148.657-.162 1.312-.22 1.895-.164a1.002 1.002 0 0 1 .151.378c.189-.126.39-.239.588-.344-.017-.113-.049-.228-.1-.341zm-13.882.352c.184.341.676.241 1.251-.252l.279-.24c1.11-.967 2.222-2.029 3.326-3.19.006-.008.019-.015.03-.008h-.006c.39.117.771.218 1.157.299-.785.602-1.42 1.353-1.854 2.213a6.002 6.002 0 0 0-.584 1.94c-.035.532.083.945.352 1.109.702.409 1.745.029 3.013-.984 1.28-1.014 2.138-2.502 2.327-3.921 0-.007 0-.016.004-.018l.01-.018a13.525 13.525 0 0 1 .111-.531 13.38 13.38 0 0 0-.962-.777 12.062 12.062 0 0 0-.414.214c-1.22 1.066-2.28 2.274-3.111 3.541-1.255 1.91-1.777 3.868-1.246 4.342.316.28.847.214 1.637-.205 1.073-.568 2.37-1.523 3.57-2.697 1.054-1.023 2.016-2.147 2.78-3.238-1.07-1.127-2.29-2.115-3.59-2.903-1.06 1.4-2.314 2.825-3.649 4.148-.592.585-1.247 1.134-1.884 1.547a1 1 0 0 1-.22-.321c-.22.12-.444.254-.662.381.042.126.113.251.218.361zM4.156 5.865a1.865 1.865 0 1 1 0-3.729 1.865 1.865 0 0 1 0 3.73z"/>
    </svg>
  ),
  "Power BI": (
    <svg className="w-[14px] h-[14px]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M11.996 11.758v10.36H6.602V11.758h5.394zm6.607-4.887v15.24h-5.394V6.87h5.394zM5.393 16.643v5.474H0v-5.474h5.393zM24 2.02v20.096h-5.4V2.02H24z"/>
    </svg>
  ),
  Streamlit: (
    <svg className="w-[14px] h-[14px]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M15.706 7.073A5.438 5.438 0 0011.666.9c-2.887 0-4.996 2.065-4.996 5.25v2.85c-1.42 1.341-2.113 2.617-2.113 3.992 0 1.996 1.251 3.255 3.298 3.255h.39V23.1h5.334v-6.902a6.386 6.386 0 002.133-1.635 6.012 6.012 0 001.328-3.774v-1.674c.05-.724-.316-1.421-1.334-2.042zM12.007 6.15c0-1.082.932-2.1 2.213-2.1s2.21 1.018 2.21 2.1v4.75a3.153 3.153 0 01-.849 2.261A2.96 2.96 0 0113.4 14.05h-1.39V6.15zM7.525 13.064c0-.986.605-1.905 1.79-2.906v2.906h-.175c-.947 0-1.615-.558-1.615-1.46z"/>
    </svg>
  ),
  SQL: (
    <svg className="w-[15px] h-[15px]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125v-3.75" />
    </svg>
  ),
};

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
    <section id="skills" className="px-6 py-24 md:py-32">
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
                      const icon = ICONS[skill];

                      return (
                        <div
                          key={skill}
                          className="glass-chip px-4 py-2 flex items-center gap-2 text-sm text-gray-800 dark:text-white/90
                            transition-all duration-200 hover:-translate-y-[2px] hover:border-black/20 dark:hover:border-white/20
                            [-webkit-tap-highlight-color:transparent] fill-mode-both"
                          style={{
                            animationName: reduced ? "none" : "fade-in",
                            animationDuration: "500ms",
                            animationDelay: `${250 + i * 60 + j * 30}ms`,
                          }}
                        >
                          {icon && (
                            <span className="text-gray-500 dark:text-white/70 shrink-0">
                              {icon}
                            </span>
                          )}
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

"use client";

import {
  useState,
  useEffect,
  useRef,
  type PointerEvent as ReactPointerEvent,
  type FocusEvent as ReactFocusEvent,
} from "react";
import { motion, LayoutGroup } from "framer-motion";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";
import { useScrolledState } from "@/hooks/useScrollPosition";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/* ─────────────────────────────────────────────────────────────────────────
   Nav items — icon SVG paths (Heroicons outline)
   ───────────────────────────────────────────────────────────────────────── */
const navItems = [
  {
    id: "home",
    label: "Home",
    paths: [
      "M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25",
    ],
  },
  {
    id: "about",
    label: "About",
    paths: [
      "M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z",
    ],
  },
  {
    id: "projects",
    label: "Projects",
    paths: [
      "M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5",
    ],
  },
  {
    id: "skills",
    label: "Skills",
    paths: [
      "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z",
    ],
  },
  {
    id: "contact",
    label: "Contact",
    paths: [
      "M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75",
    ],
  },
];

export function Navbar() {
  const scrolled = useScrolledState(50);
  const reduced = useReducedMotion();

  const [activeSection, setActiveSection] = useState("home");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!navRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const height = entry.target.getBoundingClientRect().height;
        document.documentElement.style.setProperty("--nav-h", `${height + 16}px`);
      }
    });
    observer.observe(navRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const ids = navItems.map((item) => item.id);
    const observer = new IntersectionObserver(
      (entries) => {
        if (isScrolling) return;
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [isScrolling]);

  const activeIndex = navItems.findIndex((item) => item.id === activeSection);
  const targetIndex = hoveredIndex !== null ? hoveredIndex : activeIndex;
  const isOnActive = hoveredIndex === null || hoveredIndex === activeIndex;

  const handlePointerEnter = (e: ReactPointerEvent, index: number) => {
    if (e.pointerType === "mouse") setHoveredIndex(index);
  };

  const handleNavPointerLeave = () => setHoveredIndex(null);
  const handleFocus = (index: number) => setHoveredIndex(index);

  const handlePointerDown = (index: number, id: string) => {
    setActiveSection(id);
    setIsScrolling(true);
    
    import("@/lib/scrollUtils").then((mod) => {
      mod.scrollToSection(id);
      
      const checkEnd = () => {
        setIsScrolling(false);
        window.removeEventListener("scrollend", checkEnd);
      };
      
      setTimeout(() => checkEnd(), 800); // fallback
      window.addEventListener("scrollend", checkEnd, { once: true });
    });
  };

  return (
    <header ref={navRef} className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
      <motion.nav
        id="main-nav"
        className={cn(
          "glass-pill border border-black/5 dark:border-white/10 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_-8px_rgba(0,0,0,0.4)]",
          "px-3 py-2 sm:px-3 sm:py-2.5 transition-all duration-300"
        )}
        animate={{
          scale: scrolled ? 0.97 : 1,
          backgroundColor: scrolled 
            ? "var(--nav-bg, rgba(255,255,255,0.85))"
            : "var(--nav-bg, rgba(255,255,255,0.7))"
        }}
        transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 200, damping: 25 }}
        style={{ 
          transformOrigin: "center center",
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
        }}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="relative flex items-center" onPointerLeave={handleNavPointerLeave}>
          
          <div className="flex items-center gap-1 sm:gap-1.5">
            <LayoutGroup>
              {navItems.map((item, i) => {
                const isActive = activeSection === item.id;
                const isHovered = hoveredIndex === i;
                const showBubble = targetIndex === i;

                return (
                  <button
                    key={item.id}
                    className="relative flex flex-col items-center justify-center px-3 py-2 sm:px-4 sm:py-2.5 rounded-full outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50 cursor-pointer"
                    onPointerEnter={(e) => handlePointerEnter(e, i)}
                    onFocus={() => handleFocus(i)}
                    onPointerDown={() => handlePointerDown(i, item.id)}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {showBubble && (
                      <motion.span
                        layoutId="nav-bubble"
                        className="absolute inset-0 glass-bubble rounded-full pointer-events-none"
                        style={{
                          background: isOnActive ? "var(--bubble-bg-active)" : "var(--bubble-bg)",
                          boxShadow: isOnActive
                            ? "inset 0 1px 1px rgba(255,255,255,0.18), 0 0 8px 0 var(--accent-glow)"
                            : undefined,
                        }}
                        transition={
                          reduced ? { duration: 0 } : { type: "spring", stiffness: 500, damping: 38, mass: 0.8 }
                        }
                        aria-hidden="true"
                      />
                    )}
                    
                    <div className="relative z-[1] flex flex-col items-center justify-center pointer-events-none gap-0.5 sm:gap-1">
                      <svg
                        className={cn(
                          "w-[22px] h-[22px] sm:w-6 sm:h-6 transition-colors duration-150",
                          isActive || isHovered ? "text-[var(--text-primary)]" : "text-[var(--text-secondary)]"
                        )}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                      >
                        {item.paths.map((d, pi) => (
                          <path key={pi} strokeLinecap="round" strokeLinejoin="round" d={d} />
                        ))}
                      </svg>
                      <span
                        className={cn(
                          "text-[12px] sm:text-[13px] leading-none transition-all duration-150",
                          isActive ? "block font-semibold" : "hidden sm:block font-medium",
                          isActive || isHovered ? "text-[var(--text-primary)]" : "text-[var(--text-secondary)]"
                        )}
                      >
                        {item.label}
                      </span>
                    </div>
                  </button>
                );
              })}
            </LayoutGroup>
          </div>

          <div className="w-px h-6 sm:h-8 bg-[var(--glass-border-dim)] mx-2 sm:mx-3" />

          <ThemeToggle />
        </div>
      </motion.nav>
    </header>
  );
}

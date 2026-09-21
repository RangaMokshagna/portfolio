"use client";

import { useState, useEffect } from "react";

/**
 * Tracks if the vertical scroll position is past a threshold.
 * Prevents per-pixel React state updates.
 */
export function useScrolledState(threshold = 50): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let lastState = window.scrollY > threshold;
    setScrolled(lastState);

    const handler = () => {
      const isScrolled = window.scrollY > threshold;
      if (isScrolled !== lastState) {
        lastState = isScrolled;
        setScrolled(isScrolled);
      }
    };
    
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [threshold]);

  return scrolled;
}

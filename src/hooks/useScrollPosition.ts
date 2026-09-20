"use client";

import { useState, useEffect } from "react";

/**
 * Tracks vertical scroll position.
 * Uses passive event listener for performance.
 * Primarily used for the navbar glass transition.
 */
export function useScrollPosition(): number {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handler = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return scrollY;
}

"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Calm, minimal background layer.
 *
 * Dark mode: deep ink/charcoal (#0B0D12) with two very soft small glows —
 * muted steel blue upper-left, warm grey-teal lower-right.
 * No bright purple, no neon, no big saturated shapes.
 *
 * Light mode: pearl white with two barely-visible pale blue/lilac glows.
 *
 * Also renders the grain/noise overlay (3% opacity) to prevent banding.
 */
export function BackgroundBlobs() {
  const reduced = useReducedMotion();
  const a1 = reduced ? "" : "animate-glow-1";
  const a2 = reduced ? "" : "animate-glow-2";

  return (
    <>
      <div
        className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        {/* ── Dark mode — two soft, small glows ─────────────────────── */}
        <div className="hidden dark:block absolute inset-0">
          {/* Muted steel blue — upper left */}
          <div
            className={`absolute top-[-8%] left-[-5%] w-[min(500px,70vw)] h-[min(500px,70vw)] rounded-full ${a1}`}
            style={{
              background:
                "radial-gradient(circle at 50% 50%, var(--glow-1) 0%, transparent 70%)",
              filter: "blur(100px)",
            }}
          />

          {/* Warm grey-teal — lower right */}
          <div
            className={`absolute bottom-[-5%] right-[-5%] w-[min(450px,65vw)] h-[min(450px,65vw)] rounded-full ${a2}`}
            style={{
              background:
                "radial-gradient(circle at 50% 50%, var(--glow-2) 0%, transparent 70%)",
              filter: "blur(100px)",
            }}
          />
        </div>

        {/* ── Light mode — barely-visible pale glows ────────────────── */}
        <div className="block dark:hidden absolute inset-0">
          {/* Pale blue — upper left */}
          <div
            className={`absolute top-[-5%] left-[-3%] w-[min(450px,65vw)] h-[min(450px,65vw)] rounded-full ${a1}`}
            style={{
              background:
                "radial-gradient(circle at 50% 50%, var(--glow-1) 0%, transparent 70%)",
              filter: "blur(90px)",
            }}
          />

          {/* Faint lilac — lower right */}
          <div
            className={`absolute bottom-[-3%] right-[-3%] w-[min(400px,60vw)] h-[min(400px,60vw)] rounded-full ${a2}`}
            style={{
              background:
                "radial-gradient(circle at 50% 50%, var(--glow-2) 0%, transparent 70%)",
              filter: "blur(90px)",
            }}
          />
        </div>
      </div>

      {/* Grain / noise overlay — 3% opacity to prevent banding */}
      <div className="noise-overlay" aria-hidden="true" />
    </>
  );
}

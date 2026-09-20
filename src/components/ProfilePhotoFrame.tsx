"use client";

import { useRef, useState, type MouseEvent } from "react";
import Image from "next/image";
import { profile } from "@/data/profile";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

interface ProfilePhotoFrameProps {
  className?: string;
}

/**
 * Liquid glass portrait frame for the About section.
 *
 * Features:
 * - 32px rounded glass frame with frosted border, 1px gradient rim,
 *   specular highlight, inner glow, and floating drop shadow.
 * - 10-12px padding with photo rounded at 22px (sitting behind thick glass).
 * - Dark mode anti-glare: brightness(0.94), contrast(1.02), plus a soft
 *   inner vignette overlay (radial-gradient to rgba(11,13,18,0.25)).
 * - Mouse-following glossy sheen across the glass.
 * - Gentle floating animation (translateY of 6px, 6s loop).
 * - Respects prefers-reduced-motion.
 */
export function ProfilePhotoFrame({ className }: ProfilePhotoFrameProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduced || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    cardRef.current.style.setProperty("--mouse-x", `${x * 100}%`);
    cardRef.current.style.setProperty("--mouse-y", `${y * 100}%`);

    // Subtle 3D tilt
    const tiltX = (0.5 - y) * 3;
    const tiltY = (x - 0.5) * 3;
    cardRef.current.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (cardRef.current) {
      cardRef.current.style.transform = "";
    }
  };

  return (
    <div
      className={cn(
        "relative w-[280px] sm:w-[320px] md:w-[340px] lg:w-[360px] mx-auto",
        !reduced && "animate-float",
        className
      )}
    >
      {/* Soft floating shadow underneath */}
      <div
        className="absolute -inset-2 rounded-[36px] bg-[var(--glass-shadow-float)] blur-xl -z-10 opacity-70 dark:opacity-90 pointer-events-none"
        aria-hidden="true"
      />

      {/* Glass Frame Container */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={cn(
          "glass glass-card relative overflow-hidden rounded-[32px] p-2.5 sm:p-3",
          "transition-transform duration-300 ease-out"
        )}
      >
        {/* Specular highlight along top edge */}
        <div
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none rounded-t-[32px] z-10"
          aria-hidden="true"
        />

        {/* Inner photo container (sitting behind thick glass) */}
        <div className="relative aspect-[5/6] w-full rounded-[22px] overflow-hidden bg-white/5">
          <Image
            src={profile.image.src}
            alt={profile.image.alt}
            fill
            sizes="(max-width: 768px) 280px, 420px"
            loading="lazy"
            placeholder="blur"
            blurDataURL={profile.image.blurDataURL}
            className={cn(
              "object-cover transition-all duration-300",
              // Dark mode: reduce white glare with slight brightness reduction & contrast boost
              "dark:brightness-[0.94] dark:contrast-[1.02]"
            )}
            style={{
              objectFit: "cover",
              objectPosition: "center 20%",
            }}
          />

          {/* Dark mode vignette overlay: blends white background into deep page */}
          <div
            className="hidden dark:block absolute inset-0 pointer-events-none rounded-[22px]"
            style={{
              background:
                "radial-gradient(ellipse at 50% 30%, transparent 62%, rgba(11, 13, 18, 0.28) 100%)",
            }}
            aria-hidden="true"
          />
        </div>

        {/* Mouse-following glossy sheen overlay */}
        {!reduced && (
          <div
            className={cn(
              "absolute inset-0 pointer-events-none transition-opacity duration-300 rounded-[32px] z-20",
              isHovered ? "opacity-100" : "opacity-0"
            )}
            style={{
              background:
                "radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.14) 0%, transparent 60%)",
            }}
            aria-hidden="true"
          />
        )}
      </div>
    </div>
  );
}

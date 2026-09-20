"use client";

import { useRef, type ReactNode, type MouseEvent, type KeyboardEvent } from "react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  /** Enable subtle tilt on hover (default: true) */
  tilt?: boolean;
  /** Makes the card clickable / focusable */
  onClick?: () => void;
}

/**
 * Reusable glass surface with:
 * - Backdrop blur (24px)
 * - Semi-transparent white fill
 * - 1px light border + top-edge inner highlight
 * - Subtle 3D tilt on hover
 *
 * All motion respects prefers-reduced-motion.
 */
export function GlassCard({
  children,
  className,
  tilt = true,
  onClick,
}: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduced || !tilt || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;   // 0 → 1
    const y = (e.clientY - rect.top) / rect.height;    // 0 → 1

    // Subtle 3D tilt — max ±3 degrees
    const tiltX = (0.5 - y) * 3;
    const tiltY = (x - 0.5) * 3;
    cardRef.current.style.transform =
      `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = "";
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (onClick && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      ref={cardRef}
      className={cn(
        "relative overflow-hidden rounded-2xl",
        "bg-white/10 dark:bg-white/[0.06]",
        "border border-white/[0.18] dark:border-white/[0.10]",
        "backdrop-blur-[24px]",
        "transition-transform duration-300 ease-out",
        "[-webkit-tap-highlight-color:transparent]",
        onClick && "cursor-pointer",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? handleKeyDown : undefined}
    >
      {/* Top edge inner highlight */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

      {children}
    </div>
  );
}

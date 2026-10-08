"use client";

import { MotionConfig } from "motion/react";

/** Respeta `prefers-reduced-motion` en todas las animaciones del sitio. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

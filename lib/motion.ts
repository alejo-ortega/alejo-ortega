import type { Transition, Variants } from "motion/react";

/** Curva única para todo el sitio: salida suave, sin rebotes. */
export const ease = [0.22, 1, 0.36, 1] as const;

export const transition = (duration = 0.7, delay = 0): Transition => ({
  duration,
  delay,
  ease,
});

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export const stagger = (gap = 0.08, delay = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: gap, delayChildren: delay } },
});

"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring } from "motion/react";

/** Resplandor azul que sigue al cursor dentro de su contenedor. Inerte en touch. */
export function Spotlight({ children }: { children: React.ReactNode }) {
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const sx = useSpring(x, { stiffness: 120, damping: 24, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 120, damping: 24, mass: 0.4 });
  const background = useMotionTemplate`radial-gradient(520px circle at ${sx}px ${sy}px, rgb(76 141 246 / 0.13), transparent 70%)`;

  return (
    <div
      className="relative"
      onPointerMove={(event) => {
        if (event.pointerType !== "mouse") return;
        const rect = event.currentTarget.getBoundingClientRect();
        x.set(event.clientX - rect.left);
        y.set(event.clientY - rect.top);
      }}
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background }}
      />
      {children}
    </div>
  );
}

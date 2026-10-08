"use client";

import { motion } from "motion/react";
import { transition } from "@/lib/motion";

const tags = {
  div: motion.div,
  li: motion.li,
  p: motion.p,
  h2: motion.h2,
  h3: motion.h3,
  ul: motion.ul,
} as const;

type RevealProps = {
  children: React.ReactNode;
  as?: keyof typeof tags;
  delay?: number;
  y?: number;
  /** Anima al montar en vez de al entrar en el viewport (para el hero). */
  immediate?: boolean;
  className?: string;
};

/** Entrada al hacer scroll: fundido + desplazamiento corto, una sola vez. */
export function Reveal({
  children,
  as = "div",
  delay = 0,
  y = 24,
  immediate = false,
  className,
}: RevealProps) {
  const Tag = tags[as] as typeof motion.div;
  const target = { opacity: 1, y: 0 };
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      {...(immediate
        ? { animate: target }
        : {
            whileInView: target,
            viewport: { once: true, margin: "0px 0px -10% 0px" },
          })}
      transition={transition(0.8, delay)}
    >
      {children}
    </Tag>
  );
}

/** Una línea de texto que sube desde detrás de una máscara. */
export function MaskLine({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <span className={`block overflow-hidden pb-[0.12em] -mb-[0.12em] ${className ?? ""}`}>
      <motion.span
        className="block"
        initial={{ y: "115%" }}
        animate={{ y: 0 }}
        transition={transition(1, delay)}
      >
        {children}
      </motion.span>
    </span>
  );
}

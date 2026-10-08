"use client";

import { motion } from "motion/react";
import { useLayoutEffect } from "react";
import { consumePendingScroll } from "@/lib/locale-client";
import { transition } from "@/lib/motion";

/**
 * Se remonta en cada cambio de idioma: el contenido nuevo entra con un
 * fundido corto, sin mover el scroll ni la barra de navegación.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  useLayoutEffect(() => {
    const y = consumePendingScroll();
    if (y !== null) window.scrollTo({ top: y, behavior: "instant" });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={transition(0.5)}
    >
      {children}
    </motion.div>
  );
}

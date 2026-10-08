"use client";

import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { profile } from "@/content/profile";
import { transition } from "@/lib/motion";
import { Check, Copy } from "./icons";

/** Mail enorme que abre el cliente de correo, con un botón aparte para copiarlo. */
export function CopyEmail({ copy, copied }: { copy: string; copied: string }) {
  const [done, setDone] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
    } catch {
      return;
    }
    setDone(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setDone(false), 2000);
  };

  return (
    <div className="flex flex-col items-start gap-5">
      <a
        href={`mailto:${profile.email}`}
        className="link-underline break-all pb-1 text-[clamp(1.5rem,5.2vw,4.25rem)] font-medium leading-tight tracking-[-0.03em] transition-colors hover:text-accent"
      >
        {profile.email}
      </a>
      <button
        type="button"
        onClick={onCopy}
        className="inline-flex h-10 items-center gap-2 rounded-full border border-line-strong px-4 text-sm transition-colors hover:border-muted hover:bg-surface"
      >
        <span className="relative grid size-4 place-items-center">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={done ? "check" : "copy"}
              className={`absolute ${done ? "text-emerald-400" : ""}`}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={transition(0.2)}
            >
              {done ? <Check /> : <Copy />}
            </motion.span>
          </AnimatePresence>
        </span>
        <span aria-live="polite">{done ? copied : copy}</span>
      </button>
    </div>
  );
}

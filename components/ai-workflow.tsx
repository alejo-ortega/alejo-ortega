"use client";

import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";
import { useRef, useState } from "react";
import { aiStepOrder, aiTools } from "@/content/profile";
import type { Dictionary } from "@/content/types";
import { transition } from "@/lib/motion";
import { Check } from "./icons";
import { Reveal } from "./reveal";

const STEP_MS = 5500;

/**
 * Recorre las cuatro etapas del flujo con IA. Avanza sola mientras la sección
 * está a la vista; en cuanto el visitante interactúa, queda en sus manos.
 */
export function AiWorkflow({ dict }: { dict: Dictionary["ai"] }) {
  const [index, setIndex] = useState(0);
  const [manual, setManual] = useState(false);
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-20% 0px -20% 0px" });
  const reduceMotion = useReducedMotion();

  const autoplay = inView && !manual && !hovered && !reduceMotion;
  const stepId = aiStepOrder[index];
  const step = dict.steps[stepId];

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="grid gap-8 lg:grid-cols-[5fr_7fr] lg:gap-10"
    >
      <div>
        <div role="tablist" aria-label={dict.title} className="flex flex-col">
          {aiStepOrder.map((id, i) => {
            const selected = i === index;
            return (
              <button
                key={id}
                type="button"
                role="tab"
                id={`ai-tab-${id}`}
                aria-selected={selected}
                aria-controls="ai-panel"
                onClick={() => {
                  setIndex(i);
                  setManual(true);
                }}
                className={`relative flex items-baseline gap-5 border-t border-line py-5 text-left transition-colors last:border-b ${
                  selected ? "text-fg" : "text-muted hover:text-fg"
                }`}
              >
                <span className="label text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-2xl font-medium tracking-[-0.02em] md:text-3xl">
                  {dict.steps[id].label}
                </span>
                {selected && (
                  <motion.span
                    key={`${index}-${autoplay}`}
                    aria-hidden="true"
                    className="absolute -top-px inset-x-0 h-px origin-left bg-accent"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: autoplay || manual ? 1 : 0 }}
                    transition={
                      autoplay
                        ? { duration: STEP_MS / 1000, ease: "linear" }
                        : { duration: 0.4 }
                    }
                    onAnimationComplete={() => {
                      if (autoplay) setIndex((n) => (n + 1) % aiStepOrder.length);
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-8 min-h-[4.5rem]">
          <AnimatePresence mode="wait">
            <motion.p
              key={stepId}
              className="max-w-md leading-relaxed text-muted"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={transition(0.3)}
            >
              {step.description}
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <span className="label">{dict.toolsLabel}</span>
          {aiTools.map((tool) => (
            <span
              key={tool}
              className="rounded-full border border-line-strong px-3 py-1.5 font-mono text-xs"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>

      <div
        role="tabpanel"
        id="ai-panel"
        aria-labelledby={`ai-tab-${stepId}`}
        className="overflow-hidden rounded-2xl border border-line bg-surface"
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
          <span className="label flex items-center gap-2">
            <span
              aria-hidden="true"
              className="size-1.5 rounded-full bg-accent"
            />
            agent · {step.label.toLowerCase()}
          </span>
          <span className="label hidden sm:block">{dict.exampleLabel}</span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={stepId}
            className="min-h-[18rem] p-5 font-mono text-sm leading-relaxed md:p-7 md:text-[0.9rem]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.p
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={transition(0.45)}
              className="flex gap-3 text-fg"
            >
              <span aria-hidden="true" className="text-accent">
                ›
              </span>
              <span>{step.prompt}</span>
            </motion.p>

            <ul className="mt-6 space-y-3">
              {step.output.map((line, i) => (
                <motion.li
                  key={line}
                  className="flex items-start gap-3 text-muted"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={transition(0.5, 0.35 + i * 0.28)}
                >
                  <Check className="mt-1 size-3.5 shrink-0 text-accent" />
                  <span>{line}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>

        <div className="border-t border-line px-5 py-3.5 md:px-7">
          <Reveal as="p" y={0}>
            <span className="label normal-case tracking-normal">
              {dict.note}
            </span>
          </Reveal>
        </div>
      </div>
    </div>
  );
}

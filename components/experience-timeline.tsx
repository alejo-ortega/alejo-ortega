"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import type { Dictionary } from "@/content/types";
import { Reveal } from "./reveal";

type Items = Dictionary["experience"]["items"];

/** Línea de tiempo que se dibuja con el scroll; cada hito se enciende al cruzar el centro. */
export function ExperienceTimeline({ items }: { items: Items }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 60%", "end 55%"],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 26,
    mass: 0.3,
  });

  return (
    <div ref={ref} className="relative">
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-[3.5px] top-2 w-px bg-line md:left-[12rem]"
      >
        <motion.div
          style={{ scaleY }}
          className="size-full origin-top bg-accent"
        />
      </div>

      <ol>
        {items.map((item) => (
          <li
            key={`${item.company}-${item.period}`}
            className="relative grid pb-16 last:pb-0 md:grid-cols-[12rem_1fr] md:pb-24"
          >
            <Reveal y={12} className="mb-3 pl-8 md:mb-0 md:pl-0 md:pr-10 md:pt-1">
              <p className="label leading-relaxed">{item.period}</p>
            </Reveal>

            <div className="relative pl-8 md:pl-12">
              <motion.span
                aria-hidden="true"
                className="absolute left-0 top-1.5 size-2 rounded-full border border-line-strong bg-bg md:-translate-x-1/2"
                initial={{ backgroundColor: "#0a0a0b", borderColor: "#34343a" }}
                whileInView={{
                  backgroundColor: "#4c8df6",
                  borderColor: "#4c8df6",
                  boxShadow: "0 0 0 6px rgb(76 141 246 / 0.15)",
                }}
                viewport={{ margin: "-45% 0px -45% 0px" }}
                transition={{ duration: 0.4 }}
              />
              <Reveal>
                <h3 className="text-2xl font-medium leading-tight tracking-[-0.02em] md:text-3xl">
                  {item.role}
                </h3>
                <p className="mt-2 font-serif text-2xl italic text-accent">
                  {item.company}
                </p>
                <ul className="mt-6 space-y-3 text-base leading-relaxed text-muted md:text-[1.0625rem]">
                  {item.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-[0.7em] h-px w-3 shrink-0 bg-line-strong"
                      />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

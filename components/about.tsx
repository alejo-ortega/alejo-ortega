import Image from "next/image";
import type { Dictionary } from "@/content/types";
import { Reveal } from "./reveal";
import { SectionHeader } from "./section-header";

export function About({ dict }: { dict: Dictionary["about"] }) {
  return (
    <section id="about" className="section">
      <div className="container-x">
        <SectionHeader index="01" title={dict.title} />

        <div className="grid gap-12 md:grid-cols-[12rem_1fr] md:gap-10">
          <div aria-hidden="true" className="hidden md:block" />

          <div className="grid gap-12 lg:grid-cols-[minmax(0,21rem)_1fr] lg:gap-20">
            <Reveal>
              <div className="group relative aspect-[4/5] max-w-sm overflow-hidden rounded-2xl border border-line bg-surface">
                <Image
                  src="/alejo.jpg"
                  alt={dict.photoAlt}
                  width={1164}
                  height={1318}
                  sizes="(min-width: 1024px) 21rem, (min-width: 640px) 24rem, 90vw"
                  className="size-full object-cover object-top grayscale transition-all duration-700 ease-out group-hover:scale-[1.03] group-hover:grayscale-0"
                />
                {/* Velo azul: unifica la foto con la paleta y se retira al hacer hover. */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-accent/35 mix-blend-multiply transition-opacity duration-700 group-hover:opacity-0"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-bg/60 via-transparent to-transparent"
                />
              </div>
            </Reveal>

            <div>
              <Reveal as="p" delay={0.05}>
                <span className="block text-2xl font-medium leading-[1.2] tracking-[-0.02em] md:text-[2.25rem]">
                  {dict.lead}
                </span>
              </Reveal>

              <div className="mt-8 space-y-5 text-lg leading-relaxed text-muted">
                {dict.body.map((paragraph, i) => (
                  <Reveal as="p" key={i} delay={0.1 + i * 0.06}>
                    {paragraph}
                  </Reveal>
                ))}
              </div>

              <Reveal delay={0.1}>
                <dl className="mt-12 grid gap-x-8 sm:grid-cols-2">
                  {dict.facts.map((fact) => (
                    <div
                      key={fact.label}
                      className="border-t border-line py-4"
                    >
                      <dt className="label mb-2">{fact.label}</dt>
                      <dd className="text-base">{fact.value}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>

              <Reveal delay={0.1} className="mt-10">
                <h3 className="label mb-4">{dict.softTitle}</h3>
                <ul className="flex flex-wrap gap-2">
                  {dict.soft.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-full border border-line-strong px-4 py-2 text-sm"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { workStacks } from "@/content/profile";
import type { Dictionary } from "@/content/types";
import { ArrowUpRight } from "./icons";
import { Reveal } from "./reveal";
import { SectionHeader } from "./section-header";

/** El badge "Placeholder" solo se ve en desarrollo, para no olvidar reemplazar los casos. */
const showPlaceholder = process.env.NODE_ENV !== "production";

export function Work({ dict }: { dict: Dictionary["work"] }) {
  return (
    <section id="work" className="section">
      <div className="container-x">
        <SectionHeader index="03" title={dict.title} intro={dict.intro} />

        <ul className="grid gap-5 lg:grid-cols-3">
          {dict.items.map((item, i) => (
            <Reveal as="li" key={item.title} delay={i * 0.08}>
              <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface p-6 transition-[border-color,transform] duration-500 hover:-translate-y-1 hover:border-accent/50">
                <div
                  aria-hidden="true"
                  className="relative mb-8 aspect-[16/10] overflow-hidden rounded-xl border border-line bg-bg [background-image:radial-gradient(var(--color-line-strong)_1px,transparent_1px)] [background-size:14px_14px]"
                >
                  <div className="absolute -right-8 -top-8 size-40 rounded-full bg-accent/20 blur-3xl transition-opacity duration-500 group-hover:opacity-100 md:opacity-50" />
                  <span className="absolute bottom-3 left-4 font-mono text-5xl font-medium tracking-tighter text-line-strong transition-colors duration-500 group-hover:text-accent/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="mb-3 flex items-center justify-between gap-3">
                  <p className="label">{item.company}</p>
                  {showPlaceholder && (
                    <span className="rounded-full border border-amber-400/40 px-2 py-1 font-mono text-[0.625rem] uppercase tracking-wider text-amber-300">
                      {dict.placeholder}
                    </span>
                  )}
                </div>

                <h3 className="flex items-start justify-between gap-4 text-2xl font-medium leading-tight tracking-[-0.02em]">
                  {item.title}
                  <ArrowUpRight className="mt-1.5 size-5 shrink-0 text-muted transition-[color,transform] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                </h3>
                <p className="mt-3 flex-1 leading-relaxed text-muted">
                  {item.description}
                </p>

                <ul className="mt-6 flex flex-wrap gap-2">
                  {workStacks[i]?.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-line-strong px-3 py-1 font-mono text-[0.7rem] text-muted"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

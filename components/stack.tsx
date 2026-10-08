import { stackGroups } from "@/content/profile";
import type { Dictionary, StackGroupId } from "@/content/types";
import { Reveal } from "./reveal";
import { SectionHeader } from "./section-header";

const order = Object.keys(stackGroups) as StackGroupId[];

export function Stack({
  stack,
  education,
}: {
  stack: Dictionary["stack"];
  education: Dictionary["education"];
}) {
  return (
    <section id="stack" className="section">
      <div className="container-x">
        <SectionHeader index="05" title={stack.title} intro={stack.intro} />

        <div>
          {order.map((id, i) => (
            <Reveal
              key={id}
              delay={i * 0.04}
              className="grid gap-4 border-t border-line py-7 md:grid-cols-[12rem_1fr] md:gap-10"
            >
              <h3 className="label md:pt-3">{stack.groups[id]}</h3>
              <ul className="flex flex-wrap gap-2.5">
                {stackGroups[id].map((tech) => (
                  <li
                    key={tech}
                    className="rounded-full border border-line-strong px-4 py-2 text-sm transition-colors duration-300 hover:border-accent hover:bg-accent-soft hover:text-accent md:text-base"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
          <Reveal className="grid gap-4 border-y border-line py-7 md:grid-cols-[12rem_1fr] md:gap-10">
            <h3 className="label md:pt-3">{stack.practicesTitle}</h3>
            <ul className="flex flex-wrap gap-2.5">
              {stack.practices.map((practice) => (
                <li
                  key={practice}
                  className="rounded-full bg-surface-2 px-4 py-2 text-sm md:text-base"
                >
                  {practice}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div id="education" className="mt-24 md:mt-32">
          <Reveal className="mb-10 flex items-center gap-4">
            <h3 className="text-3xl font-medium tracking-[-0.03em] md:text-5xl">
              {education.title}
            </h3>
            <span aria-hidden="true" className="h-px flex-1 bg-line" />
          </Reveal>

          <div className="grid gap-12 md:grid-cols-[12rem_1fr] md:gap-10">
            <div aria-hidden="true" className="hidden md:block" />
            <div className="grid gap-12 lg:grid-cols-[3fr_2fr] lg:gap-16">
              <ul>
                {education.certs.map((cert, i) => (
                  <Reveal
                    as="li"
                    key={cert.title}
                    delay={i * 0.06}
                    className="border-t border-line py-5 first:border-t-0 first:pt-0"
                  >
                    <p className="text-lg font-medium leading-snug md:text-xl">
                      {cert.title}
                    </p>
                    <p className="mt-2 font-serif text-lg italic text-accent">
                      {cert.issuer}
                    </p>
                  </Reveal>
                ))}
              </ul>

              <Reveal>
                <h4 className="label mb-5">{education.languagesTitle}</h4>
                <ul>
                  {education.languages.map((language) => (
                    <li
                      key={language.name}
                      className="flex items-baseline justify-between gap-4 border-t border-line py-4 first:border-t-0 first:pt-0"
                    >
                      <span className="text-lg font-medium">
                        {language.name}
                      </span>
                      <span className="text-muted">{language.level}</span>
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

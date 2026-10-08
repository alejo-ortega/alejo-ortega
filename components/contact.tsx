import { profile } from "@/content/profile";
import type { Dictionary } from "@/content/types";
import { CopyEmail } from "./copy-email";
import { ArrowUpRight, Download } from "./icons";
import { Reveal } from "./reveal";
import { SectionHeader } from "./section-header";

export function Contact({ dict }: { dict: Dictionary["contact"] }) {
  const links = [
    { label: dict.links.linkedin, href: profile.linkedin, handle: "/in/alejo-ortega" },
    { label: dict.links.github, href: profile.github, handle: "@alejo-ortega" },
    { label: dict.links.whatsapp, href: profile.whatsapp, handle: profile.phone },
  ];

  return (
    <section id="contact" className="section relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 left-1/2 size-[40rem] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]"
      />
      <div className="container-x relative">
        <SectionHeader index="06" title={dict.title} />

        <div className="grid gap-12 md:grid-cols-[12rem_1fr] md:gap-10">
          <div aria-hidden="true" className="hidden md:block" />
          <div>
            <Reveal>
              <p className="mb-8 max-w-2xl text-2xl font-medium leading-snug tracking-[-0.02em] md:text-4xl">
                {dict.heading}
              </p>
              <p className="mb-10 max-w-md text-lg leading-relaxed text-muted">
                {dict.text}
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <CopyEmail copy={dict.copy} copied={dict.copied} />
            </Reveal>

            <ul className="mt-16 md:mt-24">
              {links.map((link, i) => (
                <Reveal as="li" key={link.label} delay={i * 0.06}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-6 border-t border-line py-6 transition-colors hover:text-accent"
                  >
                    <span className="text-xl font-medium md:text-2xl">
                      {link.label}
                    </span>
                    <span className="flex items-center gap-4">
                      <span className="label hidden normal-case tracking-normal sm:block">
                        {link.handle}
                      </span>
                      <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </a>
                </Reveal>
              ))}
              <Reveal as="li" delay={0.18}>
                <a
                  href={profile.cvFile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-6 border-y border-line py-6 transition-colors hover:text-accent"
                >
                  <span className="text-xl font-medium md:text-2xl">
                    {dict.cv}
                  </span>
                  <span className="flex items-center gap-4">
                    <span className="label hidden normal-case tracking-normal sm:block">
                      PDF
                    </span>
                    <Download className="size-5 transition-transform duration-300 group-hover:translate-y-0.5" />
                  </span>
                </a>
              </Reveal>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

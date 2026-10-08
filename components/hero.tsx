import { profile } from "@/content/profile";
import type { Dictionary } from "@/content/types";
import { ArrowRight, Download } from "./icons";
import { MendozaClock } from "./mendoza-clock";
import { MaskLine, Reveal } from "./reveal";
import { Spotlight } from "./spotlight";

export function Hero({ dict }: { dict: Dictionary["hero"] }) {
  return (
    <Spotlight>
      <section
        id="top"
        className="relative flex min-h-svh flex-col justify-end overflow-hidden pb-10 pt-28 md:pb-14 md:pt-32"
      >
        <div
          aria-hidden="true"
          className="grid-lines pointer-events-none absolute inset-0 opacity-60"
        />

        <div className="container-x relative">
          <Reveal immediate y={12} className="mb-8 flex flex-wrap items-center gap-x-6 gap-y-3 md:mb-14">
            {profile.available && (
              <span className="label flex items-center gap-2.5 text-fg">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:animate-none" />
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
                </span>
                {dict.status}
              </span>
            )}
            <span className="label flex items-center gap-2">
              {dict.localTime} · <MendozaClock /> ART
            </span>
          </Reveal>

          <h1 className="text-[clamp(4.5rem,21vw,15rem)] font-medium leading-[0.86] tracking-[-0.055em]">
            <MaskLine delay={0.1}>Alejo</MaskLine>
            <MaskLine delay={0.22}>
              <span className="font-serif font-normal italic tracking-[-0.04em] text-accent">
                Ortega
              </span>
              <span className="text-accent">.</span>
            </MaskLine>
          </h1>

          <div className="mt-10 grid gap-5 border-t border-line pt-6 md:mt-16 md:grid-cols-[12rem_1fr] md:gap-10 md:pt-8 lg:grid-cols-[12rem_1fr_auto]">
            <Reveal immediate delay={0.5} y={12}>
              <p className="label leading-relaxed">{dict.role}</p>
            </Reveal>
            <Reveal immediate delay={0.58} y={12}>
              <p className="max-w-xl text-lg leading-relaxed text-fg/90 md:text-xl">
                {dict.intro}
              </p>
            </Reveal>
            <Reveal immediate delay={0.66} y={12} className="flex flex-wrap items-center gap-3 md:col-start-2 lg:col-start-auto lg:self-end">
              <a
                href="#contact"
                className="group inline-flex h-12 items-center gap-2 rounded-full bg-accent px-6 text-sm font-medium text-white transition-[filter,transform] hover:brightness-110 active:scale-[0.98]"
              >
                {dict.cta}
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href={profile.cvFile}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center gap-2 rounded-full border border-line-strong px-6 text-sm font-medium transition-colors hover:border-muted hover:bg-surface"
              >
                <Download />
                {dict.cv}
              </a>
            </Reveal>
          </div>
        </div>
      </section>
    </Spotlight>
  );
}

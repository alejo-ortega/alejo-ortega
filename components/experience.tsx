import type { Dictionary } from "@/content/types";
import { ExperienceTimeline } from "./experience-timeline";
import { SectionHeader } from "./section-header";

export function Experience({ dict }: { dict: Dictionary["experience"] }) {
  return (
    <section id="experience" className="section">
      <div className="container-x">
        <SectionHeader index="02" title={dict.title} intro={dict.intro} />
        <ExperienceTimeline items={dict.items} />
      </div>
    </section>
  );
}

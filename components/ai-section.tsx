import type { Dictionary } from "@/content/types";
import { AiWorkflow } from "./ai-workflow";
import { SectionHeader } from "./section-header";

export function AiSection({ dict }: { dict: Dictionary["ai"] }) {
  return (
    <section id="ai" className="section">
      <div className="container-x">
        <SectionHeader index="04" title={dict.title} intro={dict.intro} />
        <div className="grid md:grid-cols-[12rem_1fr] md:gap-10">
          <div aria-hidden="true" className="hidden md:block" />
          <AiWorkflow dict={dict} />
        </div>
      </div>
    </section>
  );
}

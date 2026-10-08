import { Reveal } from "./reveal";

/** Encabezado editorial: número de sección en azul, título grande y bajada. */
export function SectionHeader({
  index,
  title,
  intro,
}: {
  index: string;
  title: string;
  intro?: string;
}) {
  return (
    <div className="mb-14 grid gap-6 md:mb-20 md:grid-cols-[12rem_1fr] md:gap-10">
      <Reveal className="flex items-center gap-3 md:pt-4">
        <span className="label text-accent">{index}</span>
        <span className="h-px w-8 bg-line-strong" aria-hidden="true" />
      </Reveal>
      <div>
        <Reveal as="h2" delay={0.05}>
          <span className="block text-[clamp(2.5rem,7vw,5.5rem)] font-medium leading-[0.98] tracking-[-0.035em]">
            {title}
          </span>
        </Reveal>
        {intro && (
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              {intro}
            </p>
          </Reveal>
        )}
      </div>
    </div>
  );
}

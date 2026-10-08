import type { Dictionary } from "@/content/types";
import { ArrowUp } from "./icons";

export function Footer({ dict }: { dict: Dictionary["footer"] }) {
  return (
    <footer className="border-t border-line">
      <div className="container-x flex flex-wrap items-center justify-between gap-4 py-8">
        <p className="label normal-case tracking-normal">
          © 2026 Alejo Ortega · {dict.built}
        </p>
        <a
          href="#top"
          className="label group flex items-center gap-2 transition-colors hover:text-fg"
        >
          {dict.top}
          <ArrowUp className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </footer>
  );
}

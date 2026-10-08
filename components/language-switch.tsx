"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { locales } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { rememberLocale } from "@/lib/locale-client";
import { transition } from "@/lib/motion";

/** Selector ES/EN. Cada idioma es una ruta real (/es, /en), por lo que sirve para SEO. */
export function LanguageSwitch({
  lang,
  label,
}: {
  lang: Locale;
  label: string;
}) {
  return (
    <div
      role="group"
      aria-label={label}
      className="flex h-9 items-center rounded-full border border-line-strong bg-surface p-0.5"
    >
      {locales.map((locale) => {
        const current = locale === lang;
        return (
          <Link
            key={locale}
            href={`/${locale}`}
            scroll={false}
            replace
            hrefLang={locale}
            lang={locale}
            aria-current={current ? "true" : undefined}
            onClick={(event) => {
              if (current) event.preventDefault();
              else rememberLocale(locale);
            }}
            className={`relative grid h-full min-w-9 place-items-center rounded-full px-2.5 font-mono text-[0.7rem] font-medium uppercase tracking-wider transition-colors ${
              current ? "text-white" : "text-muted hover:text-fg"
            }`}
          >
            {current && (
              <motion.span
                layoutId="lang-pill"
                className="absolute inset-0 rounded-full bg-accent"
                transition={transition(0.35)}
              />
            )}
            <span className="relative">{locale}</span>
          </Link>
        );
      })}
    </div>
  );
}

"use client";

import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
} from "motion/react";
import { useEffect, useState } from "react";
import type { Dictionary, NavId } from "@/content/types";
import type { Locale } from "@/lib/i18n";
import { transition } from "@/lib/motion";
import { useCommandPalette, useModifierKey } from "./command-palette";
import { Close, Menu, Search } from "./icons";
import { LanguageSwitch } from "./language-switch";

const ids: NavId[] = ["about", "experience", "work", "ai", "stack", "contact"];

/** Devuelve la sección que está cruzando el tercio superior del viewport. */
function useActiveSection(sectionIds: readonly string[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-35% 0px -60% 0px" },
    );
    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    // Al volver al inicio no hay ninguna sección activa.
    const onScroll = () => {
      if (window.scrollY < 200) setActive(null);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [sectionIds]);

  return active;
}

export function Nav({ lang, dict }: { lang: Locale; dict: Dictionary["nav"] }) {
  const active = useActiveSection(ids);
  const [menuOpen, setMenuOpen] = useState(false);
  const palette = useCommandPalette();
  const modifier = useModifierKey();

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    mass: 0.3,
  });

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="border-b border-line/80 bg-bg/70 backdrop-blur-xl">
        <div className="container-x flex h-16 items-center justify-between gap-4">
          <a
            href="#top"
            aria-label="Alejo Ortega"
            className="group flex items-center gap-3"
          >
            <span className="grid size-8 place-items-center rounded-lg border border-line-strong bg-surface font-mono text-[0.7rem] font-medium tracking-tight transition-colors group-hover:border-accent group-hover:text-accent">
              AO
            </span>
            <span className="hidden whitespace-nowrap text-sm font-medium lg:block">
              Alejo Ortega
            </span>
          </a>

          <nav aria-label={lang === "es" ? "Principal" : "Main"} className="hidden md:block">
            <ul className="flex items-center gap-1">
              {ids.map((id) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    aria-current={active === id ? "true" : undefined}
                    className={`relative block rounded-full px-3.5 py-2 text-sm transition-colors ${
                      active === id ? "text-fg" : "text-muted hover:text-fg"
                    }`}
                  >
                    {active === id && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 -z-10 rounded-full bg-surface-2"
                        transition={transition(0.4)}
                      />
                    )}
                    {dict.items[id]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={palette.open}
              aria-label={dict.search}
              className="flex h-9 items-center gap-2 rounded-full border border-line-strong bg-surface px-3 text-muted transition-colors hover:border-muted hover:text-fg"
            >
              <Search className="size-3.5" />
              <kbd className="label hidden whitespace-nowrap normal-case tracking-normal lg:inline">
                {modifier} K
              </kbd>
            </button>
            <LanguageSwitch lang={lang} label={dict.switchTo} />
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? dict.closeMenu : dict.menu}
              className="grid size-9 place-items-center rounded-full border border-line-strong bg-surface md:hidden"
            >
              {menuOpen ? <Close /> : <Menu />}
            </button>
          </div>
        </div>

        <motion.div
          aria-hidden="true"
          style={{ scaleX: progress }}
          className="absolute inset-x-0 bottom-0 h-px origin-left bg-accent"
        />
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-menu"
            aria-label={lang === "es" ? "Principal" : "Main"}
            className="border-b border-line bg-bg/95 backdrop-blur-xl md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={transition(0.4)}
          >
            <ul className="container-x py-4">
              {ids.map((id, i) => (
                <motion.li
                  key={id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={transition(0.4, 0.05 * i)}
                >
                  <a
                    href={`#${id}`}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-baseline gap-4 border-b border-line py-4 text-2xl font-medium last:border-0"
                  >
                    <span className="label text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {dict.items[id]}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

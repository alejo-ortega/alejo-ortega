"use client";

import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { profile } from "@/content/profile";
import type { Dictionary, SectionId } from "@/content/types";
import { otherLocale } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { rememberLocale } from "@/lib/locale-client";
import { transition } from "@/lib/motion";
import {
  ArrowUpRight,
  Copy,
  Download,
  Globe,
  Hash,
  Search,
} from "./icons";

type PaletteContext = { open: () => void };
const Context = createContext<PaletteContext>({ open: () => {} });
export const useCommandPalette = () => useContext(Context);

const noopSubscribe = () => () => {};
/** "⌘" en Apple, "Ctrl" en el resto. El servidor siempre renderiza "⌘". */
export function useModifierKey() {
  return useSyncExternalStore(
    noopSubscribe,
    () => (/Mac|iPhone|iPad/.test(navigator.platform) ? "⌘" : "Ctrl"),
    () => "⌘",
  );
}

type Item = {
  id: string;
  group: keyof Dictionary["palette"]["groups"];
  label: string;
  hint?: string;
  icon: React.ReactNode;
  run: () => void;
};

type Props = {
  lang: Locale;
  dict: Dictionary["palette"];
  sections: Record<SectionId, string>;
  children: React.ReactNode;
};

export function CommandPaletteProvider({
  lang,
  dict,
  sections,
  children,
}: Props) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const open = useCallback(() => {
    lastFocus.current = document.activeElement as HTMLElement | null;
    setQuery("");
    setActive(0);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    lastFocus.current?.focus?.();
  }, []);

  // El toast se descarta solo; el efecto limpia el timer si cambia o se desmonta.
  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 2200);
    return () => clearTimeout(id);
  }, [toast]);

  // Atajo global ⌘K / Ctrl+K.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (isOpen) close();
        else open();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, open, close]);

  // Bloquea el scroll del fondo mientras la paleta está abierta.
  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  const items = useMemo<Item[]>(() => {
    const goTo = (id: string) => () => {
      document
        .getElementById(id)
        ?.scrollIntoView({
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
            .matches
            ? "auto"
            : "smooth",
        });
      history.replaceState(null, "", `#${id}`);
    };
    const external = (href: string) => () => {
      window.open(href, "_blank", "noopener,noreferrer");
    };

    const navigate: Item[] = (Object.keys(sections) as SectionId[]).map(
      (id) => ({
        id: `nav-${id}`,
        group: "navigate",
        label: sections[id],
        hint: `#${id}`,
        icon: <Hash />,
        run: goTo(id),
      }),
    );

    const actions: Item[] = [
      {
        id: "lang",
        group: "actions",
        label: dict.actions.switchLanguage,
        hint: otherLocale(lang).toUpperCase(),
        icon: <Globe />,
        run: () => {
          const next = otherLocale(lang);
          rememberLocale(next);
          router.replace(`/${next}${window.location.hash}`, { scroll: false });
        },
      },
      {
        id: "copy-email",
        group: "actions",
        label: dict.actions.copyEmail,
        hint: profile.email,
        icon: <Copy />,
        run: () => {
          navigator.clipboard
            .writeText(profile.email)
            .then(() => setToast(dict.actions.emailCopied))
            .catch(() => {});
        },
      },
      {
        id: "cv",
        group: "actions",
        label: dict.actions.downloadCv,
        hint: "PDF",
        icon: <Download />,
        run: external(profile.cvFile),
      },
    ];

    const links: Item[] = [
      { id: "github", label: "GitHub", href: profile.github },
      { id: "linkedin", label: "LinkedIn", href: profile.linkedin },
      { id: "whatsapp", label: "WhatsApp", href: profile.whatsapp },
    ].map(({ id, label, href }) => ({
      id: `link-${id}`,
      group: "links",
      label,
      icon: <ArrowUpRight />,
      run: external(href),
    }));

    return [...navigate, ...actions, ...links];
  }, [sections, dict, lang, router]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((item) =>
      `${item.label} ${item.hint ?? ""}`.toLowerCase().includes(q),
    );
  }, [items, query]);

  const run = (item: Item | undefined) => {
    if (!item) return;
    setIsOpen(false);
    // Deja que el cierre empiece antes de scrollear o navegar.
    requestAnimationFrame(item.run);
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      event.preventDefault();
      close();
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((i) => (results.length ? (i + 1) % results.length : 0));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((i) =>
        results.length ? (i - 1 + results.length) % results.length : 0,
      );
    } else if (event.key === "Enter") {
      event.preventDefault();
      run(results[active]);
    } else if (event.key === "Tab") {
      event.preventDefault(); // El foco se queda dentro del diálogo.
    }
  };

  useEffect(() => {
    listRef.current
      ?.querySelector<HTMLElement>('[aria-selected="true"]')
      ?.scrollIntoView({ block: "nearest" });
  }, [active, results]);

  const modifier = useModifierKey();

  return (
    <Context.Provider value={{ open }}>
      {children}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-start justify-center px-4 pt-[12vh]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={close}
              aria-hidden="true"
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={dict.placeholder}
              onKeyDown={onKeyDown}
              className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-line-strong bg-surface shadow-2xl shadow-black/60"
              initial={{ opacity: 0, scale: 0.97, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -6 }}
              transition={transition(0.3)}
            >
              <div className="flex items-center gap-3 border-b border-line px-4">
                <Search className="size-4 shrink-0 text-muted" />
                <input
                  autoFocus
                  value={query}
                  onChange={(event) => {
                    setQuery(event.target.value);
                    setActive(0);
                  }}
                  placeholder={dict.placeholder}
                  role="combobox"
                  aria-expanded="true"
                  aria-controls="palette-list"
                  aria-activedescendant={
                    results[active] ? `palette-${results[active].id}` : undefined
                  }
                  className="h-14 w-full bg-transparent text-base text-fg placeholder:text-muted focus:outline-none"
                />
                <kbd className="label rounded border border-line-strong px-1.5 py-1">
                  Esc
                </kbd>
              </div>

              <ul
                ref={listRef}
                id="palette-list"
                role="listbox"
                className="max-h-[55vh] overflow-y-auto p-2"
              >
                {results.length === 0 && (
                  <li className="px-3 py-10 text-center text-sm text-muted">
                    {dict.empty}
                  </li>
                )}
                {results.map((item, index) => {
                  const showGroup =
                    index === 0 || results[index - 1].group !== item.group;
                  const isActive = index === active;
                  return (
                    <li key={item.id} role="presentation">
                      {showGroup && (
                        <p className="label px-3 pb-2 pt-4 first:pt-2">
                          {dict.groups[item.group]}
                        </p>
                      )}
                      <div
                        id={`palette-${item.id}`}
                        role="option"
                        aria-selected={isActive}
                        onMouseMove={() => setActive(index)}
                        onClick={() => run(item)}
                        className="relative flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm"
                      >
                        {isActive && (
                          <motion.span
                            layoutId="palette-active"
                            className="absolute inset-0 rounded-lg bg-surface-2"
                            transition={transition(0.25)}
                          />
                        )}
                        <span
                          className={`relative ${isActive ? "text-accent" : "text-muted"}`}
                        >
                          {item.icon}
                        </span>
                        <span className="relative flex-1 truncate">
                          {item.label}
                        </span>
                        {item.hint && (
                          <span className="label relative truncate normal-case tracking-normal">
                            {item.hint}
                          </span>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>

              <div className="hidden items-center gap-5 border-t border-line px-4 py-3 sm:flex">
                <span className="label flex items-center gap-2">
                  <kbd>↵</kbd> {dict.hint.select}
                </span>
                <span className="label flex items-center gap-2">
                  <kbd>↑↓</kbd> {dict.hint.navigate}
                </span>
                <span className="label ml-auto">{modifier} K</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div
            role="status"
            className="fixed bottom-6 left-1/2 z-[95] -translate-x-1/2 rounded-full border border-line-strong bg-surface px-4 py-2 text-sm shadow-xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={transition(0.35)}
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </Context.Provider>
  );
}

import type { Locale } from "@/lib/i18n";
import { en } from "./en";
import { es } from "./es";
import type { Dictionary } from "./types";

const dictionaries: Record<Locale, Dictionary> = { es, en };

export const getDictionary = (locale: Locale): Dictionary =>
  dictionaries[locale];

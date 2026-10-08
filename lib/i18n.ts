export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "es";
export const LOCALE_COOKIE = "lang";

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

export const otherLocale = (locale: Locale): Locale =>
  locale === "es" ? "en" : "es";

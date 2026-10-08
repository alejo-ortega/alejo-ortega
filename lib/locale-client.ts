"use client";

import { LOCALE_COOKIE } from "./i18n";
import type { Locale } from "./i18n";

/**
 * Scroll a restaurar tras el cambio de idioma. Al navegar entre /es y /en el
 * árbol viejo y el nuevo conviven un instante y el navegador salta al final de
 * la página, así que guardamos la posición y la devolvemos al montar el nuevo.
 */
let pendingScroll: number | null = null;

/** Llamar justo antes de navegar a otro idioma. */
export function rememberLocale(locale: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; samesite=lax`;
  pendingScroll = window.scrollY;
}

/** Devuelve (y olvida) el scroll pendiente, o null si no hubo cambio de idioma. */
export function consumePendingScroll() {
  const y = pendingScroll;
  pendingScroll = null;
  return y;
}

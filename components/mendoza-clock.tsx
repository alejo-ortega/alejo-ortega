"use client";

import { useSyncExternalStore } from "react";
import { profile } from "@/content/profile";

const formatter = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: profile.timeZone,
});

function subscribe(onChange: () => void) {
  const id = setInterval(onChange, 1000);
  return () => clearInterval(id);
}

/**
 * Hora local de Mendoza. El snapshot del servidor es null para no depender de
 * `Date` durante el prerender (Cache Components) ni generar un mismatch.
 */
export function MendozaClock() {
  const time = useSyncExternalStore(
    subscribe,
    () => formatter.format(new Date()),
    () => null,
  );

  return (
    <time
      suppressHydrationWarning
      className="tabular-nums"
      aria-label={time ?? undefined}
    >
      {time ?? "--:--"}
    </time>
  );
}

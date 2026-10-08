import type { Metadata } from "next";
import {
  Instrument_Sans,
  Instrument_Serif,
  JetBrains_Mono,
} from "next/font/google";
import { notFound } from "next/navigation";
import { MotionProvider } from "@/components/motion-provider";
import { CommandPaletteProvider } from "@/components/command-palette";
import { Nav } from "@/components/nav";
import { getDictionary } from "@/content";
import { hasLocale, locales, otherLocale } from "@/lib/i18n";
import "../globals.css";

const sans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
  display: "swap",
});
const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { meta } = getDictionary(lang);

  return {
    metadataBase: new URL(siteUrl),
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/${lang}`,
      languages: { es: "/es", en: "/en", "x-default": "/es" },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `/${lang}`,
      siteName: "Alejo Ortega",
      locale: lang === "es" ? "es_AR" : "en_US",
      alternateLocale: otherLocale(lang) === "es" ? "es_AR" : "en_US",
      type: "website",
    },
    twitter: { card: "summary", title: meta.title, description: meta.description },
  };
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <html
      lang={lang}
      className={`${sans.variable} ${serif.variable} ${mono.variable}`}
    >
      <body>
        <MotionProvider>
          <CommandPaletteProvider
            lang={lang}
            dict={dict.palette}
            sections={{ ...dict.nav.items, education: dict.education.title }}
          >
            <a
              href="#main"
              className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-white"
            >
              {dict.nav.skip}
            </a>
            <Nav lang={lang} dict={dict.nav} />
            {children}
          </CommandPaletteProvider>
        </MotionProvider>
      </body>
    </html>
  );
}

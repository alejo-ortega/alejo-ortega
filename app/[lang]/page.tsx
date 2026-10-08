import { notFound } from "next/navigation";
import { About } from "@/components/about";
import { AiSection } from "@/components/ai-section";
import { Contact } from "@/components/contact";
import { Experience } from "@/components/experience";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Stack } from "@/components/stack";
import { Work } from "@/components/work";
import { getDictionary } from "@/content";
import { hasLocale } from "@/lib/i18n";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <>
      <main id="main">
        <Hero dict={dict.hero} />
        <About dict={dict.about} />
        <Experience dict={dict.experience} />
        <Work dict={dict.work} />
        <AiSection dict={dict.ai} />
        <Stack stack={dict.stack} education={dict.education} />
        <Contact dict={dict.contact} />
      </main>
      <Footer dict={dict.footer} />
    </>
  );
}

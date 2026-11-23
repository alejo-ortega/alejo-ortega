import { getDictionary } from "@/content";
import { profile, stackGroups } from "@/content/profile";
import type { StackGroupId } from "@/content/types";
import { locales } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

/**
 * Contenido del CV. La forma es idéntica en ambos idiomas, así que
 * TypeScript (y `scripts/build-cv.ts`) garantizan la misma información.
 *
 * Todo lo que ya existe en el portfolio (stack, formación, idiomas, roles,
 * empresas y fechas) se toma del diccionario del sitio; aquí solo vive lo
 * propio del CV: el perfil y las viñetas condensadas de cada rol.
 */
export type CvContent = {
  lang: Locale;
  title: string;
  name: { first: string; last: string };
  role: string;
  location: string;
  age: string;
  contacts: { label: string; href: string }[];
  sections: {
    profile: string;
    experience: string;
    stack: string;
    education: string;
    languages: string;
    approach: string;
  };
  summary: string;
  experience: {
    role: string;
    company: string;
    period: string;
    bullets: string[];
  }[];
  stack: { label: string; items: string[] }[];
  education: { title: string; issuer: string }[];
  languages: { name: string; level: string }[];
  approach: string[];
};

type CvText = {
  title: string;
  role: string;
  location: string;
  age: string;
  sections: CvContent["sections"];
  summary: string;
  bullets: string[][];
};

// Los bullets siguen el orden de `dict.experience.items`: Follow LSN, Itesa, Freelance, Dubbz.
const text: Record<Locale, CvText> = {
  es: {
    title: "Alejo Ortega — CV · Desarrollador Full Stack",
    role: "Desarrollador Full Stack",
    location: "Mendoza, Argentina",
    age: "28 años",
    sections: {
      profile: "Perfil",
      experience: "Experiencia",
      stack: "Stack",
      education: "Formación",
      languages: "Idiomas",
      approach: "Cómo trabajo",
    },
    summary:
      "Desarrollador Full Stack con más de 4 años de experiencia en aplicaciones web y móviles con React, React Native, Java/Spring Boot y Node.js. Hoy lidero técnicamente un equipo: coordino tareas y trabajo junto a agentes de IA en desarrollo, debugging, refactoring y documentación.",
    bullets: [
      [
        "Lidero el equipo técnico: coordino al equipo, organizo las tareas y doy seguimiento al desarrollo.",
        "Desarrollo y mantengo aplicaciones web y móviles con React, React Native y Java/Spring Boot, con mapas, geolocalización, formularios, dashboards e integraciones.",
        "Mantengo servidores y gestiono entornos con Docker.",
        "Incorporo agentes de IA al flujo de trabajo del equipo.",
      ],
      [
        "Desarrollé aplicaciones web con React, Node.js, Express y MongoDB.",
        "Desarrollé e integré APIs y servicios de IA.",
        "Participé en planificación, desarrollo, pruebas y despliegue.",
      ],
      [
        "Desarrollé sitios y aplicaciones web a medida con React, Next.js y Tailwind CSS.",
        "Integré APIs y servicios externos.",
        "Brindé asesoría técnica, definí requisitos y mantuve los proyectos.",
      ],
      [
        "Realicé pruebas funcionales de nuevas características y reporté incidencias.",
        "Colaboré con equipos internacionales bajo metodologías ágiles.",
        "Brindé soporte técnico y moderé la plataforma.",
      ],
    ],
  },
  en: {
    title: "Alejo Ortega — CV · Full Stack Developer",
    role: "Full Stack Developer",
    location: "Mendoza, Argentina",
    age: "28 years old",
    sections: {
      profile: "Profile",
      experience: "Experience",
      stack: "Stack",
      education: "Education",
      languages: "Languages",
      approach: "How I work",
    },
    summary:
      "Full Stack developer with 4+ years of experience building web and mobile applications with React, React Native, Java/Spring Boot and Node.js. I currently lead a technical team: I coordinate tasks and work alongside AI agents in development, debugging, refactoring and documentation.",
    bullets: [
      [
        "Lead the technical team: coordinating the team, organizing tasks and tracking development progress.",
        "Build and maintain web and mobile applications with React, React Native and Java/Spring Boot, including maps, geolocation, forms, dashboards and integrations.",
        "Maintain servers and manage environments with Docker.",
        "Bring AI agents into the team's workflow.",
      ],
      [
        "Built web applications with React, Node.js, Express and MongoDB.",
        "Developed and integrated AI APIs and services.",
        "Took part in planning, development, testing and deployment.",
      ],
      [
        "Built custom websites and web applications with React, Next.js and Tailwind CSS.",
        "Integrated APIs and external services.",
        "Provided technical advice, defined requirements and maintained projects.",
      ],
      [
        "Ran functional tests on new features and reported issues.",
        "Worked with international teams under agile methodologies.",
        "Provided technical support and moderated the platform.",
      ],
    ],
  },
};

const stackOrder = Object.keys(stackGroups) as StackGroupId[];

/** Diferencias del stack del CV respecto del portfolio. */
const stackOverrides: Partial<Record<StackGroupId, (items: string[]) => string[]>> = {
  ai: (items) => [...items.filter((i) => i !== "Prompt Engineering"), "n8n"],
};

const strip = (url: string) => url.replace(/^https?:\/\//, "");

export function getCv(lang: Locale): CvContent {
  const dict = getDictionary(lang);
  const t = text[lang];

  return {
    lang,
    title: t.title,
    name: { first: "Alejo", last: "Ortega" },
    role: t.role,
    location: t.location,
    age: t.age,
    contacts: [
      { label: profile.email, href: `mailto:${profile.email}` },
      { label: strip(profile.linkedin), href: profile.linkedin },
      { label: strip(profile.github), href: profile.github },
      { label: profile.phone, href: profile.whatsapp },
    ],
    sections: t.sections,
    summary: t.summary,
    experience: dict.experience.items.map((item, i) => ({
      role: item.role,
      company: item.company,
      period: item.period,
      bullets: t.bullets[i],
    })),
    stack: stackOrder.map((id) => ({
      label: dict.stack.groups[id],
      items: stackOverrides[id]?.(stackGroups[id]) ?? stackGroups[id],
    })),
    education: dict.education.certs,
    languages: dict.education.languages,
    approach: dict.about.soft,
  };
}

export const cvLocales = locales;

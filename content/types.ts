export type SectionId =
  | "about"
  | "experience"
  | "work"
  | "ai"
  | "stack"
  | "education"
  | "contact";

export type NavId = Exclude<SectionId, "education">;

export type AiStepId = "develop" | "debug" | "refactor" | "document";

export type StackGroupId = "frontend" | "backend" | "data" | "devops" | "ai";

export type Dictionary = {
  meta: { title: string; description: string };
  nav: {
    items: Record<NavId, string>;
    menu: string;
    closeMenu: string;
    search: string;
    switchTo: string;
    skip: string;
  };
  hero: {
    role: string;
    intro: string;
    status: string;
    localTime: string;
    cta: string;
    cv: string;
    scroll: string;
  };
  about: {
    title: string;
    lead: string;
    body: string[];
    facts: { label: string; value: string }[];
    softTitle: string;
    soft: string[];
    photoAlt: string;
  };
  experience: {
    title: string;
    intro: string;
    present: string;
    items: {
      role: string;
      company: string;
      period: string;
      current?: boolean;
      bullets: string[];
    }[];
  };
  work: {
    title: string;
    intro: string;
    placeholder: string;
    items: {
      title: string;
      company: string;
      description: string;
    }[];
  };
  ai: {
    title: string;
    intro: string;
    toolsLabel: string;
    exampleLabel: string;
    note: string;
    steps: Record<
      AiStepId,
      { label: string; description: string; prompt: string; output: string[] }
    >;
  };
  stack: {
    title: string;
    intro: string;
    groups: Record<StackGroupId, string>;
    practicesTitle: string;
    practices: string[];
  };
  education: {
    title: string;
    certs: { title: string; issuer: string }[];
    languagesTitle: string;
    languages: { name: string; level: string }[];
  };
  contact: {
    title: string;
    heading: string;
    text: string;
    copy: string;
    copied: string;
    cv: string;
    links: { email: string; linkedin: string; github: string; whatsapp: string };
  };
  palette: {
    placeholder: string;
    empty: string;
    groups: { navigate: string; actions: string; links: string };
    actions: {
      switchLanguage: string;
      copyEmail: string;
      downloadCv: string;
      emailCopied: string;
    };
    hint: { select: string; navigate: string; close: string };
  };
  footer: { built: string; top: string };
};

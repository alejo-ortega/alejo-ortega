import type { AiStepId, StackGroupId } from "./types";

/** Datos que no dependen del idioma. */
export const profile = {
  name: "Alejo Ortega",
  email: "alejo1898ortega@gmail.com",
  phone: "+54 261 213 6449",
  whatsapp: "https://wa.me/5492612136449",
  github: "https://github.com/alejo-ortega",
  linkedin: "https://linkedin.com/in/alejo-ortega",
  cvFile: "/Alejo-Ortega-CV.pdf",
  timeZone: "America/Argentina/Mendoza",
  /** Cambiar a false para ocultar el punto verde "Disponible". */
  available: true,
} as const;

export const stackGroups: Record<StackGroupId, string[]> = {
  frontend: [
    "JavaScript",
    "TypeScript",
    "React",
    "React Native",
    "Next.js",
    "Redux",
    "React Query",
    "Material UI",
    "Tailwind CSS",
  ],
  backend: [
    "Node.js",
    "Express",
    "NestJS",
    "Java",
    "Spring Boot",
    "Python",
    "REST APIs",
  ],
  data: ["PostgreSQL", "MySQL", "MongoDB"],
  devops: ["Docker", "Linux", "Git"],
  ai: ["Claude Code", "OpenCode", "Cursor", "LLMs", "Prompt Engineering"],
};

export const aiTools = ["Claude Code", "OpenCode", "Cursor"] as const;

export const aiStepOrder: AiStepId[] = [
  "develop",
  "debug",
  "refactor",
  "document",
];

/** Tags de los casos de la sección Work, en el mismo orden que el diccionario. */
export const workStacks: string[][] = [
  ["React", "React Native", "Spring Boot", "Docker"],
  ["React", "Java", "Spring Boot"],
  ["React", "Node.js", "Express", "MongoDB"],
];

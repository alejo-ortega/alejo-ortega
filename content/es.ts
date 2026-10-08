import type { Dictionary } from "./types";

export const es = {
  meta: {
    title: "Alejo Ortega — Desarrollador Full Stack & Team Lead",
    description:
      "Desarrollador Full Stack con más de 4 años de experiencia en React, React Native, Java/Spring Boot y Node.js. Liderazgo técnico y agentes de IA para construir software escalable. Mendoza, Argentina.",
  },
  nav: {
    items: {
      about: "Sobre mí",
      experience: "Experiencia",
      work: "Trabajo",
      ai: "IA",
      stack: "Stack",
      contact: "Contacto",
    },
    menu: "Abrir menú",
    closeMenu: "Cerrar menú",
    search: "Buscar",
    switchTo: "Cambiar a inglés",
    skip: "Saltar al contenido",
  },
  hero: {
    role: "Desarrollador Full Stack · Team Lead",
    intro:
      "Diseño y construyo aplicaciones web y móviles escalables, coordino equipos técnicos y uso agentes de IA para entregar mejor y más rápido.",
    status: "Disponible para nuevos proyectos",
    localTime: "Mendoza",
    cta: "Hablemos",
    cv: "Descargar CV",
    scroll: "Scroll",
  },
  about: {
    title: "Sobre mí",
    lead: "Construyo productos web y móviles que escalan, y ayudo a los equipos a entregarlos bien.",
    body: [
      "Soy Desarrollador Full Stack con más de 4 años de experiencia en aplicaciones web y móviles. Trabajo con React, React Native, Java/Spring Boot y Node.js, y participo en frontend, backend y DevOps.",
      "Hoy estoy enfocado en el liderazgo técnico: coordino al equipo, organizo las tareas y cuido la arquitectura y la calidad del código. Incorporo herramientas y agentes de IA para optimizar todo el proceso de desarrollo.",
    ],
    facts: [
      { label: "Experiencia", value: "+4 años" },
      { label: "Rol actual", value: "Team Leader · Follow LSN" },
      { label: "Base", value: "Mendoza, Argentina" },
      { label: "Idiomas", value: "Español · Inglés B2" },
    ],
    softTitle: "Cómo trabajo",
    soft: [
      "Liderazgo y coordinación de equipos",
      "Gestión y priorización de tareas",
      "Resolución de problemas",
      "Comunicación efectiva y trabajo en equipo",
    ],
    photoAlt: "Retrato de Alejo Ortega",
  },
  experience: {
    title: "Experiencia",
    intro: "De QA a liderar un equipo técnico: cuatro años construyendo software.",
    present: "Presente",
    items: [
      {
        role: "Team Leader / Desarrollador Full Stack",
        company: "Follow LSN",
        period: "Enero 2025 – Presente",
        current: true,
        bullets: [
          "Desarrollo y mantenimiento de aplicaciones web y móviles con React, React Native y Java/Spring Boot.",
          "Mantenimiento de servidores y gestión de entornos con Docker.",
          "Coordinación del equipo, organización de tareas y seguimiento del desarrollo.",
          "Implementación de mapas, geolocalización, formularios, dashboards e integraciones.",
          "Creación de componentes reutilizables y mejoras de arquitectura y calidad de código.",
          "Uso de agentes de IA para desarrollo, debugging, refactoring y documentación.",
        ],
      },
      {
        role: "Desarrollador Full Stack",
        company: "Itesa Innovation Hub",
        period: "Febrero 2024 – Agosto 2024",
        bullets: [
          "Desarrollo de aplicaciones web con React, Node.js, Express y MongoDB.",
          "Desarrollo e integración de APIs y servicios de IA.",
          "Participación en planificación, desarrollo, pruebas y despliegue.",
        ],
      },
      {
        role: "Desarrollador Web",
        company: "Freelance",
        period: "Julio 2022 – Enero 2024",
        bullets: [
          "Desarrollo de sitios y aplicaciones web personalizadas con React, Next.js y Tailwind CSS.",
          "Integración de APIs y servicios externos.",
          "Asesoría técnica, definición de requisitos y mantenimiento de proyectos.",
        ],
      },
      {
        role: "QA & Soporte Técnico",
        company: "Dubbz",
        period: "Diciembre 2020 – Julio 2022",
        bullets: [
          "Pruebas funcionales de nuevas características y reporte de incidencias.",
          "Colaboración con equipos internacionales bajo metodologías ágiles.",
          "Soporte técnico y moderación de la plataforma.",
        ],
      },
    ],
  },
  work: {
    title: "Trabajo",
    intro: "Áreas en las que construyo producto, organizadas como casos de estudio.",
    placeholder: "Placeholder",
    items: [
      {
        title: "Mapas y geolocalización",
        company: "Follow LSN",
        description:
          "Visualización de ubicaciones y formularios con geolocalización en aplicaciones web y móviles.",
      },
      {
        title: "Dashboards e integraciones",
        company: "Follow LSN",
        description:
          "Paneles de información e integraciones con servicios externos, con componentes reutilizables.",
      },
      {
        title: "APIs y servicios de IA",
        company: "Itesa Innovation Hub",
        description:
          "Desarrollo e integración de APIs y servicios de inteligencia artificial en aplicaciones web.",
      },
    ],
  },
  ai: {
    title: "Flujo con IA",
    intro:
      "Los agentes aceleran el trabajo; el criterio sigue siendo mío. Los uso en cada etapa del desarrollo, siempre con revisión humana.",
    toolsLabel: "Herramientas",
    exampleLabel: "Ejemplo ilustrativo",
    note: "Cada cambio pasa por revisión antes de llegar a producción.",
    steps: {
      develop: {
        label: "Desarrollo",
        description:
          "Defino el plan, delego tareas acotadas al agente y reviso cada resultado.",
        prompt: "Agregá un selector de ubicación con mapa al formulario de alta.",
        output: [
          "Plan en 3 pasos acordado",
          "Componente <MapPicker /> creado",
          "Revisado y ajustado a la arquitectura",
        ],
      },
      debug: {
        label: "Debugging",
        description:
          "Aislo el problema, le doy contexto al agente y valido la causa antes de aplicar el arreglo.",
        prompt: "El dashboard muestra datos viejos al volver a la pestaña.",
        output: [
          "Hipótesis: caché sin invalidar",
          "Reproducido con un test",
          "Fix verificado en el entorno",
        ],
      },
      refactor: {
        label: "Refactoring",
        description:
          "Extraigo componentes reutilizables y mejoro la arquitectura con cambios pequeños y verificables.",
        prompt: "Extraé la lógica de formularios repetida a un hook reutilizable.",
        output: [
          "Duplicación detectada entre pantallas",
          "Hook compartido y tipado",
          "Comportamiento intacto, tests en verde",
        ],
      },
      document: {
        label: "Documentación",
        description:
          "Mantengo documentación útil para el equipo sin que se vuelva una carga.",
        prompt: "Documentá cómo levantar el entorno local con Docker.",
        output: [
          "Guía paso a paso redactada",
          "Variables de entorno listadas",
          "Revisada contra un entorno limpio",
        ],
      },
    },
  },
  stack: {
    title: "Stack",
    intro: "Las herramientas con las que trabajo a diario.",
    groups: {
      frontend: "Frontend & Mobile",
      backend: "Backend",
      data: "Datos",
      devops: "DevOps & Tools",
      ai: "IA",
    },
    practicesTitle: "Prácticas",
    practices: ["Debugging", "Refactoring", "Code Review"],
  },
  education: {
    title: "Formación e idiomas",
    certs: [
      {
        title: "Programación Full Stack con Java y Spring Boot",
        issuer: "Egg Educación",
      },
      {
        title: "Python Programming, Python Data Structures",
        issuer: "Coursera & University of Michigan",
      },
      {
        title:
          "Desarrollo Frontend, Fundamentos de Node, Desarrollo Backend con Node y Express",
        issuer: "Platzi",
      },
    ],
    languagesTitle: "Idiomas",
    languages: [
      { name: "Español", level: "Nativo" },
      { name: "Inglés", level: "Intermedio alto (B2)" },
    ],
  },
  contact: {
    title: "Contacto",
    heading: "Construyamos algo juntos.",
    text: "Estoy abierto a nuevas oportunidades y proyectos. Escribime y charlamos.",
    copy: "Copiar mail",
    copied: "Copiado",
    cv: "Descargar CV",
    links: {
      email: "Email",
      linkedin: "LinkedIn",
      github: "GitHub",
      whatsapp: "WhatsApp",
    },
  },
  palette: {
    placeholder: "Buscá una sección o acción…",
    empty: "Sin resultados",
    groups: { navigate: "Ir a", actions: "Acciones", links: "Enlaces" },
    actions: {
      switchLanguage: "Cambiar a English",
      copyEmail: "Copiar mail",
      downloadCv: "Descargar CV",
      emailCopied: "Mail copiado",
    },
    hint: { select: "Seleccionar", navigate: "Navegar", close: "Cerrar" },
  },
  footer: { built: "Hecho con Next.js y Motion", top: "Volver arriba" },
} satisfies Dictionary;

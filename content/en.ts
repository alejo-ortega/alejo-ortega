import type { Dictionary } from "./types";

export const en = {
  meta: {
    title: "Alejo Ortega — Full Stack Developer & Team Lead",
    description:
      "Full Stack developer with 4+ years of experience in React, React Native, Java/Spring Boot and Node.js. Technical leadership and AI agents to build scalable software. Based in Mendoza, Argentina.",
  },
  nav: {
    items: {
      about: "About",
      experience: "Experience",
      work: "Work",
      ai: "AI",
      stack: "Stack",
      contact: "Contact",
    },
    menu: "Open menu",
    closeMenu: "Close menu",
    search: "Search",
    switchTo: "Switch to Spanish",
    skip: "Skip to content",
  },
  hero: {
    role: "Full Stack Developer · Team Lead",
    intro:
      "I design and build scalable web and mobile applications, lead technical teams and use AI agents to ship better and faster.",
    status: "Available for new projects",
    localTime: "Mendoza",
    cta: "Let's talk",
    cv: "Download CV",
    scroll: "Scroll",
  },
  about: {
    title: "About",
    lead: "I build web and mobile products that scale, and help teams ship them well.",
    body: [
      "I'm a Full Stack developer with 4+ years of experience in web and mobile applications. I work with React, React Native, Java/Spring Boot and Node.js, across frontend, backend and DevOps.",
      "Right now I'm focused on technical leadership: I coordinate the team, organize tasks and look after architecture and code quality. I bring AI tools and agents into the workflow to streamline the whole development process.",
    ],
    facts: [
      { label: "Experience", value: "4+ years" },
      { label: "Current role", value: "Team Leader · Follow LSN" },
      { label: "Based in", value: "Mendoza, Argentina" },
      { label: "Languages", value: "Spanish · English B2" },
    ],
    softTitle: "How I work",
    soft: [
      "Team leadership and coordination",
      "Task management and prioritization",
      "Problem solving",
      "Clear communication and teamwork",
    ],
    photoAlt: "Portrait of Alejo Ortega",
  },
  experience: {
    title: "Experience",
    intro: "From QA to leading a technical team: four years building software.",
    present: "Present",
    items: [
      {
        role: "Team Leader / Full Stack Developer",
        company: "Follow LSN",
        period: "January 2025 – Present",
        current: true,
        bullets: [
          "Developing and maintaining web and mobile applications with React, React Native and Java/Spring Boot.",
          "Server maintenance and environment management with Docker.",
          "Team coordination, task organization and development follow-up.",
          "Implementing maps, geolocation, forms, dashboards and integrations.",
          "Building reusable components and improving architecture and code quality.",
          "Using AI agents for development, debugging, refactoring and documentation.",
        ],
      },
      {
        role: "Full Stack Developer",
        company: "Itesa Innovation Hub",
        period: "February 2024 – August 2024",
        bullets: [
          "Building web applications with React, Node.js, Express and MongoDB.",
          "Developing and integrating AI APIs and services.",
          "Taking part in planning, development, testing and deployment.",
        ],
      },
      {
        role: "Web Developer",
        company: "Freelance",
        period: "July 2022 – January 2024",
        bullets: [
          "Building custom websites and web applications with React, Next.js and Tailwind CSS.",
          "Integrating APIs and external services.",
          "Technical advice, requirements definition and project maintenance.",
        ],
      },
      {
        role: "QA & Technical Support",
        company: "Dubbz",
        period: "December 2020 – July 2022",
        bullets: [
          "Functional testing of new features and issue reporting.",
          "Working with international teams under agile methodologies.",
          "Technical support and platform moderation.",
        ],
      },
    ],
  },
  work: {
    title: "Work",
    intro: "Areas where I build product, organized as case studies.",
    placeholder: "Placeholder",
    items: [
      {
        title: "Maps & geolocation",
        company: "Follow LSN",
        description:
          "Location visualization and geolocation-aware forms across web and mobile applications.",
      },
      {
        title: "Dashboards & integrations",
        company: "Follow LSN",
        description:
          "Information dashboards and integrations with external services, built with reusable components.",
      },
      {
        title: "AI APIs & services",
        company: "Itesa Innovation Hub",
        description:
          "Developing and integrating APIs and artificial intelligence services into web applications.",
      },
    ],
  },
  ai: {
    title: "AI workflow",
    intro:
      "Agents speed the work up; the judgment stays mine. I use them at every stage of development, always with human review.",
    toolsLabel: "Tools",
    exampleLabel: "Illustrative example",
    note: "Every change is reviewed before it reaches production.",
    steps: {
      develop: {
        label: "Development",
        description:
          "I define the plan, hand scoped tasks to the agent and review every result.",
        prompt: "Add a map-based location picker to the sign-up form.",
        output: [
          "3-step plan agreed",
          "<MapPicker /> component created",
          "Reviewed and aligned with the architecture",
        ],
      },
      debug: {
        label: "Debugging",
        description:
          "I isolate the problem, give the agent context and confirm the cause before applying a fix.",
        prompt: "The dashboard shows stale data when returning to the tab.",
        output: [
          "Hypothesis: cache not invalidated",
          "Reproduced with a test",
          "Fix verified in the environment",
        ],
      },
      refactor: {
        label: "Refactoring",
        description:
          "I extract reusable components and improve architecture through small, verifiable changes.",
        prompt: "Extract the repeated form logic into a reusable hook.",
        output: [
          "Duplication found across screens",
          "Shared, typed hook",
          "Behavior unchanged, tests green",
        ],
      },
      document: {
        label: "Documentation",
        description:
          "I keep documentation useful for the team without making it a burden.",
        prompt: "Document how to run the local environment with Docker.",
        output: [
          "Step-by-step guide written",
          "Environment variables listed",
          "Checked against a clean environment",
        ],
      },
    },
  },
  stack: {
    title: "Stack",
    intro: "The tools I work with every day.",
    groups: {
      frontend: "Frontend & Mobile",
      backend: "Backend",
      data: "Data",
      devops: "DevOps & Tools",
      ai: "AI",
    },
    practicesTitle: "Practices",
    practices: ["Debugging", "Refactoring", "Code Review"],
  },
  education: {
    title: "Education & languages",
    certs: [
      {
        title: "Full Stack Programming with Java and Spring Boot",
        issuer: "Egg Educación",
      },
      {
        title: "Python Programming, Python Data Structures",
        issuer: "Coursera & University of Michigan",
      },
      {
        title:
          "Frontend Development, Node Fundamentals, Backend Development with Node and Express",
        issuer: "Platzi",
      },
    ],
    languagesTitle: "Languages",
    languages: [
      { name: "Spanish", level: "Native" },
      { name: "English", level: "Upper intermediate (B2)" },
    ],
  },
  contact: {
    title: "Contact",
    heading: "Let's build something together.",
    text: "I'm open to new opportunities and projects. Drop me a line and let's talk.",
    copy: "Copy email",
    copied: "Copied",
    cv: "Download CV",
    links: {
      email: "Email",
      linkedin: "LinkedIn",
      github: "GitHub",
      whatsapp: "WhatsApp",
    },
  },
  palette: {
    placeholder: "Search a section or action…",
    empty: "No results",
    groups: { navigate: "Go to", actions: "Actions", links: "Links" },
    actions: {
      switchLanguage: "Cambiar a Español",
      copyEmail: "Copy email",
      downloadCv: "Download CV",
      emailCopied: "Email copied",
    },
    hint: { select: "Select", navigate: "Navigate", close: "Close" },
  },
  footer: { built: "Built with Next.js and Motion", top: "Back to top" },
} satisfies Dictionary;

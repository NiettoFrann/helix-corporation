/**
 * Configuración central del sitio. Fuente única de verdad para SEO, enlaces
 * y datos de marca. Mantener en sync con los metadatos de `index.html`.
 */
export const SITE = {
  name: "HELIX Corporation",
  tagline: "Ninguna corporación es intocable",
  description:
    "Infiltrá la red de HELIX Corp junto a La Mano Negra: laboratorios de ciberseguridad en Docker que se resuelven máquina por máquina, envueltos en una historia propia.",
  // TODO: reemplazar por el dominio real de Vercel cuando esté desplegado.
  url: "https://helix-corporation.vercel.app",
  locale: "es_AR",
  author: {
    name: "NiettoFran",
    github: "https://github.com/NiettoFrann",
  },
  repo: "https://github.com/NiettoFrann/helix-corporation",
} as const;

/** Paleta de marca para efectos en JS/canvas (el tema de Tailwind vive en index.css). */
export const BRAND = {
  black: "#0B0B0F",
  panel: "#1A1A2E",
  red: "#C1121F",
  redAlt: "#D61C4E",
  purple: "#740EE0",
  phosphor: "#3DF57E",
  blue: "#457B9D",
} as const;

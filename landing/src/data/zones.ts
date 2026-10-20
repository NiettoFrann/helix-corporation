import type { Zone } from "@/types";

/** Las cinco zonas de la red de HELIX. Ver `lore/mapa-de-red.md`. */
export const ZONES: Zone[] = [
  {
    id: "00-perimetro",
    code: "00",
    name: "Perímetro",
    network: "10.0.0.0/24",
    difficulties: ["facil"],
    summary:
      "Lo que HELIX expone a internet. Configuraciones por defecto, software sin actualizar desde el día del lanzamiento.",
  },
  {
    id: "01-corporativo",
    code: "01",
    name: "Corporativo",
    network: "10.0.1.0/24",
    difficulties: ["facil", "medio"],
    summary:
      "La intranet de todos los días: RRHH, la wiki de IT, la mesa de ayuda, Finanzas. Donde la gente deja cosas.",
  },
  {
    id: "02-clientes",
    code: "02",
    name: "Clientes",
    network: "10.0.2.0/24",
    difficulties: ["medio"],
    summary:
      "Lo que HELIX le vende al mundo: el portal de clientes y la consola de VIGÍA. Datos reales de terceros de por medio.",
  },
  {
    id: "03-legado",
    code: "03",
    name: "Legado",
    network: "10.0.3.0/24",
    difficulties: ["medio", "dificil"],
    summary:
      "Sistemas que llegaron con adquisiciones y nadie migró. Raros, viejos, con capas. Acá vive reportes-legacy-02.",
  },
  {
    id: "04-proyecto-cero",
    code: "04",
    name: "???",
    network: "10.0.4.0/24",
    difficulties: ["dificil"],
    summary:
      "La subred que no figura en los diagramas oficiales. Hacia acá va el tráfico que nadie sabe explicar.",
    classified: true,
  },
];

import type { Machine, ZoneId } from "@/types";

/**
 * Las máquinas jugables, por zona. Los `teaser` cuentan el gancho narrativo
 * (qué es el sistema en la historia) SIN revelar la vulnerabilidad: eso se
 * descubre jugando. Ver los README de cada máquina en `red/`.
 */
export const MACHINES: Machine[] = [
  {
    slug: "00-portal-empleados",
    name: "portal-empleados",
    zoneId: "00-perimetro",
    difficulty: "facil",
    fragment: "F-01",
    teaser:
      "El portal de autogestión de RRHH que pidieron “para ayer” en 2019 y nadie volvió a mirar.",
  },
  {
    slug: "01-web-institucional",
    name: "web-institucional",
    zoneId: "00-perimetro",
    difficulty: "facil",
    fragment: "F-02",
    teaser:
      "El sitio público que promete blindar el futuro digital y no se actualiza desde 2019.",
  },
  {
    slug: "02-ftp-descargas",
    name: "ftp-descargas",
    zoneId: "00-perimetro",
    difficulty: "facil",
    fragment: "F-03",
    teaser: "El servidor de descargas “temporal” de 2017 que nunca se apagó.",
  },
];

/** Máquinas de una zona, en orden de juego. */
export const machinesByZone = (zoneId: ZoneId): Machine[] =>
  MACHINES.filter((machine) => machine.zoneId === zoneId);

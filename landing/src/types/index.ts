/** Tipos del dominio HELIX. Reflejan el canon de `../../lore`. */

export type Difficulty = "facil" | "medio" | "dificil";

export type ZoneId =
  | "00-perimetro"
  | "01-corporativo"
  | "02-clientes"
  | "03-legado"
  | "04-proyecto-cero";

export interface Zone {
  id: ZoneId;
  /** Número de zona, ej. "00". */
  code: string;
  name: string;
  /** Red narrativa, ej. "10.0.0.0/24". */
  network: string;
  difficulties: Difficulty[];
  summary: string;
  /** La zona 04 no figura en los diagramas oficiales. */
  classified?: boolean;
}

export type Faction = "helix" | "la-mano-negra";

export interface Character {
  name: string;
  /** Handle para La Mano Negra, rol/cargo para HELIX. */
  role: string;
  faction: Faction;
  blurb: string;
}

export type CommKind = "email" | "ticket" | "chat" | "nota";

export interface Comm {
  date: string;
  kind: CommKind;
  title: string;
  /** Ruta al archivo en `lore/comunicados/`. */
  source?: string;
}

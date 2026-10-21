import { useState, type KeyboardEvent } from "react";
import { ArrowUpRight, Lock } from "lucide-react";
import { AnimatePresence, motion, type Variants } from "motion/react";

import { Reveal } from "@/components/effects/Reveal";
import { buttonVariants } from "@/components/ui/button";
import { ZONES } from "@/data";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";
import type { Difficulty, ZoneId } from "@/types";

/** Acento por zona: progresión cian → verde → ámbar → rojo → púrpura al bajar en la red. */
const ACCENTS: Record<ZoneId, { text: string; bar: string; border: string; soft: string; cssVar: string }> = {
  "00-perimetro": { text: "text-system", bar: "bg-system", border: "border-system/50", soft: "bg-system/10", cssVar: "var(--system)" },
  "01-corporativo": { text: "text-ok", bar: "bg-ok", border: "border-ok/50", soft: "bg-ok/10", cssVar: "var(--ok)" },
  "02-clientes": { text: "text-warn", bar: "bg-warn", border: "border-warn/50", soft: "bg-warn/10", cssVar: "var(--warn)" },
  "03-legado": { text: "text-primary", bar: "bg-primary", border: "border-primary/50", soft: "bg-primary/10", cssVar: "var(--primary)" },
  "04-proyecto-cero": { text: "text-cero", bar: "bg-cero", border: "border-cero/50", soft: "bg-cero/10", cssVar: "var(--cero)" },
};

const DIFF: Record<Difficulty, { label: string; chip: string; dot: string }> = {
  facil: { label: "Fácil", chip: "border-ok/30 bg-ok/10 text-ok", dot: "bg-ok" },
  medio: { label: "Medio", chip: "border-warn/30 bg-warn/10 text-warn", dot: "bg-warn" },
  dificil: { label: "Difícil", chip: "border-primary/30 bg-primary/10 text-primary", dot: "bg-primary" },
};

const list: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const node: Variants = {
  hidden: { opacity: 0, x: -12 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

/** Posición de cada zona en el diagrama de topología (viewBox 1000×380). */
const POS: Record<ZoneId, { cx: number; cy: number }> = {
  "00-perimetro": { cx: 250, cy: 190 },
  "01-corporativo": { cx: 450, cy: 190 },
  "02-clientes": { cx: 665, cy: 95 },
  "03-legado": { cx: 665, cy: 285 },
  "04-proyecto-cero": { cx: 875, cy: 285 },
};

const NODE_W = 150;
const NODE_H = 54;

interface SchematicProps {
  selectedId: ZoneId;
  onSelect: (id: ZoneId) => void;
}

function NetworkSchematic({ selectedId, onSelect }: SchematicProps) {
  const onKey = (event: KeyboardEvent<SVGGElement>, id: ZoneId) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onSelect(id);
    }
  };

  return (
    <svg
      viewBox="0 0 1000 380"
      className="h-auto w-full min-w-[720px]"
      role="group"
      aria-label="Topología de la red de HELIX"
    >
      <defs>
        <marker id="nm-arrow" markerWidth="8" markerHeight="8" refX="6.5" refY="3" orient="auto">
          <path d="M0,0 L6.5,3 L0,6 Z" fill="var(--border)" />
        </marker>
        <marker id="nm-arrow-cero" markerWidth="8" markerHeight="8" refX="6.5" refY="3" orient="auto">
          <path d="M0,0 L6.5,3 L0,6 Z" fill="var(--cero)" />
        </marker>
      </defs>

      {/* Conexiones */}
      <g fill="none" stroke="var(--border)" strokeWidth="1.5">
        <line x1="130" y1="190" x2="173" y2="190" markerEnd="url(#nm-arrow)" />
        <line x1="325" y1="190" x2="373" y2="190" markerEnd="url(#nm-arrow)" />
        <path d="M525,190 C 575,190 575,95 588,95" markerEnd="url(#nm-arrow)" />
        <path d="M525,190 C 575,190 575,285 588,285" markerEnd="url(#nm-arrow)" />
        <line
          x1="740"
          y1="285"
          x2="798"
          y2="285"
          stroke="var(--cero)"
          strokeOpacity="0.7"
          strokeDasharray="5 5"
          markerEnd="url(#nm-arrow-cero)"
        />
      </g>

      {/* Internet */}
      <rect x="20" y="166" width="110" height="48" rx="10" fill="var(--muted)" stroke="var(--border)" />
      <text x="75" y="195" textAnchor="middle" fontFamily="monospace" fontSize="13" fill="var(--muted-foreground)">
        INTERNET
      </text>

      {/* Zonas */}
      {ZONES.map((zone) => {
        const { cx, cy } = POS[zone.id];
        const a = ACCENTS[zone.id];
        const active = zone.id === selectedId;
        return (
          <g
            key={zone.id}
            role="button"
            tabIndex={0}
            aria-pressed={active}
            aria-label={`Zona ${zone.code} ${zone.name}`}
            className="cursor-pointer outline-none"
            onClick={() => onSelect(zone.id)}
            onKeyDown={(event) => onKey(event, zone.id)}
          >
            <rect
              x={cx - NODE_W / 2}
              y={cy - NODE_H / 2}
              width={NODE_W}
              height={NODE_H}
              rx="12"
              fill="var(--card)"
              stroke={active ? a.cssVar : "var(--border)"}
              strokeWidth={active ? 2 : 1.25}
              strokeDasharray={zone.classified && !active ? "5 4" : undefined}
              style={active ? { filter: `drop-shadow(0 0 9px ${a.cssVar})` } : undefined}
            />
            <text
              x={cx}
              y={cy - 2}
              textAnchor="middle"
              fontFamily="monospace"
              fontSize="15"
              fontWeight="700"
              fill={a.cssVar}
            >
              {zone.code}
            </text>
            <text x={cx} y={cy + 16} textAnchor="middle" fontSize="12.5" fill="var(--foreground)">
              {zone.name}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function NetworkMap() {
  const [selectedId, setSelectedId] = useState<ZoneId>(ZONES[0].id);
  const selected = ZONES.find((zone) => zone.id === selectedId) ?? ZONES[0];
  const accent = ACCENTS[selectedId];

  return (
    <section id="red" className="relative scroll-mt-20 border-t border-border/60">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <Reveal className="mb-12 flex max-w-2xl flex-col gap-4">
          <p className="font-mono text-sm text-system">// mapa de red</p>
          <h2 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            Cinco zonas. Una sola red.
          </h2>
          <p className="text-pretty text-muted-foreground sm:text-lg">
            Cuanto más profunda la zona, más difíciles las máquinas y más cerca de
            Proyecto Cero. Elegí una para ver qué esconde.
          </p>
        </Reveal>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_1.05fr] lg:gap-10">
          {/* Nodos */}
          <motion.ol
            className="flex flex-col"
            variants={list}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
          >
            {ZONES.map((zone, i) => {
              const a = ACCENTS[zone.id];
              const isActive = zone.id === selectedId;
              return (
                <motion.li key={zone.id} variants={node}>
                  <button
                    type="button"
                    onClick={() => setSelectedId(zone.id)}
                    aria-pressed={isActive}
                    className={cn(
                      "group relative flex w-full items-center gap-4 overflow-hidden rounded-xl border px-4 py-3.5 text-left transition-colors",
                      isActive ? cn(a.border, a.soft) : "border-border bg-card/40 hover:bg-card",
                    )}
                  >
                    <span
                      className={cn(
                        "absolute inset-y-0 left-0 w-1 transition-colors",
                        isActive ? a.bar : "bg-transparent",
                      )}
                    />
                    <span className={cn("font-mono text-xl font-bold tabular-nums", a.text)}>
                      {zone.code}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="truncate font-semibold">{zone.name}</span>
                        {zone.classified && <Lock className="h-3.5 w-3.5 shrink-0 text-cero" />}
                      </div>
                      <div className="font-mono text-xs text-muted-foreground">{zone.network}</div>
                    </div>
                    <div className="flex shrink-0 gap-1">
                      {zone.difficulties.map((d) => (
                        <span key={d} className={cn("h-1.5 w-1.5 rounded-full", DIFF[d].dot)} />
                      ))}
                    </div>
                  </button>

                  {i < ZONES.length - 1 && (
                    <div className="ml-6 flex h-7 items-center gap-2">
                      <span
                        className={cn(
                          "h-full w-px",
                          zone.id === "03-legado"
                            ? "border-l border-dashed border-cero/50"
                            : "bg-border",
                        )}
                      />
                      {zone.id === "03-legado" && (
                        <span className="font-mono text-[10px] text-cero/70">
                          tráfico sin documentar
                        </span>
                      )}
                    </div>
                  )}
                </motion.li>
              );
            })}
          </motion.ol>

          {/* Detalle */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.article
                key={selectedId}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className={cn("h-full rounded-2xl border bg-card/60 p-6 sm:p-8", accent.border)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <span className={cn("font-mono text-4xl font-bold tabular-nums", accent.text)}>
                      {selected.code}
                    </span>
                    <div>
                      <h3 className="flex items-center gap-2 text-xl font-semibold">
                        {selected.name}
                        {selected.classified && <Lock className="h-4 w-4 text-cero" />}
                      </h3>
                      <p className="font-mono text-xs text-muted-foreground">{selected.network}</p>
                    </div>
                  </div>
                  {selected.classified && (
                    <span className="shrink-0 rounded border border-cero/40 bg-cero/10 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-cero">
                      Clasificado
                    </span>
                  )}
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {selected.difficulties.map((d) => (
                    <span
                      key={d}
                      className={cn(
                        "rounded-md border px-2.5 py-1 font-mono text-xs tracking-wide",
                        DIFF[d].chip,
                      )}
                    >
                      {DIFF[d].label}
                    </span>
                  ))}
                </div>

                <p className="mt-5 text-pretty text-muted-foreground">{selected.summary}</p>

                {selected.classified && (
                  <p className="mt-3 font-mono text-sm text-cero/70">
                    Expediente: ███████ ███ ████ ██ ██████████.
                  </p>
                )}

                <div className="mt-6 flex items-center justify-between border-t border-border pt-5">
                  <span className="font-mono text-xs text-muted-foreground">
                    Máquinas: <span className="text-foreground">próximamente</span>
                  </span>
                  <a
                    href={`${SITE.repo}/tree/main/red/${selected.id}`}
                    target="_blank"
                    rel="noreferrer"
                    className={cn(buttonVariants({ variant: "outline", size: "sm" }), "gap-1.5")}
                  >
                    Ver zona
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>
        </div>

        {/* Esquema de topología */}
        <motion.div
          className="mt-12 rounded-2xl border border-border bg-card/30 p-4 sm:p-6"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="mb-4 flex items-center justify-between gap-4">
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Topología
            </p>
            <p className="hidden font-mono text-[11px] text-muted-foreground sm:block">
              clic en una zona para ver el detalle
            </p>
          </div>

          <div className="overflow-x-auto">
            <NetworkSchematic selectedId={selectedId} onSelect={setSelectedId} />
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[11px] text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-px w-5 bg-border" />
              flujo de red
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-5 border-t border-dashed border-cero/60" />
              tráfico sin documentar
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

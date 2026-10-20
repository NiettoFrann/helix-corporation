import { useState } from "react";
import { ArrowUpRight, Lock } from "lucide-react";
import { AnimatePresence, motion, type Variants } from "motion/react";

import { buttonVariants } from "@/components/ui/button";
import { ZONES } from "@/data";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";
import type { Difficulty, ZoneId } from "@/types";

/** Acento por zona: progresión cian → verde → ámbar → rojo → púrpura al bajar en la red. */
const ACCENTS: Record<ZoneId, { text: string; bar: string; border: string; soft: string }> = {
  "00-perimetro": { text: "text-system", bar: "bg-system", border: "border-system/50", soft: "bg-system/10" },
  "01-corporativo": { text: "text-ok", bar: "bg-ok", border: "border-ok/50", soft: "bg-ok/10" },
  "02-clientes": { text: "text-warn", bar: "bg-warn", border: "border-warn/50", soft: "bg-warn/10" },
  "03-legado": { text: "text-primary", bar: "bg-primary", border: "border-primary/50", soft: "bg-primary/10" },
  "04-proyecto-cero": { text: "text-cero", bar: "bg-cero", border: "border-cero/50", soft: "bg-cero/10" },
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

export function NetworkMap() {
  const [selectedId, setSelectedId] = useState<ZoneId>(ZONES[0].id);
  const selected = ZONES.find((zone) => zone.id === selectedId) ?? ZONES[0];
  const accent = ACCENTS[selectedId];

  return (
    <section id="red" className="relative scroll-mt-20 border-t border-border/60">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <header className="mb-12 flex max-w-2xl flex-col gap-4">
          <p className="font-mono text-sm text-system">// mapa de red</p>
          <h2 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            Cinco zonas. Una sola red.
          </h2>
          <p className="text-pretty text-muted-foreground sm:text-lg">
            Cuanto más profunda la zona, más difíciles las máquinas y más cerca de
            Proyecto Cero. Elegí una para ver qué esconde.
          </p>
        </header>

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
      </div>
    </section>
  );
}

import { ArrowRight, ExternalLink, FileText } from "lucide-react";

import { Logo } from "@/components/layout/Logo";
import { buttonVariants } from "@/components/ui/button";
import { useTypewriter } from "@/hooks/useTypewriter";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

type Tone = "prompt" | "muted" | "warn" | "ok";

const BOOT: { text: string; tone: Tone }[] = [
  { text: "$ ssh helix-corp@10.0.4.12", tone: "prompt" },
  { text: "Last login: Mon Sep 28 03:14:07 -0300 from unknown", tone: "muted" },
  { text: "[!] Credenciales válidas, pero no emitidas por HELIX Corp.", tone: "warn" },
  { text: "[!] Origen del acceso: LA MANO NEGRA", tone: "warn" },
  { text: "[ok] Cargando helix-corporation... listo.", tone: "ok" },
];

const BOOT_TEXT = BOOT.map((line) => line.text);

const TONE_CLASS: Record<Tone, string> = {
  prompt: "text-system",
  muted: "text-muted-foreground",
  warn: "text-primary",
  ok: "text-ok",
};

export function Hero() {
  const { lines, done } = useTypewriter(BOOT_TEXT);
  const lastRendered = lines.length - 1;

  return (
    <section className="relative isolate overflow-hidden">
      {/* Grilla de fondo */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.045) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
      {/* Resplandores */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -left-32 h-[480px] w-[480px] rounded-full bg-system/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-16 -right-24 h-[560px] w-[560px] rounded-full bg-primary/10 blur-3xl"
      />

      <div className="relative mx-auto flex max-w-6xl flex-col gap-14 px-4 py-10 sm:px-6 sm:py-16 lg:gap-16 lg:py-24">
        {/* Barra superior */}
        <div className="flex items-center justify-between">
          <Logo />
          <a
            href={SITE.repo}
            target="_blank"
            rel="noreferrer"
            className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "gap-1.5 text-muted-foreground")}
          >
            GitHub
            <ExternalLink />
          </a>
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          {/* Columna de texto */}
          <div className="flex flex-col items-start gap-6">
            <p className="font-mono text-sm text-system">
              <span className="text-muted-foreground">$</span> ./acceso --target HELIX_CORP
            </p>

            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center rounded-md bg-primary px-2.5 py-1 font-mono text-xs font-semibold tracking-wide text-primary-foreground">
                STATUS: COMPROMISED
              </span>
              <span className="inline-flex items-center rounded-md border border-system/40 px-2.5 py-1 font-mono text-xs tracking-wide text-system">
                CLEARANCE: UNAUTHORIZED
              </span>
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              Ninguna corporación
              <br />
              es <span className="text-primary">intocable</span>.
            </h1>

            <p className="max-w-xl text-pretty text-base text-muted-foreground sm:text-lg">
              HELIX Corp cayó. La Mano Negra empaquetó su red interna en contenedores
              para que repitas el acceso, máquina por máquina, sin arriesgar nada real.
              Cada flag que consigas abre un fragmento del expediente.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href="#red"
                className={cn(buttonVariants({ size: "lg" }), "h-11 gap-2 px-5 text-sm sm:text-base")}
              >
                Iniciar intrusión
                <ArrowRight />
              </a>
              <a
                href="#expediente"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "h-11 gap-2 px-5 text-sm sm:text-base",
                )}
              >
                <FileText />
                Leer el expediente
              </a>
            </div>
          </div>

          {/* Terminal */}
          <div className="w-full overflow-hidden rounded-xl border border-border bg-card shadow-2xl shadow-black/40">
            <div className="flex items-center gap-2 border-b border-border bg-muted/40 px-4 py-2.5">
              <span className="h-3 w-3 rounded-full bg-destructive" />
              <span className="h-3 w-3 rounded-full bg-warn" />
              <span className="h-3 w-3 rounded-full bg-ok" />
              <span className="ml-2 truncate font-mono text-xs text-muted-foreground">
                helix-corp@10.0.4.12: ~/la-mano-negra
              </span>
            </div>
            <div className="min-h-55 space-y-1.5 p-5 font-mono text-[0.8rem] leading-relaxed sm:text-sm">
              {BOOT.map((line, i) => {
                const text = lines[i];
                if (text === undefined) return null;
                return (
                  <div key={i} className={cn("break-words", TONE_CLASS[line.tone])}>
                    <span>{text}</span>
                    {i === lastRendered && (
                      <span
                        className={cn(
                          "ml-0.5 inline-block w-2 translate-y-0.5 bg-foreground",
                          done ? "h-4 animate-pulse" : "h-4",
                        )}
                      >
                        &nbsp;
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { useRef } from "react";
import { ArrowRight, ExternalLink, FileText } from "lucide-react";
import { motion, useScroll, useTransform, type Variants } from "motion/react";

import { LiveTerminal } from "@/components/effects/LiveTerminal";
import { Logo } from "@/components/layout/Logo";
import { buttonVariants } from "@/components/ui/button";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.12 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0px", "90px"]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  return (
    <section ref={ref} className="relative isolate overflow-hidden">
      {/* Capa de fondo con parallax */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={reduced ? undefined : { y: bgY }}
      >
        <div
          className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.045) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
        <div className="absolute -top-40 -left-32 h-[480px] w-[480px] rounded-full bg-system/10 blur-3xl" />
        <div className="absolute top-16 -right-24 h-[560px] w-[560px] rounded-full bg-primary/10 blur-3xl" />
      </motion.div>

      <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col gap-8 px-4 py-6 sm:px-6 sm:py-8">
        {/* Barra superior */}
        <motion.div
          className="flex items-center justify-between"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
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
        </motion.div>

        {/* Contenido centrado verticalmente */}
        <div className="flex flex-1 items-center py-8">
          <div className="grid w-full items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
            {/* Columna de texto */}
            <motion.div
              className="flex flex-col items-start gap-6"
              variants={container}
              initial="hidden"
              animate="show"
            >
              <motion.p variants={item} className="font-mono text-sm text-system">
                <span className="text-muted-foreground">$</span> ./acceso --target HELIX_CORP
              </motion.p>

              <motion.div variants={item} className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center rounded-md bg-primary px-2.5 py-1 font-mono text-xs font-semibold tracking-wide text-primary-foreground">
                  STATUS: COMPROMISED
                </span>
                <span className="inline-flex items-center rounded-md border border-system/40 px-2.5 py-1 font-mono text-xs tracking-wide text-system">
                  CLEARANCE: UNAUTHORIZED
                </span>
              </motion.div>

              <motion.h1
                variants={item}
                className="text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl"
              >
                Ninguna corporación
                <br />
                es <span className="text-primary">intocable</span>.
              </motion.h1>

              <motion.p
                variants={item}
                className="max-w-xl text-pretty text-base text-muted-foreground sm:text-lg"
              >
                HELIX Corp cayó. La Mano Negra empaquetó su red interna en contenedores
                para que repitas el acceso, máquina por máquina, sin arriesgar nada real.
                Cada flag que consigas abre un fragmento del expediente.
              </motion.p>

              <motion.div variants={item} className="flex flex-wrap items-center gap-3 pt-1">
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
              </motion.div>
            </motion.div>

            {/* Terminal viva */}
            <motion.div
              className="w-full overflow-hidden rounded-xl border border-border bg-card shadow-2xl shadow-black/40"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
            >
              <div className="flex items-center gap-2 border-b border-border bg-muted/40 px-4 py-2.5">
                <span className="h-3 w-3 rounded-full bg-destructive" />
                <span className="h-3 w-3 rounded-full bg-warn" />
                <span className="h-3 w-3 rounded-full bg-ok" />
                <span className="ml-2 truncate font-mono text-xs text-muted-foreground">
                  helix-corp@10.0.4.12: ~/la-mano-negra
                </span>
              </div>
              <LiveTerminal />
            </motion.div>
          </div>
        </div>

        {/* Indicador de scroll */}
        <motion.a
          href="#red"
          aria-label="Ir a la red"
          className="mx-auto flex flex-col items-center gap-1 pb-2 font-mono text-[10px] tracking-widest text-muted-foreground transition-colors hover:text-foreground"
          style={reduced ? undefined : { opacity: cueOpacity }}
        >
          EXPLORAR LA RED
          <motion.span
            aria-hidden
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            ↓
          </motion.span>
        </motion.a>
      </div>
    </section>
  );
}

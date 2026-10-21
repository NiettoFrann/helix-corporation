import { useEffect, useState } from "react";

type Tone = "prompt" | "input" | "muted" | "warn" | "ok" | "cero";

interface Line {
  text: string;
  tone: Tone;
  /** Prefijo (ej. el prompt) que se muestra en otro color antes del texto. */
  prefix?: string;
}

const PROMPT = "lamanonegra@helix:~$ ";

const BOOT: Line[] = [
  { text: "$ ssh helix-corp@10.0.4.12", tone: "prompt" },
  { text: "Last login: Mon Sep 28 03:14:07 -0300 from unknown", tone: "muted" },
  { text: "[!] Credenciales válidas, pero no emitidas por HELIX Corp.", tone: "warn" },
  { text: "[!] Origen del acceso: LA MANO NEGRA", tone: "warn" },
  { text: "[ok] Cargando helix-corporation... listo.", tone: "ok" },
];

/** Comandos ambientales que la terminal ejecuta en bucle para sentirse viva. */
const COMMANDS: { cmd: string; out: Line[] }[] = [
  { cmd: "whoami", out: [{ text: "nuevo-ingreso · sin rango asignado", tone: "muted" }] },
  { cmd: "ls red/", out: [{ text: "00-perimetro  01-corporativo  02-clientes  03-legado  04-???", tone: "muted" }] },
  { cmd: "cat lore/lema.txt", out: [{ text: "«Ninguna corporación es intocable»", tone: "ok" }] },
  { cmd: "nmap -sn 10.0.4.0/24", out: [{ text: "10.0.4.12 up — 1 host sin documentar", tone: "warn" }] },
  { cmd: "status proyecto-cero", out: [{ text: "[!] ACCESO DENEGADO", tone: "cero" }] },
];

const TONE_CLASS: Record<Tone, string> = {
  prompt: "text-system",
  input: "text-foreground",
  muted: "text-muted-foreground",
  warn: "text-primary",
  ok: "text-ok",
  cero: "text-cero",
};

const MAX_LINES = 8;
const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

function Caret() {
  return (
    <span className="ml-0.5 inline-block h-[1.05em] w-[0.5em] translate-y-[0.15em] animate-pulse bg-foreground" />
  );
}

function LineView({ line, caret }: { line: Line; caret: boolean }) {
  return (
    <div className="break-words">
      {line.prefix && <span className="text-system/80">{line.prefix}</span>}
      <span className={line.prefix ? "text-foreground" : TONE_CLASS[line.tone]}>{line.text}</span>
      {caret && <Caret />}
    </div>
  );
}

/**
 * Terminal del hero: tipea el boot y después ejecuta comandos ambientales en
 * bucle para sentirse viva. El tipeo es contenido narrativo, así que corre
 * siempre (no depende de `prefers-reduced-motion`).
 */
export function LiveTerminal() {
  const [lines, setLines] = useState<Line[]>([]);
  const [active, setActive] = useState<Line | null>(null);

  useEffect(() => {
    let cancelled = false;
    const push = (line: Line) => setLines((prev) => [...prev, line].slice(-MAX_LINES));

    const type = async (line: Line, speed: number) => {
      const full = line.text;
      for (let i = 1; i <= full.length; i += 1) {
        if (cancelled) return;
        setActive({ ...line, text: full.slice(0, i) });
        await sleep(speed);
      }
      if (cancelled) return;
      push(line);
      setActive(null);
    };

    const run = async () => {
      for (const line of BOOT) {
        if (cancelled) return;
        await type(line, 18);
        await sleep(110);
      }
      await sleep(600);

      let idx = 0;
      while (!cancelled) {
        const { cmd, out } = COMMANDS[idx % COMMANDS.length];
        await type({ prefix: PROMPT, text: cmd, tone: "input" }, 52);
        await sleep(360);
        for (const line of out) {
          if (cancelled) return;
          push(line);
        }
        await sleep(2000);
        idx += 1;
      }
    };

    void run();
    return () => {
      cancelled = true;
    };
  }, []);

  const lastIndex = lines.length - 1;

  return (
    <div className="flex h-56 flex-col justify-end gap-1.5 overflow-hidden p-5 font-mono text-[0.8rem] leading-relaxed sm:h-60 sm:text-sm">
      {lines.map((line, i) => (
        <LineView key={i} line={line} caret={!active && i === lastIndex} />
      ))}
      {active && <LineView line={active} caret />}
    </div>
  );
}

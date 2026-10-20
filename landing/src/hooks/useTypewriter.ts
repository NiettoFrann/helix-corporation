import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

interface TypewriterOptions {
  /** Milisegundos por carácter. */
  speed?: number;
  /** Pausa antes de empezar. */
  startDelay?: number;
  /** Pausa entre el final de una línea y el inicio de la siguiente. */
  lineDelay?: number;
}

interface TypewriterState {
  /** Líneas reveladas hasta el momento (la última puede estar a medias). */
  lines: string[];
  /** `true` cuando terminó de tipear todo. */
  done: boolean;
}

/**
 * Tipea un conjunto de líneas, carácter por carácter, en secuencia.
 * Si el usuario prefiere menos movimiento, muestra todo de una.
 *
 * `source` debe tener referencia estable (constante de módulo o `useMemo`),
 * ya que un array nuevo en cada render reinicia la animación.
 */
export function useTypewriter(
  source: string[],
  { speed = 28, startDelay = 350, lineDelay = 380 }: TypewriterOptions = {},
): TypewriterState {
  const reduced = usePrefersReducedMotion();
  const [state, setState] = useState<TypewriterState>({ lines: [], done: false });

  useEffect(() => {
    if (reduced) {
      setState({ lines: source, done: true });
      return;
    }

    setState({ lines: [], done: false });
    const acc: string[] = [];
    let line = 0;
    let char = 0;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      if (line >= source.length) {
        setState({ lines: [...acc], done: true });
        return;
      }
      const current = source[line];
      char += 1;
      acc[line] = current.slice(0, char);
      setState({ lines: [...acc], done: false });

      if (char >= current.length) {
        line += 1;
        char = 0;
        timer = setTimeout(tick, lineDelay);
      } else {
        timer = setTimeout(tick, speed);
      }
    };

    timer = setTimeout(tick, startDelay);
    return () => clearTimeout(timer);
  }, [source, speed, startDelay, lineDelay, reduced]);

  return state;
}

import { cn } from "@/lib/utils";

/**
 * Emblema de HELIX: dos hebras helicoidales que se entrelazan y leen como "H".
 * Una hebra toma el color del texto (`currentColor`) y la otra el rojo de marca
 * (`--primary`, La Mano Negra), así el logo cuenta la intrusión y se adapta al tema.
 */
export function HelixMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      role="img"
      aria-label="HELIX"
      className={cn("h-7 w-7", className)}
    >
      <g strokeLinecap="round" strokeLinejoin="round">
        {/* Hebra 1 — color del texto */}
        <path d="M15 8 C 21 16, 21 32, 15 40" stroke="currentColor" strokeWidth={2.4} />
        {/* Hebra 2 — rojo de marca (intrusión) */}
        <path d="M33 8 C 27 16, 27 32, 33 40" stroke="var(--primary)" strokeWidth={2.4} />
        {/* Peldaños de la hélice */}
        <line x1="16.5" y1="14" x2="31.5" y2="14" stroke="currentColor" strokeWidth={2} opacity={0.45} />
        <line x1="16.5" y1="34" x2="31.5" y2="34" stroke="currentColor" strokeWidth={2} opacity={0.45} />
        {/* Travesaño central — la barra de la H, en el punto de cruce */}
        <line x1="19.5" y1="24" x2="28.5" y2="24" stroke="currentColor" strokeWidth={3} />
      </g>
    </svg>
  );
}

interface LogoProps {
  className?: string;
  /** Oculta el wordmark y deja solo el emblema. */
  markOnly?: boolean;
}

/** Lockup completo: emblema + wordmark "HELIX". */
export function Logo({ className, markOnly = false }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2 text-foreground", className)}>
      <HelixMark />
      {!markOnly && (
        <span className="font-heading text-xl font-semibold tracking-[0.2em]">
          HELIX
        </span>
      )}
    </span>
  );
}

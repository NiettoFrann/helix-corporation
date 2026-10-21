import { motion, type HTMLMotionProps } from "motion/react";

interface RevealProps extends HTMLMotionProps<"div"> {
  /** Retraso de entrada en segundos. */
  delay?: number;
  /** Desplazamiento inicial en el eje Y. */
  y?: number;
}

/**
 * Envuelve contenido para que entre suave al aparecer en el viewport.
 * El desplazamiento se desactiva solo si el usuario pide menos movimiento
 * (vía `MotionConfig reducedMotion="user"` en la raíz).
 */
export function Reveal({ children, delay = 0, y = 18, transition, ...props }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: "easeOut", delay, ...transition }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

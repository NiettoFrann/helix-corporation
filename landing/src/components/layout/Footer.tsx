import type { ComponentType } from "react";
import { ExternalLink, Globe } from "lucide-react";
import { motion } from "motion/react";

import { Logo } from "@/components/layout/Logo";
import { GithubIcon, LinkedinIcon } from "@/components/layout/social-icons";
import { SITE, SOCIALS, type SocialIcon } from "@/lib/site";

const SOCIAL_ICONS: Record<SocialIcon, ComponentType<{ className?: string }>> = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  globe: Globe,
};

const EXPLORE = [
  { label: "La red", href: "#red", external: false },
  { label: "El expediente", href: "#expediente", external: false },
  { label: "Repositorio", href: SITE.repo, external: true },
];

const headingClass = "font-mono text-xs uppercase tracking-widest text-muted-foreground";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border bg-card/30">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <motion.div
          className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr]"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {/* Marca */}
          <div className="flex flex-col items-start gap-4">
            <Logo />
            <p className="font-mono text-sm text-primary">«Ninguna corporación es intocable»</p>
            <p className="max-w-sm text-sm text-muted-foreground">
              Laboratorios de ciberseguridad en Docker envueltos en una historia.
              Proyecto educativo: HELIX Corp y La Mano Negra son ficción.
            </p>
          </div>

          {/* Explorar */}
          <nav className="flex flex-col gap-4">
            <h3 className={headingClass}>Explorar</h3>
            <ul className="flex flex-col gap-2.5">
              {EXPLORE.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noreferrer" : undefined}
                    className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                    {link.external && <ExternalLink className="h-3.5 w-3.5 opacity-60" />}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Conectar */}
          <div className="flex flex-col gap-4">
            <h3 className={headingClass}>Conectar</h3>
            <ul className="flex flex-col gap-2.5">
              {SOCIALS.map((social) => {
                const Icon = SOCIAL_ICONS[social.icon];
                return (
                  <li key={social.href}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex items-center gap-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <Icon className="h-4 w-4 transition-colors group-hover:text-primary" />
                      <span>{social.label}</span>
                      <span className="text-xs text-muted-foreground/60">{social.handle}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </motion.div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 font-mono text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} · Mantenido por NiettoFran</p>
          <p className="text-muted-foreground/60">[CONNECTION TERMINATED]</p>
        </div>
      </div>
    </footer>
  );
}

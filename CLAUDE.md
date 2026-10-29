# CLAUDE.md

Guía para trabajar en este repo. Para el tono y las reglas del universo, ver
[`docs/guia-narrativa.md`](docs/guia-narrativa.md); para el paso a paso de una
máquina, [`docs/crear-una-maquina.md`](docs/crear-una-maquina.md).

> El canon completo y las notas de historia **no viven acá**: están en
> `_privado/` (gitignored). Si trabajás sobre la trama, leé primero
> `_privado/CLAUDE.md`.

## Qué es

Laboratorios de ciberseguridad en Docker (pentesting + escalada de privilegios),
envueltos en una narrativa propia: la red interna de **HELIX Corp**, una megacorp
ficticia, filtrada por **La Mano Negra**. Cada máquina es un host de esa red; más
profunda la zona, más cerca de **Proyecto Cero**. Uso educativo.

## Estructura

```
red/                # las máquinas, por zona (00-perimetro … 04-proyecto-cero)
  <zona>/<maquina>/ # README.md, maquina.yml, Dockerfile, docker-compose.yml, src/, fragmento.enc
lore/               # universo público (lo que La Mano Negra sabe en cada momento)
  helix/ la-mano-negra/ proyecto-cero/ comunicados/ assets/
  mapa-de-red.md  cronologia.md
docs/               # crear-una-maquina.md, guia-narrativa.md
plantillas/maquina/ # esqueleto que copia nueva-maquina.sh
herramientas/       # nueva-maquina.sh, cifrar-fragmento.sh, abrir-fragmento.sh
landing/            # sitio del proyecto (Vite 8 + React 19 + Tailwind v4 + shadcn)
_privado/           # SOLO AUTOR, gitignored: biblia, writeups, flags, fragmentos en claro
```

## Convenciones del mundo (resumen)

- Dominios: `helixcorp.com` (público), `helixcorp.local` (interno). Pista suelta: `umbral-sistemas.net`.
- Usuarios `nombre.apellido`; red narrativa `10.0.<zona>.0/24`; TZ `-0300`; presente de la historia: **septiembre de 2026**.
- Flags `HELIX{...}`. Español rioplatense, voseo.
- Nombres de máquina en `kebab-case`, **sin spoilear la vuln** (`portal-empleados`, no `sqli-login`).

## Flujo para una máquina

```bash
./herramientas/nueva-maquina.sh <zona> <nombre>   # esqueleto + flag aleatoria + IP narrativa
# ... construir en src/, Dockerfile, docker-compose.yml ...
./herramientas/cifrar-fragmento.sh red/<zona>/<maquina>   # cifra _privado/fragmento.md -> fragmento.enc
```

Al publicar una máquina, actualizar **todos** estos (checklist en `docs/crear-una-maquina.md`):
- Su fila en el `README.md` de la zona.
- La fila del fragmento en `lore/proyecto-cero/expediente.md`.
- El comunicado asociado en `lore/comunicados/` y su índice (si lo tiene).
- El contador de máquinas en `red/README.md`.
- `estado: jugable` en `maquina.yml`.

## Reglas del entorno Docker

- Levanta con `docker compose up -d`, sin pasos manuales; resetea con `down -v && up -d`.
- Sin dependencias de internet en runtime: todo se resuelve en el build.
- Puertos publicados solo en `127.0.0.1`, y solo los que hacen falta para resolverla.
- Nada de pistas de la solución en comentarios, nombres de imagen o labels.
- Probar la máquina de punta a punta siguiendo el `writeup.md` antes de marcarla jugable.

## Qué NO hacer

- No subir nada de `_privado/` (el `.gitignore` lo cubre; verificar `git status`).
- No nombrar en archivos públicos algo que solo se revela en un fragmento.
- No usar empresas, productos o personas reales en la trama.
- No cerrar hilos abiertos del canon sin decidirlo primero en la biblia.

## Estado actual

- 3 máquinas jugables en `red/00-perimetro/` (carpetas prefijadas por orden de juego): `00-portal-empleados` (F-01), `01-web-institucional` (F-02), `02-ftp-descargas` (F-03).
- Landing en `landing/` (hero con boot sequence, mapa de red interactivo, terminal ambiente).
- Backlog de máquinas y matriz de cobertura del temario: `_privado/ideas-de-maquinas.md`.

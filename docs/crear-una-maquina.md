# Crear una máquina

Cada máquina vive en `red/<zona>/<nombre>/`, y la zona define su dificultad y su lugar en la historia (ver [mapa de red](../lore/mapa-de-red.md)).

## 1. Elegir zona y nombre

| Zona | Dificultad | Qué tipo de sistema |
| :-- | :--: | :-- |
| `00-perimetro` | 🟢 | Expuesto a internet, mala praxis evidente. |
| `01-corporativo` | 🟢 🟡 | Herramientas internas; gente que deja cosas. |
| `02-clientes` | 🟡 | Productos y datos de clientes; VIGÍA. |
| `03-legado` | 🟡 🔴 | Heredado de adquisiciones; raro, con capas. |
| `04-proyecto-cero` | 🔴 | Defendido por gente que sabe. Sin defaults. |

**Nombre:** `kebab-case`, es el hostname de la máquina dentro de HELIX. Descriptivo, sin spoilear la vulnerabilidad (`portal-empleados`, no `sqli-login`).

## 2. Generar el esqueleto

```bash
./herramientas/nueva-maquina.sh 00-perimetro portal-empleados
```

Crea la carpeta desde [`plantillas/maquina/`](../plantillas/maquina/), con una flag aleatoria ya puesta en el `Dockerfile` y en `_privado/flag.txt`, y una IP narrativa en la zona:

```
red/00-perimetro/portal-empleados/
├── README.md            # público: briefing, objetivo, pistas
├── maquina.yml          # público: ficha
├── docker-compose.yml
├── Dockerfile
├── src/
└── _privado/            # NO se sube (está en .gitignore)
    ├── flag.txt         # la flag, en claro
    ├── fragmento.md     # el fragmento del expediente, en claro
    └── writeup.md       # la solución
```

> Si querés una flag con sentido (`HELIX{n0_l0_ap4gu3n}`), cambiala en `_privado/flag.txt` **y** en el `Dockerfile` (en base64: `printf '%s' 'HELIX{...}' | base64`).

## 3. Construir la máquina

Reglas del entorno Docker:

- Se levanta con `docker compose up -d`, sin pasos manuales.
- Se resetea limpia con `docker compose down -v && docker compose up -d`.
- Sin dependencias de internet en tiempo de ejecución: todo se resuelve en el build.
- Puertos publicados solo en `127.0.0.1` y solo los que hacen falta para resolverla.
- Nada de pistas de la solución en comentarios, nombres de imagen o labels.

## 4. Escribir la historia

Leé la [guía narrativa](guia-narrativa.md). En resumen, cada máquina cuenta su parte de la historia de tres formas:

1. **Briefing** (`README.md`, público): el gancho. Por qué La Mano Negra mira esta máquina.
2. **Narrativa ambiental** (dentro de la máquina): mails, `.bash_history`, notas, crons, logs. Lo que encuentra quien explora.
3. **Fragmento** (`_privado/fragmento.md` → `fragmento.enc`): la revelación, que solo se lee con la flag.

## 5. Cifrar el fragmento

```bash
./herramientas/cifrar-fragmento.sh red/00-perimetro/portal-empleados
```

Cifra `_privado/fragmento.md` con la flag y genera `fragmento.enc` (ese sí se sube). Verifica que descifre bien y avisa si la flag del `Dockerfile` no coincide. Volvé a correrlo cada vez que edites el fragmento.

## 6. Publicarla

- [ ] La fila de la máquina en el `README.md` de su zona.
- [ ] La fila del fragmento en [`lore/proyecto-cero/expediente.md`](../lore/proyecto-cero/expediente.md).
- [ ] Si la máquina tiene un comunicado asociado, el archivo en [`lore/comunicados/`](../lore/comunicados/) y su fila en el índice.
- [ ] El contador de máquinas en [`red/README.md`](../red/README.md).
- [ ] `estado: jugable` en `maquina.yml`.

## Checklist final

- [ ] Corre aislada y se resetea limpia.
- [ ] Probada de punta a punta siguiendo el `writeup.md`.
- [ ] `./herramientas/abrir-fragmento.sh` abre el fragmento con la flag real.
- [ ] La dificultad corresponde a la zona.
- [ ] Ni el README ni los nombres revelan algo que la historia todavía no contó.
- [ ] `git status` no muestra nada de `_privado/`.

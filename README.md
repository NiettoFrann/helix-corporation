<div align="center">

<img src="lore/assets/la-mano-negra-emblema.svg" alt="La Mano Negra" width="140" height="140" />

# HELIX CORPORATION

**Laboratorios de ciberseguridad en Docker — pentesting, escalada de privilegios y afines, envueltos en un universo narrativo propio.**

<img src="https://img.shields.io/badge/STATUS-COMPROMISED-C1121F?style=flat-square&labelColor=0B0B0F" alt="Status: Compromised" />
<img src="https://img.shields.io/badge/CLEARANCE-UNAUTHORIZED-C1121F?style=flat-square&labelColor=0B0B0F" alt="Clearance: Unauthorized" />
<img src="https://img.shields.io/badge/STACK-Docker-2496ED?style=flat-square&labelColor=0B0B0F&logo=docker&logoColor=white" alt="Stack: Docker" />
<img src="https://img.shields.io/badge/USO-Educativo-457B9D?style=flat-square&labelColor=0B0B0F" alt="Uso educativo" />

</div>

```
$ ssh helix-corp@10.0.4.12
Last login: Mon Sep 28 03:14:07 -0300 from unknown
Connecting to HELIX-CORP internal network...

[!] Credenciales válidas, pero no emitidas por HELIX Corp.
[!] Origen del acceso: LA MANO NEGRA
[!] Este repositorio es el resultado de esa intrusión.

Cargando helix-corporation... listo.
```

---

## Qué es esto

Un repositorio de **laboratorios de ciberseguridad**: explotación de vulnerabilidades, escalada de privilegios y categorías afines, cada uno empaquetado en **Docker** para levantarse y resetearse las veces que haga falta, sin dejar rastro real en ningún lado.

Para no hacerlo un catálogo más de máquinas sueltas, todo vive dentro de una misma historia: la red interna de **HELIX Corp**, una megacorp de seguridad ficticia, filtrada por la organización **La Mano Negra**. Cada máquina es un host de esa red, y cuanto más profunda la zona, más cerca está de **Proyecto Cero**, la división que no figura en ningún organigrama oficial. El universo completo está en [`lore/`](lore/).

> *"Ninguna corporación es intocable."*
> — lema de La Mano Negra

## La red

Las máquinas están organizadas por **zonas de la red de HELIX**. Ver el [mapa de red](lore/mapa-de-red.md).

| Zona | Dificultad | Qué encontrás |
| :-- | :--: | :-- |
| [`00 · Perímetro`](red/00-perimetro/) | 🟢 | Lo expuesto a internet. Configuraciones por defecto, software sin actualizar. |
| [`01 · Corporativo`](red/01-corporativo/) | 🟢 🟡 | La intranet de todos los días. Gente que deja cosas donde no debe. |
| [`02 · Clientes`](red/02-clientes/) | 🟡 | Los productos de HELIX y los datos de sus clientes. Ya empieza a oler raro. |
| [`03 · Legado`](red/03-legado/) | 🟡 🔴 | Lo que llegó con las adquisiciones y nadie migró. El servidor que no se apaga. |
| [`04 · Proyecto Cero`](red/04-proyecto-cero/) | 🔴 | La subred que no figura en los diagramas, defendida por gente que sabe. |

## Cómo jugar

```bash
cd red/<zona>/<maquina>
docker compose up -d                              # levantar
docker compose down -v && docker compose up -d    # resetear
```

Cada máquina tiene una flag `HELIX{...}`, y la flag es la llave de un **fragmento del expediente** que cuenta lo que La Mano Negra encontró ahí:

```bash
./herramientas/abrir-fragmento.sh red/<zona>/<maquina> 'HELIX{...}'
```

Para seguir la historia, jugá en orden de zona: `00` → `04`.

## Metadata del repo

```bash
$ cat repo.json
```
```json
{
  "nombre": "helix-corporation",
  "tipo": "Laboratorios de ciberseguridad",
  "stack": ["Docker", "Docker Compose"],
  "zonas": ["Perimetro", "Corporativo", "Clientes", "Legado", "Proyecto Cero"],
  "universo": "HELIX Corp",
  "organizacion": "La Mano Negra",
  "lema": "Ninguna corporación es intocable",
  "conspiracion": "Proyecto Cero",
  "estado": "En expansion",
  "usoEducativo": true
}
```

## El universo narrativo

| Documento | Contenido |
| :-- | :-- |
| [`lore/README.md`](lore/README.md) | Puerta de entrada al expediente HELIX. |
| [`lore/mapa-de-red.md`](lore/mapa-de-red.md) | Las cinco zonas de la red, y la que no está en los diagramas. |
| [`lore/cronologia.md`](lore/cronologia.md) | Lo que se sabe, en orden. Con huecos. |
| [`lore/helix/`](lore/helix/) | La empresa, su organigrama y su gente. |
| [`lore/la-mano-negra/`](lore/la-mano-negra/) | La organización, sus miembros y sus rangos. |
| [`lore/proyecto-cero/`](lore/proyecto-cero/) | Lo que se sabe, lo que se rumorea y el expediente desbloqueable. |
| [`lore/comunicados/`](lore/comunicados/) | Emails, tickets y chats filtrados. |

## Estructura del repositorio

```
helix-corporation/
├── README.md
├── red/                          # las máquinas, por zona de la red
│   ├── 00-perimetro/
│   ├── 01-corporativo/
│   ├── 02-clientes/
│   ├── 03-legado/
│   └── 04-proyecto-cero/
│       └── <maquina>/            # README, maquina.yml, Docker, fragmento.enc
├── lore/                         # el universo
│   ├── README.md
│   ├── mapa-de-red.md
│   ├── cronologia.md
│   ├── helix/                    # empresa, organigrama, personajes
│   ├── la-mano-negra/            # organización, miembros, rangos
│   ├── proyecto-cero/            # lo público + índice del expediente
│   ├── comunicados/              # un archivo por comunicado filtrado
│   └── assets/                   # logos de La Mano Negra
├── docs/
│   ├── crear-una-maquina.md      # paso a paso para sumar una máquina
│   └── guia-narrativa.md         # tono, voces y reglas del universo
├── plantillas/maquina/           # esqueleto que copia nueva-maquina.sh
└── herramientas/
    ├── nueva-maquina.sh          # crea una máquina desde la plantilla
    ├── cifrar-fragmento.sh       # cifra el fragmento con la flag
    └── abrir-fragmento.sh        # lo descifra (para quien juega)
```

## Uso responsable

Todo lo que hay acá es **ficción con fines educativos**. Los labs corren en contenedores locales y aislados — no apuntes estas técnicas a sistemas que no sean tuyos o que no tengas autorización explícita para testear.

## Sumar una máquina

```bash
./herramientas/nueva-maquina.sh <zona> <nombre>
```

El paso a paso está en [`docs/crear-una-maquina.md`](docs/crear-una-maquina.md), y el tono y las reglas del universo en [`docs/guia-narrativa.md`](docs/guia-narrativa.md).

---

<div align="center">

```
[CONNECTION TERMINATED]
```

<img src="lore/assets/la-mano-negra-horizontal.svg" alt="La Mano Negra — Ninguna corporación es intocable" width="480" />

Mantenido por [NiettoFrann](https://github.com/NiettoFrann)

</div>

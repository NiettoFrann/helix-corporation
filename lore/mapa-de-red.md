# Mapa de red de HELIX Corp

*Reconstruido por 0x0 a partir del recon inicial, los diagramas viejos de la wiki de IT y lo que no coincidía entre ambos.*

```mermaid
flowchart LR
    INET(("Internet"))
    INET --> Z0

    subgraph Z0["00 · Perímetro — 10.0.0.0/24"]
        direction TB
        z0a["Web institucional, VPN,<br/>portales expuestos"]
    end

    subgraph Z1["01 · Corporativo — 10.0.1.0/24"]
        direction TB
        z1a["Intranet, wiki de IT,<br/>tickets, ERP, correo"]
    end

    subgraph Z2["02 · Clientes — 10.0.2.0/24"]
        direction TB
        z2a["Portal de clientes,<br/>consola de VIGÍA"]
    end

    subgraph Z3["03 · Legado — 10.0.3.0/24"]
        direction TB
        z3a["Sistemas heredados<br/>de adquisiciones"]
    end

    subgraph Z4["04 · ??? — 10.0.4.0/24"]
        direction TB
        z4a["No figura en<br/>ningún diagrama"]
    end

    Z0 --> Z1
    Z1 --> Z2
    Z1 --> Z3
    Z3 -. "tráfico sin documentar" .-> Z4

    style Z4 stroke-dasharray: 5 5,fill:#1A1A2E,stroke:#D61C4E,color:#fff
    style z4a fill:#1A1A2E,stroke:#D61C4E,color:#fff
```

## Las zonas

| Zona | Carpeta | Dificultad | Qué hay |
| :-- | :-- | :--: | :-- |
| **00 · Perímetro** | [`red/00-perimetro/`](../red/00-perimetro/) | 🟢 | Lo que HELIX expone a internet. Configuraciones por defecto, software sin actualizar desde el día del lanzamiento. |
| **01 · Corporativo** | [`red/01-corporativo/`](../red/01-corporativo/) | 🟢 🟡 | La intranet de todos los días: RRHH, la wiki de IT, la mesa de ayuda, Finanzas. Donde trabaja la gente, y donde la gente deja cosas. |
| **02 · Clientes** | [`red/02-clientes/`](../red/02-clientes/) | 🟡 | Lo que HELIX le vende al mundo: el portal de clientes y la consola de VIGÍA. Datos reales de terceros de por medio. |
| **03 · Legado** | [`red/03-legado/`](../red/03-legado/) | 🟡 🔴 | Sistemas que llegaron con adquisiciones y nadie migró. Raros, viejos, con capas. Acá vive `reportes-legacy-02`. |
| **04 · ???** | [`red/04-proyecto-cero/`](../red/04-proyecto-cero/) | 🔴 | La subred que no está en los diagramas oficiales. Hacia acá va el tráfico que nadie sabe explicar. |

## Convenciones del mundo

Para quien explora (y para quien crea máquinas), la red de HELIX sigue siempre estas reglas:

- **Dominio:** `helixcorp.com` hacia afuera, `helixcorp.local` hacia adentro.
- **Usuarios:** `nombre.apellido` (ej. `diego.ferreyra`).
- **Direccionamiento narrativo:** `10.0.<zona>.0/24`. Es la IP "en la historia". Los contenedores corren en tu máquina con la red que defina cada `docker-compose.yml`.
- **Hora:** todo está en `-0300`.

---

> *"Los diagramas de la wiki tienen cuatro zonas. El tráfico tiene cinco. Alguien dibujó mal, o alguien no quiso dibujar."*
> — 0x0

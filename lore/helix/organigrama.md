# Organigrama de HELIX Corp

*Reconstruido a partir de un export de la herramienta de RRHH que alguien dejó con permisos de lectura pública "temporalmente" en 2019 y nunca se acordó de cerrar.*

```mermaid
flowchart TD
    CEO["Marcus Voss<br/>CEO"]
    CEO --> CISO["Elena Cross<br/>CISO"]
    CEO --> CFO["Roberto Aguilar<br/>CFO"]
    CEO --> LEGAL["Dirección Legal<br/>&amp; Adquisiciones"]

    CISO --> SYSADMIN["Diego Ferreyra<br/>Sysadmin"]
    CISO --> SOC["Equipo SOC<br/>(turno rotativo, tercerizado)"]

    CFO --> RRHH["Silvia Domínguez<br/>RRHH"]
    CFO --> FIN["Finanzas<br/>(no saben explicar una línea del presupuesto)"]

    LEGAL -. "línea de presupuesto sin justificar" .-> PC["❓ Proyecto Cero<br/>(no figura en el organigrama oficial)"]

    style PC stroke-dasharray: 5 5,fill:#1A1A2E,stroke:#D61C4E,color:#fff
    style CISO fill:#1A1A2E,stroke:#740EE0,color:#fff
    style CEO fill:#1A1A2E,stroke:#740EE0,color:#fff
```

## Lectura del organigrama

- **Marcus Voss (CEO):** firma comunicados de prensa sobre "cultura de seguridad primero" y después aprueba recortes de presupuesto en el área de seguridad. Nunca lee los reportes que le mandan, pero los reenvía con "Excelente trabajo equipo 👏".
- **Elena Cross (CISO):** tiene el título, no tiene el presupuesto. Da webinars de LinkedIn sobre "Zero Trust" mientras la VPN de la empresa sigue usando una versión con CVEs de hace tres años.
- **Roberto Aguilar (CFO):** aprueba todos los presupuestos, incluido el que nadie más sabe explicar.
- **Diego Ferreyra (Sysadmin):** el único ser humano en HELIX que sabe dónde está cada servidor, cada credencial y cada cron job olvidado. Un solo punto de fallo con nombre y apellido.
- **Silvia Domínguez (RRHH):** manda más comunicados sobre el dress code que sobre políticas de contraseñas.
- **Dirección Legal & Adquisiciones:** el área que gestionó la compra que trajo, sin que nadie lo pidiera oficialmente, a **Proyecto Cero**. La línea punteada del diagrama no es un error: la relación es así de poco clara.

Más sobre cada uno en [`personajes.md`](personajes.md), y sobre lo que esconde esa línea punteada en [`../proyecto-cero/`](../proyecto-cero/).

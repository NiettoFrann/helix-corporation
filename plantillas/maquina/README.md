# __MAQUINA__

**Zona:** __ZONA__ · **Dificultad:** 🟢 Fácil | 🟡 Medio | 🔴 Difícil
**Categorías:** (ej. web, inyección SQL, escalada de privilegios)
**Hostname:** `__MAQUINA__.helixcorp.local` · **IP narrativa:** `__IP__`

## Briefing

[2-4 líneas en voz de La Mano Negra (Root, Ceniza o 0x0). Qué sistema es, para qué lo usa HELIX, qué se rumorea de él. Sin nombrar la vulnerabilidad.]

> *"[Cita de algún personaje.]"*
> — [Handle]

## Objetivo

Conseguir acceso root y leer `/root/flag.txt`.

## Levantar

```bash
docker compose up -d
```

Servicio disponible en: http://localhost:8080

Resetear: `docker compose down -v && docker compose up -d`

## Fragmento del expediente

Con la flag, desde la raíz del repo:

```bash
./herramientas/abrir-fragmento.sh red/__ZONA__/__MAQUINA__ 'HELIX{...}'
```

## Pistas

<details>
<summary>Pista 1</summary>

[La más suave.]

</details>

<details>
<summary>Pista 2</summary>

[Un poco más directa.]

</details>

<details>
<summary>Pista 3</summary>

[Casi la solución.]

</details>

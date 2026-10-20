# Guía narrativa

Cómo escribir dentro del universo HELIX para que todas las máquinas suenen a la misma historia.

## Tono

- **Ficción de oficina, no de película.** HELIX no es malvada: es negligente, burocrática y está cansada. El humor sale de lo verosímil (el mail de RRHH con la password del WiFi), no de la parodia.
- **Español rioplatense**, con voseo. Términos técnicos en inglés cuando así se usan en la vida real (*cron job*, *exploit*, *dump*).
- **Mostrar, no explicar.** Un ticket abierto hace 412 días cuenta más que un párrafo sobre "la desidia de HELIX".
- **El misterio se administra.** Cada máquina responde una pregunta y abre otra. Nunca dos revelaciones grandes en la misma máquina.

## La regla de la profundidad

La calidad técnica de lo que encuentra quien juega sube a medida que se acerca a Proyecto Cero:

| Zona | Quién "configuró" el sistema | Cómo se siente |
| :-- | :-- | :-- |
| 00–01 | Devs apurados, áreas no técnicas | Descuido. Defaults, credenciales reutilizadas, todo a la vista. |
| 02 | Equipos de producto con presión comercial | Atajos. Funciona, pero nadie lo auditó. |
| 03 | Empresas absorbidas que ya no existen | Extrañeza. Tecnologías viejas, servicios custom, capas. |
| 04 | Gente que sabe lo que hace | Hostilidad. Sin defaults, con monitoreo, con trampas. |

Si una máquina de la zona 01 se siente demasiado prolija, que haya un motivo en la historia: probablemente la configuró Diego.

## Voces

| Personaje | Cómo escribe |
| :-- | :-- |
| **Root** | Minúsculas, frases cortas, sin emojis. Nunca explica de más. Cierra conversaciones. |
| **Ceniza** | Seca, un poco irónica. Habla de técnica con precisión. Se vuelve fría cuando aparece HELIX. |
| **0x0** | Técnico, entusiasta, deja notas al pie ("*Nota de 0x0:*"). Hace las preguntas que el resto evita. |
| **Marcus Voss** | Corporativo vacío. "Excelente trabajo equipo 👏". |
| **Elena Cross** | Profesional, cuidadosa, cada vez más frustrada. Escribe tarde a la noche. |
| **Diego Ferreyra** | Directo, cansado, mayúsculas cuando algo es importante. Comentarios en configs. |
| **Silvia Domínguez** | Cordial, signos de exclamación, PD que filtran cosas. |

## Narrativa ambiental

Es lo que hace que una máquina se sienta un lugar y no un ejercicio. Ideas para dejar dentro del sistema:

- `/home/<usuario>/` con archivos que digan quién es: notas, borradores, `.bash_history` creíble.
- Mails en un mbox o en una carpeta `Maildir/`.
- Crons con comentarios de quien los escribió (y cuándo).
- Logs con nombres de otros hosts de la red: conectan las máquinas entre sí.
- Un `ceniza.txt` vacío en alguna máquina que "Ceniza ya visitó".

Regla: **la narrativa ambiental nunca es obligatoria para resolver la máquina**, pero puede servir de pista.

## Fragmentos

Formato en [`plantillas/maquina/_privado/fragmento.md`](../plantillas/maquina/_privado/fragmento.md):

1. Encabezado `EXPEDIENTE HELIX · FRAGMENTO F-XX`, con origen y quién lo recuperó (los scripts necesitan ese encabezado).
2. La evidencia: un documento, mail, log o chat, presentado tal cual se encontró.
3. La reacción de La Mano Negra en el canal, que termina apuntando hacia la siguiente máquina o zona.

Largo ideal: lo que se lee en dos minutos.

## Convenciones del mundo

- Dominios: `helixcorp.com` (público), `helixcorp.local` (interno).
- Usuarios: `nombre.apellido`.
- Red narrativa: `10.0.<zona>.0/24`.
- Zona horaria: `-0300`. Presente de la historia: septiembre de 2026.
- Flags: `HELIX{...}`.
- Comunicados: un archivo por comunicado en `lore/comunicados/`, nombrado `AAAA-MM-<slug>.md`.

## Qué no hacer

- Nombrar en archivos públicos algo que solo se revela en un fragmento.
- Usar empresas, productos o personas reales como parte de la trama.
- Cerrar los hilos abiertos de la historia sin decidirlo antes en el canon.

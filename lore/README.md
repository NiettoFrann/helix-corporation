# El expediente HELIX

*Documento reconstruido a partir de comunicados internos, tickets de soporte, actas de directorio y capturas de tráfico. Curado por La Mano Negra. Cualquier parecido con la realidad es, lamentablemente, todo el punto.*

---

## Índice

| Carpeta / documento | Contenido |
| :-- | :-- |
| [`mapa-de-red.md`](mapa-de-red.md) | Las cinco zonas de la red de HELIX y qué hay en cada una. **Empezá por acá.** |
| [`cronologia.md`](cronologia.md) | Lo que se sabe, en orden. |
| [`helix/`](helix/) | La empresa: historia, productos, [organigrama](helix/organigrama.md) y [personajes](helix/personajes.md). |
| [`la-mano-negra/`](la-mano-negra/) | La organización, sus [miembros](la-mano-negra/miembros.md) y cómo se gana un apodo. |
| [`proyecto-cero/`](proyecto-cero/) | Lo que se sabe y lo que se rumorea, más el [expediente](proyecto-cero/expediente.md) que se desbloquea resolviendo máquinas. |
| [`comunicados/`](comunicados/) | Emails, tickets y chats filtrados. |

---

## 1. HELIX Corporation

Fundada hace más de veinte años, HELIX Corp se presenta al mundo como líder en "soluciones integrales de seguridad y transformación digital". Su misión oficial: *"Blindar el futuro digital de nuestros clientes."* Su realidad interna: contraseñas reutilizadas, migraciones a medio terminar, y un departamento de RRHH que manda más recordatorios de "vestimenta casual los viernes" que parches de seguridad.

HELIX creció comprando empresas más chicas, integrándolas mal y dejando sus sistemas legacy en producción "hasta nuevo aviso", un aviso que nunca llega. Su producto estrella es **VIGÍA**, un agente de monitoreo que instala en las redes de más de mil clientes para "protegerlos". Más en [`helix/`](helix/).

## 2. Proyecto Cero

Entre las adquisiciones de HELIX hubo una, nunca aclarada en ningún comunicado, que trajo algo más que servidores viejos: un conjunto de sistemas que no aparecen en el organigrama, financiados con una línea de presupuesto que nadie en Finanzas sabe justificar.

Puertas adentro le dicen **Proyecto Cero**. A diferencia del resto de HELIX, esos sistemas están bien defendidos, porque alguien ahí dentro sabe lo que está protegiendo. Lo que se sabe está en [`proyecto-cero/`](proyecto-cero/). El resto hay que ganárselo.

## 3. La Mano Negra

<p align="center">
  <img src="assets/la-mano-negra-sello.svg" alt="La Mano Negra — Ninguna corporación es intocable" width="220" />
</p>

> *"Ninguna corporación es intocable."*
> — lema de La Mano Negra

El nombre viene de una sociedad secreta real del siglo XIX, y nos pareció justicia poética. Hoy es una organización descentralizada de gente que entra donde no la invitan, no por plata, sino porque alguien tiene que auditar lo que las corporaciones prometen y no cumplen.

Este repositorio es, en la ficción, obra de La Mano Negra: la red de HELIX, máquina por máquina, empaquetada en contenedores para que cualquiera pueda repetir el acceso sin arriesgar nada real. Ese "cualquiera" sos vos. Bienvenido/a. Más en [`la-mano-negra/`](la-mano-negra/).

## 4. Cómo se juega la historia

La red de HELIX está dividida en [cinco zonas](mapa-de-red.md). Cuanto más profunda la zona, más difíciles las máquinas y más cerca de Proyecto Cero.

Cada máquina tiene una flag `HELIX{...}`. **La flag es la llave de un fragmento del expediente**, un archivo cifrado que viene con la máquina y que solo se puede leer después de resolverla. Así la historia se cuenta sola, en el orden en que la vas descubriendo:

```bash
./herramientas/abrir-fragmento.sh red/<zona>/<maquina> 'HELIX{...}'
```

No hace falta seguir un orden para practicar, pero si te importa la historia, el camino es zona por zona: `00` → `04`.

---

*"No sabemos todavía qué es Proyecto Cero. Sabemos que cada vez que alguien se acerca demasiado, HELIX gasta una fortuna en borrar logs. Eso ya nos dice bastante."*
— nota interna de La Mano Negra, sin firmar

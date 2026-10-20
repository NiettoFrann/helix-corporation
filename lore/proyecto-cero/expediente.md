# Expediente: fragmentos

Cada máquina de la red de HELIX trae un **fragmento del expediente**: un archivo `fragmento.enc` cifrado cuya llave es la flag de esa máquina. Resolvés la máquina, abrís el fragmento, y la historia avanza.

```bash
# desde la raíz del repo
./herramientas/abrir-fragmento.sh red/<zona>/<maquina> 'HELIX{...}'
```

O sin el script, con `openssl` a mano:

```bash
openssl enc -d -aes-256-cbc -pbkdf2 -iter 200000 -a \
  -in red/<zona>/<maquina>/fragmento.enc -pass 'pass:HELIX{...}'
```

> **Sobre el honor:** el repo es público, así que alguien decidido puede sacar la flag leyendo el código de la máquina. El cifrado no está para frenar a nadie, sino para que la historia no se te spoilee de casualidad. Leela en el orden en que la ganás.

## Fragmentos

| ID | Zona | Máquina | Estado |
| :-: | :-- | :-- | :-- |
| — | — | *Todavía no hay fragmentos publicados.* | — |

<!--
Formato de cada fila cuando se suma una máquina:
| F-01 | 00 · Perímetro | [`portal-empleados`](../../red/00-perimetro/portal-empleados/) | 🔒 Cifrado |
-->

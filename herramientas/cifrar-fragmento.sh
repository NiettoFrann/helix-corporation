#!/usr/bin/env bash
# Cifra _privado/fragmento.md de una máquina con su flag (_privado/flag.txt)
# y deja el resultado en <maquina>/fragmento.enc, que es lo que se sube al repo.
#
# Uso: ./herramientas/cifrar-fragmento.sh red/<zona>/<maquina>
set -euo pipefail

dir="${1:-}"
dir="${dir%/}"

if [[ -z $dir ]]; then
  echo "Uso: $0 red/<zona>/<maquina>" >&2
  exit 1
fi

plano="$dir/_privado/fragmento.md"
archivo_flag="$dir/_privado/flag.txt"
cifrado="$dir/fragmento.enc"

for f in "$plano" "$archivo_flag"; do
  [[ -f $f ]] || { echo "Falta $f" >&2; exit 1; }
done

flag=$(tr -d '\r\n' < "$archivo_flag")
if [[ ! $flag =~ ^HELIX\{.+\}$ ]]; then
  echo "La flag de $archivo_flag no tiene formato HELIX{...}" >&2
  exit 1
fi

if ! grep -qF "EXPEDIENTE HELIX" "$plano"; then
  echo "El fragmento tiene que incluir el encabezado 'EXPEDIENTE HELIX' (ver la plantilla)." >&2
  echo "abrir-fragmento.sh lo usa para saber si la flag es correcta." >&2
  exit 1
fi

if ! grep -qF "$(printf '%s' "$flag" | base64)" "$dir/Dockerfile" 2>/dev/null; then
  echo "Aviso: la flag de _privado/flag.txt no aparece (en base64) en el Dockerfile." >&2
  echo "       Si la cambiaste, actualizala en los dos lados." >&2
fi

export FRAGMENTO_PASS="$flag"
openssl enc -aes-256-cbc -pbkdf2 -iter 200000 -salt -a \
  -in "$plano" -out "$cifrado" -pass env:FRAGMENTO_PASS

# Verificación: tiene que descifrar exactamente al original.
if openssl enc -d -aes-256-cbc -pbkdf2 -iter 200000 -a \
     -in "$cifrado" -pass env:FRAGMENTO_PASS | cmp -s - "$plano"; then
  echo "Fragmento cifrado: $cifrado"
else
  echo "Error: el fragmento cifrado no descifra igual al original." >&2
  exit 1
fi

#!/usr/bin/env bash
# Abre el fragmento del expediente de una máquina usando su flag.
#
# Uso: ./herramientas/abrir-fragmento.sh red/<zona>/<maquina> 'HELIX{...}'
set -euo pipefail

dir="${1:-}"
dir="${dir%/}"
flag="${2:-}"

if [[ -z $dir || -z $flag ]]; then
  echo "Uso: $0 red/<zona>/<maquina> 'HELIX{...}'" >&2
  exit 1
fi

cifrado="$dir/fragmento.enc"
[[ -f $cifrado ]] || { echo "Esta máquina no tiene fragmento ($cifrado)." >&2; exit 1; }

export FRAGMENTO_PASS="$flag"
if ! texto=$(openssl enc -d -aes-256-cbc -pbkdf2 -iter 200000 -a \
               -in "$cifrado" -pass env:FRAGMENTO_PASS 2>/dev/null | tr -d '\0') \
   || [[ $texto != *"EXPEDIENTE HELIX"* ]]; then
  echo "[!] Flag incorrecta. El expediente sigue cerrado." >&2
  exit 1
fi

printf '%s\n' "$texto"

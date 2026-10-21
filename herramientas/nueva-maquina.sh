#!/usr/bin/env bash
# Crea una máquina nueva en red/<zona>/<nombre> a partir de plantillas/maquina/,
# con una flag aleatoria ya cargada en el Dockerfile y en _privado/flag.txt.
#
# Uso: ./herramientas/nueva-maquina.sh <zona> <nombre>
#  ej: ./herramientas/nueva-maquina.sh 00-perimetro portal-empleados
set -euo pipefail

raiz="$(cd "$(dirname "$0")/.." && pwd)"
zona="${1:-}"
nombre="${2:-}"

zonas() { (cd "$raiz/red" && ls -d */ | tr -d /); }

if [[ -z $zona || -z $nombre ]]; then
  echo "Uso: $0 <zona> <nombre>" >&2
  echo "Zonas disponibles:" >&2
  zonas | sed 's/^/  /' >&2
  exit 1
fi

if [[ ! -d $raiz/red/$zona ]]; then
  echo "No existe la zona red/$zona. Zonas disponibles:" >&2
  zonas | sed 's/^/  /' >&2
  exit 1
fi

if [[ ! $nombre =~ ^[a-z0-9]+(-[a-z0-9]+)*$ ]]; then
  echo "El nombre tiene que ser kebab-case (ej. portal-empleados)." >&2
  exit 1
fi

destino="$raiz/red/$zona/$nombre"
if [[ -e $destino ]]; then
  echo "Ya existe red/$zona/$nombre." >&2
  exit 1
fi

# IP narrativa: 10.0.<zona>.<10 + máquinas que ya hay en la zona>
num_zona=$((10#${zona%%-*}))
existentes=$(find "$raiz/red/$zona" -mindepth 1 -maxdepth 1 -type d | wc -l)
ip="10.0.$num_zona.$((10 + existentes))"

flag="HELIX{$(openssl rand -hex 12)}"
flag_b64=$(printf '%s' "$flag" | base64)

cp -r "$raiz/plantillas/maquina" "$destino"

grep -rl '__[A-Z0-9_]*__' "$destino" | while read -r archivo; do
  sed -i.bak \
    -e "s|__MAQUINA__|$nombre|g" \
    -e "s|__ZONA__|$zona|g" \
    -e "s|__IP__|$ip|g" \
    -e "s|__FLAG_B64__|$flag_b64|g" \
    -e "s|__FLAG__|$flag|g" \
    "$archivo"
  rm "$archivo.bak"
done

cat <<EOF
Máquina creada en red/$zona/$nombre
  IP narrativa: $ip
  Flag:         $flag  (en _privado/flag.txt y en el Dockerfile)

Siguientes pasos:
  1. Construí la máquina (Dockerfile, src/, docker-compose.yml).
  2. Escribí la historia en _privado/fragmento.md y la solución en _privado/writeup.md.
  3. Cifrá el fragmento: ./herramientas/cifrar-fragmento.sh red/$zona/$nombre
  4. Sumala a red/$zona/README.md y a lore/proyecto-cero/expediente.md.

Guía completa: docs/crear-una-maquina.md
EOF

#!/usr/bin/env bash
# Arranca el sitio institucional. Solo Apache + PHP: no hay base de datos
# (HelixCMS 1.4 guarda el contenido en archivos) ni SSH.
set -euo pipefail

# envvars de Apache referencia variables sin definir: desactivamos -u al cargarlo.
set +u
. /etc/apache2/envvars
set -u

exec apache2 -D FOREGROUND

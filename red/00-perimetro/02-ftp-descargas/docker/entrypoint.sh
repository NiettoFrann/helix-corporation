#!/usr/bin/env bash
# Arranca el servidor de descargas: FTP anónimo + sitio web (con WebDAV).
set -euo pipefail

# FTP en segundo plano.
vsftpd /etc/vsftpd.conf &

# envvars de Apache referencia variables sin definir: desactivamos -u al cargarlo.
set +u
. /etc/apache2/envvars
set -u

exec apache2 -D FOREGROUND

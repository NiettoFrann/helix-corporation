#!/usr/bin/env bash
# Arranca los servicios de la máquina: base de datos, SSH y el portal web.
set -euo pipefail

# Base de datos (local, no publicada).
install -d -o mysql -g mysql /run/mysqld
mariadbd --user=mysql >/var/log/mariadb-boot.log 2>&1 &
for _ in $(seq 1 30); do
  if mariadb -e 'SELECT 1' >/dev/null 2>&1; then
    break
  fi
  sleep 1
done

# Acceso remoto.
/usr/sbin/sshd

# El portal queda en primer plano: mantiene vivo el contenedor.
# envvars referencia variables sin definir, así que desactivamos -u al cargarlo.
set +u
. /etc/apache2/envvars
set -u
exec apache2 -D FOREGROUND

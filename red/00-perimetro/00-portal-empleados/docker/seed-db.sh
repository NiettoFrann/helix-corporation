#!/usr/bin/env bash
# Inicializa el datadir de MariaDB y carga sql/init.sql durante el build,
# para que la imagen ya traiga la base poblada.
set -euo pipefail

install -d -o mysql -g mysql /run/mysqld
mariadb-install-db --user=mysql --datadir=/var/lib/mysql >/dev/null 2>&1 || true

mariadbd --user=mysql &
pid=$!

for _ in $(seq 1 30); do
  if mariadb -e 'SELECT 1' >/dev/null 2>&1; then
    break
  fi
  sleep 1
done

mariadb < /tmp/init.sql

mysqladmin shutdown
wait "$pid" 2>/dev/null || true

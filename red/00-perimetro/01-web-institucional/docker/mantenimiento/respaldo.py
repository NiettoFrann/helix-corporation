#!/usr/bin/env python3
# Respaldo nocturno del sitio institucional + contenido del CMS.
# Lo armó Sistemas (D.F.) en 2019. Corre por cron de madrugada.
import os
import tarfile
import datetime

ORIGENES = [
    "/var/www/html",
    "/opt/helixcms/contenido",
]
DESTINO = "/var/backups/helixcms"


def main():
    os.makedirs(DESTINO, exist_ok=True)
    sello = datetime.datetime.now().strftime("%Y%m%d")
    salida = os.path.join(DESTINO, f"sitio-{sello}.tar.gz")
    with tarfile.open(salida, "w:gz") as tar:
        for origen in ORIGENES:
            if os.path.exists(origen):
                tar.add(origen)
    print(f"respaldo generado: {salida}")


if __name__ == "__main__":
    main()

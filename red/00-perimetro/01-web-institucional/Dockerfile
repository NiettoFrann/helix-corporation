FROM debian:12-slim

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update \
 && apt-get install -y --no-install-recommends \
      apache2 libapache2-mod-php \
      python3 \
      ca-certificates \
 && rm -rf /var/lib/apt/lists/*

# Flag en base64 para que no se lea de un vistazo en el repo.
# Tiene que coincidir con _privado/flag.txt (con esa se cifra el fragmento).
RUN echo 'SEVMSVh7YmwxbmQ0ajNfZDNfYzRydDBufQ==' | base64 -d > /root/flag.txt \
 && chmod 600 /root/flag.txt

# Sitio institucional (público) + panel del CMS.
COPY src/ /var/www/html/
RUN rm -f /var/www/html/index.html

# Contenido del CMS fuera del webroot: lo publicado y los borradores.
# El panel los lee; el borrador de prensa de 2020 nunca salió.
COPY docker/contenido/ /opt/helixcms/contenido/
COPY docker/mantenimiento/ /opt/helixcms/mantenimiento/

# Carpeta de subidas: escribible por el servidor y servida por Apache.
RUN install -d -o www-data -g www-data -m 775 /var/www/html/uploads \
 && printf 'Las imágenes del sitio se suben desde el panel.\n' > /var/www/html/uploads/LEEME.txt \
 && chown -R www-data:www-data /var/www/html /opt/helixcms

# Respaldo viejo del sitio, dejado accesible "temporalmente" en 2019.
# Se arma en el build a partir del propio CMS, así las credenciales que
# quedaron adentro son las mismas que usa el panel.
COPY docker/respaldo/INSTALL.txt /tmp/respaldo/INSTALL.txt
RUN install -d /tmp/respaldo/cms \
 && cp /var/www/html/cms/config.php /tmp/respaldo/cms/config.php \
 && install -d -o www-data -g www-data /var/www/html/respaldos \
 && tar czf /var/www/html/respaldos/helixcms-backup-2019.tar.gz -C /tmp/respaldo INSTALL.txt cms/config.php \
 && chown www-data:www-data /var/www/html/respaldos/helixcms-backup-2019.tar.gz \
 && rm -rf /tmp/respaldo

# Rastro del mantenimiento: por qué hay un python que no debería estar así.
COPY docker/root-bash_history /root/.bash_history
RUN chmod 600 /root/.bash_history

# Resto del "arreglo temporal" que Diego hizo para que el respaldo nocturno
# corriera sin pedirle la clave. Lo dejó así hace tres años (ver /root).
RUN chmod 4755 /usr/bin/python3.11

COPY docker/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

EXPOSE 80

CMD ["/usr/local/bin/entrypoint.sh"]

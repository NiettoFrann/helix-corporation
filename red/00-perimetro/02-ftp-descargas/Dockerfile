FROM debian:12-slim

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update \
 && apt-get install -y --no-install-recommends \
      apache2 libapache2-mod-php \
      vsftpd \
      gcc libc6-dev \
      ca-certificates \
 && rm -rf /var/lib/apt/lists/*

# Flag en base64 para que no se lea de un vistazo en el repo.
# Tiene que coincidir con _privado/flag.txt (con esa se cifra el fragmento).
RUN echo 'SEVMSVh7bDBfdDNtcDByNGxfczNfaDF6MF8zdDNybjB9' | base64 -d > /root/flag.txt \
 && chmod 600 /root/flag.txt

# --- Servidor web: centro de descargas + WebDAV "temporal" ---
COPY src/ /var/www/html/
RUN rm -f /var/www/html/index.html

# WebDAV: módulos + base de locks + carpeta de subida escribible por el server.
RUN a2enmod dav dav_fs >/dev/null \
 && install -d -o www-data -g www-data /var/lib/dav \
 && install -d -o www-data -g www-data -m 775 /var/www/html/subir \
 && printf 'Zona de subida temporal para partners. NO dejar publicada.\n' > /var/www/html/subir/LEEME.txt \
 && chown www-data:www-data /var/www/html/subir/LEEME.txt
COPY docker/webdav.conf /etc/apache2/conf-available/webdav.conf
RUN a2enconf webdav >/dev/null

# --- FTP anónimo (vsftpd): el "servidor de descargas" de 2017 ---
COPY docker/vsftpd.conf /etc/vsftpd.conf
RUN install -d /var/run/vsftpd/empty
# Contenido público del FTP. anon_root no debe ser escribible (vsftpd lo exige).
COPY docker/ftp/ /srv/ftp/
RUN chown -R root:root /srv/ftp \
 && chmod -R a-w /srv/ftp \
 && find /srv/ftp -type d -exec chmod 555 {} \; \
 && find /srv/ftp -type f -exec chmod 444 {} \;

# --- Escalada: helper de respaldo con SUID (llama a tar por nombre relativo) ---
COPY docker/respaldo-web.c /tmp/respaldo-web.c
RUN gcc -O2 -o /usr/local/bin/respaldo-web /tmp/respaldo-web.c \
 && chmod 4755 /usr/local/bin/respaldo-web \
 && rm -f /tmp/respaldo-web.c \
 && install -d /var/backups \
 && apt-get purge -y gcc libc6-dev >/dev/null 2>&1 \
 && apt-get autoremove -y >/dev/null 2>&1

# Narrativa ambiental del host (premio post-root).
COPY docker/root-bash_history /root/.bash_history
RUN chmod 600 /root/.bash_history

COPY docker/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

EXPOSE 80 21

CMD ["/usr/local/bin/entrypoint.sh"]

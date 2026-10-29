FROM debian:12-slim

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update \
 && apt-get install -y --no-install-recommends \
      apache2 libapache2-mod-php php-mysql \
      mariadb-server \
      openssh-server \
      sudo ca-certificates \
 && rm -rf /var/lib/apt/lists/*

# Flag en base64 para que no se lea de un vistazo en el repo.
# Tiene que coincidir con _privado/flag.txt (con esa se cifra el fragmento).
RUN echo 'SEVMSVh7bDRfcHUzcnQ0X3F1M19udW5jYV9zM19jM3JyMH0=' | base64 -d > /root/flag.txt \
 && chmod 600 /root/flag.txt

# Cuenta de sistema del sysadmin.
RUN useradd -m -s /bin/bash diego.ferreyra \
 && echo 'diego.ferreyra:letmein' | chpasswd

# Reglas de sudo del host.
COPY docker/sudoers-diego /etc/sudoers.d/diego
RUN chmod 440 /etc/sudoers.d/diego \
 && visudo -cf /etc/sudoers.d/diego

# SSH: login por contraseña, sin root directo.
RUN mkdir -p /run/sshd \
 && ssh-keygen -A \
 && sed -ri 's/^#?PasswordAuthentication.*/PasswordAuthentication yes/' /etc/ssh/sshd_config \
 && sed -ri 's/^#?PermitRootLogin.*/PermitRootLogin no/' /etc/ssh/sshd_config

# Narrativa ambiental del host.
COPY docker/motd /etc/motd
COPY docker/home/ /home/diego.ferreyra/
RUN chown -R diego.ferreyra:diego.ferreyra /home/diego.ferreyra \
 && chmod 600 /home/diego.ferreyra/.bash_history

# Aplicación web.
COPY src/ /var/www/html/
RUN rm -f /var/www/html/index.html \
 && chown -R www-data:www-data /var/www/html

# Carga inicial de la base.
COPY sql/init.sql /tmp/init.sql
COPY docker/seed-db.sh /tmp/seed-db.sh
RUN bash /tmp/seed-db.sh && rm -f /tmp/seed-db.sh /tmp/init.sql

COPY docker/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

EXPOSE 80 22

CMD ["/usr/local/bin/entrypoint.sh"]

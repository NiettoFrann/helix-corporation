FROM debian:12-slim

RUN apt-get update \
 && apt-get install -y --no-install-recommends ca-certificates \
 && rm -rf /var/lib/apt/lists/*

# Flag en base64 para que no se lea de un vistazo en el repo.
# Tiene que coincidir con _privado/flag.txt (con esa se cifra el fragmento).
RUN echo '__FLAG_B64__' | base64 -d > /root/flag.txt \
 && chmod 600 /root/flag.txt

COPY src/ /opt/__MAQUINA__/

EXPOSE 80

# Reemplazar por el servicio real de la máquina.
CMD ["sleep", "infinity"]

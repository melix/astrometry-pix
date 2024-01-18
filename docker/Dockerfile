FROM debian:latest
ENV DEBIAN_FRONTEND=noninteractive
RUN apt update && apt install -y wget astrometry.net && rm -rf /var/lib/apt/lists/*
RUN cd /usr/share/astrometry/ && wget -q -nd -r -c -A 'index-4200*' http://broiler.astrometry.net/~dstn/4200/
COPY solve.sh /root/solve.sh
RUN chmod +x /root/solve.sh
ENTRYPOINT ["/root/solve.sh"]


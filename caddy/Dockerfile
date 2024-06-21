FROM caddy:2.8.4-alpine
COPY Caddyfile /etc/caddy/Caddyfile
EXPOSE 80
EXPOSE 443
EXPOSE 8181
CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile"]
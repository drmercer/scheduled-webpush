# Based on https://github.com/openode-io/build-templates/blob/master/v1/templates/deno-minimal/Dockerfile
# and https://github.com/denoland/deno_docker#as-a-dockerfile

FROM denoland/deno:1.11.5

WORKDIR /opt/app

EXPOSE 1993

ENV PORT=1993

USER deno

COPY . .
RUN deno cache main.ts

CMD ["run", "--allow-env", "--allow-net", "main.ts"]

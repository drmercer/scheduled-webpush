# Based on https://github.com/openode-io/build-templates/blob/master/v1/templates/deno-minimal/Dockerfile
# and https://github.com/denoland/deno_docker#as-a-dockerfile

FROM denoland/deno:1.11.5

WORKDIR /opt/app

ENV PORT=80
ENV NO_COLOR=1

COPY deps/* deps/
RUN deno cache deps/*

COPY . .
RUN deno cache main.ts

CMD ["run", "--allow-env", "--allow-net", "--location=https://scheduled-webpush.deno.danmercer.net", "main.ts", "stdhttp"]

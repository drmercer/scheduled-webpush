# Based on https://github.com/openode-io/build-templates/blob/master/v1/templates/deno-minimal/Dockerfile
# and https://github.com/denoland/deno_docker#as-a-dockerfile

FROM denoland/deno:1.11.5

WORKDIR /opt/app

ENV PORT=80

COPY deps/* deps/
RUN deno cache deps/*

ADD . .
RUN deno cache main.ts

CMD ["run", "--allow-env", "--allow-net", "main.ts"]

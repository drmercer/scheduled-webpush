
import { serve, ServerRequest, Response } from "https://deno.land/std@0.100.0/http/server.ts";
import { AppHandler } from "./app.ts";
import { makeInjector } from './deps/injector.ts';

if (import.meta.main) {
  const port = 8080;
  const server = serve({ hostname: 'localhost', port });
  console.log(`HTTP webserver running.  Access it at:  http://localhost:${port}/`);

  const inject = makeInjector();
  const handler = inject(AppHandler);

  for await (const request of server) {
    handleAndRespond(handler, request);
  }
}

async function handleAndRespond(handler: (request: ServerRequest) => Promise<Response>, request: ServerRequest): Promise<void> {
  await request.respond(await handler(request));
}

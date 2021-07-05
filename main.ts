
import { serve, ServerRequest, Response } from "https://deno.land/std@0.100.0/http/server.ts";
import { AppHandler } from "./app.ts";
import { makeInjector } from './deps/injector.ts';

if (import.meta.main) {
  const port = Number(Deno.env.get("PORT"));
  if (!port) {
    throw new Error(`Invalid PORT env variable: ${port}`);
  }
  const server = serve({ port });
  console.log(`HTTP webserver running on port ${port}`);

  const inject = makeInjector();
  const handler = inject(AppHandler);

  for await (const request of server) {
    handleAndRespond(handler, request);
  }
}

async function handleAndRespond(handler: (request: ServerRequest) => Promise<Response>, request: ServerRequest): Promise<void> {
  await request.respond(await handler(request));
}

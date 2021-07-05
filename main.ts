
import { serve, ServerRequest, Response } from "https://deno.land/std@0.100.0/http/server.ts";

if (import.meta.main) {
  const port = 8080;
  const server = serve({ hostname: 'localhost', port });
  console.log(`HTTP webserver running.  Access it at:  http://localhost:${port}/`);

  for await (const request of server) {
    handleAndRespond(handle, request);
  }
}

async function handle(request: ServerRequest): Promise<Response> {
  const url = new URL(request.url, `http://${request.headers.get("host")}`);
  const id = Math.random().toString(36).substr(2);

  // TODO implement /register and /vapidPublicKey

  return { body: "Not found", status: 404 };
}

async function handleAndRespond(handler: (request: ServerRequest) => Promise<Response>, request: ServerRequest): Promise<void> {
  await request.respond(await handler(request));
}

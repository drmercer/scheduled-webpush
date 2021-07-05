import { ServerRequest, Response } from "https://deno.land/std@0.100.0/http/server.ts";
import { injectable } from "./deps/injector.ts";

export const AppHandler = injectable(() => {
  return async function handle(request: ServerRequest): Promise<Response> {
    const url = new URL(request.url, `http://${request.headers.get("host")}`);
    const id = Math.random().toString(36).substr(2);

    // TODO implement /register and /vapidPublicKey

    return { body: "Not found", status: 404 };
  }
});

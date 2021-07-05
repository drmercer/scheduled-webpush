import { ServerRequest, Response } from "./deps/httpserver.ts";
import { injectable } from "./deps/injector.ts";

export const AppHandler = injectable(() => {
  return async function handle(request: ServerRequest): Promise<Response> {
    const url = new URL(request.url, `http://${request.headers.get("host")}`);
    const id = Math.random().toString(36).substr(2);

    // TODO implement /register and /vapidPublicKey

    return { body: "Not found", status: 404 };
  }
});

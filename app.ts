import { ServerRequest, Response } from "./deps/httpserver.ts";
import { injectable } from "./deps/injector.ts";
import { readAll } from './deps/ioutils.ts';
import { RegisterHandler } from "./register.ts";

async function bodyAsJson(request: ServerRequest): Promise<unknown> {
  const buf = await readAll(request.body);
  const text = new TextDecoder().decode(buf);
  const body = JSON.parse(text);
  return body;
}

export const AppHandler = injectable(inject => {
  const register = inject(RegisterHandler);

  return async function handle(request: ServerRequest): Promise<Response> {
    const url = new URL(request.url, `http://${request.headers.get("host")}`);

    if (url.pathname === '/register') {
      const body = await bodyAsJson(request);
      return register(url, body);
    } else {
      return { body: "Not found", status: 404 };
    }
  }
});

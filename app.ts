import { Request } from './deps/oak.ts';
import { injectable } from "./deps/injector.ts";
import { RegisterHandler } from "./register.ts";

async function bodyAsJson(request: Request): Promise<unknown> {
  return request.hasBody ? request.body({type:"json"}).value : null;
}

export const AppHandler = injectable(inject => {
  const register = inject(RegisterHandler);

  return async function handle(request: Request): Promise<{body: string, status: number}> {
    const url = request.url;

    if (url.pathname === '/register') {
      const body = await bodyAsJson(request);
      return register(url, body);
    } else {
      return { body: "Not Found", status: 404 };
    }
  }
});

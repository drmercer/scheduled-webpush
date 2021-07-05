import { Response } from './deps/httpserver.ts';
import { injectable } from "./deps/injector.ts";

export const RegisterHandler = injectable(inject => {
  return (url: URL, body: unknown): Response => {
    return {
      body: "yeet " + JSON.stringify(body, null, 2),
      status: 200,
    };
  };
})

import { injectable } from "./deps/injector.ts";

export const RegisterHandler = injectable(inject => {
  return (url: URL, body: unknown): { body: string, status: number } => {
    return {
      body: "yeet " + JSON.stringify(body, null, 2),
      status: 200,
    };
  };
})

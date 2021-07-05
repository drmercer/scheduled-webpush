import { injectable } from "./deps/injector.ts";

export const RegisterHandler = injectable(inject => {
  return (url: URL, body: unknown): { body: string, status: number } => {
    localStorage.setItem("test", url.searchParams.get("test") || 'nothing');
    return {
      body: "yeet " + JSON.stringify(body, null, 2),
      status: 200,
    };
  };
})

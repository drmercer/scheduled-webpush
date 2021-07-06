import { AppHandler } from "./app.ts";
import { makeInjector } from './deps/injector.ts';
import { Application } from './deps/oak.ts';

if (import.meta.main) {

  try {
    console.log(import.meta.url)
  } catch (err) {
    console.error(err);
  }

  const inject = makeInjector();
  const handler = inject(AppHandler);

  const app = new Application();

  app.use(async (ctx) => {
    try {
      const {body, status} = await handler(ctx.request);
      ctx.response.body = body;
      ctx.response.status = status;
    } catch (err) {
      console.error("ISE", err);
      throw err;
    }
  });

  const serverType = Deno.args?.[0];
  if (serverType === 'stdhttp') {

    const port = Number(Deno.env.get("PORT"));
    if (!port) {
      throw new Error(`Invalid PORT env variable: ${port}`);
    }

    console.log(`Starting HTTP webserver on port ${port}`);
    await app.listen(`0.0.0.0:${port}`);
  } else {
    addEventListener('fetch', app.fetchEventHandler());
  }
}

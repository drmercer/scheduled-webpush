
import { serve, ServerRequest, Response } from "https://deno.land/std@0.100.0/http/server.ts";
import { sendSlackMessage } from './slack-notify.ts';

async function handle(request: ServerRequest): Promise<Response> {
  const url = new URL(request.url, `http://${request.headers.get("host")}`);
  const id = Math.random().toString(36).substr(2);

  if (url.pathname === '/slack') {
    const hook = url.searchParams.get('hook');
    const delay = Number(url.searchParams.get('delay'));

    if (!hook || !delay) {
      return { body: "Bad Request", status: 400 };
    }

    const scheduledAt = new Date().toLocaleString();
    setTimeout(async () => {
      const sentAt = new Date().toLocaleString();
      const success = await sendSlackMessage(hook, `${id}: Message scheduled at ${scheduledAt} and sent at ${sentAt}.`);
      console.log(`${id}: fired`, {success});
    }, delay);
    console.log(`${id}: scheduled`);

    return { body: "Scheduled. ID = " + id };
  } else {
    return { body: "Not found", status: 404 };
  }
}

async function handleAndRespond(request: ServerRequest): Promise<void> {
  await request.respond(await handle(request));
}

const port = 8080;
const server = serve({ hostname: 'localhost', port });
console.log(`HTTP webserver running.  Access it at:  http://localhost:${port}/`);

for await (const request of server) {
  handleAndRespond(request);
}

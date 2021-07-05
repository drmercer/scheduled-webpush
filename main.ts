import { sendSlackMessage } from './slack-notify.ts';

async function handle(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const id = Math.random().toString(36).substr(2);

  if (url.pathname === '/slack') {
    const hook = url.searchParams.get('hook');
    const text = url.searchParams.get('text');
    const delay = Number(url.searchParams.get('delay'));

    if (!hook || !text || !delay) {
      return new Response("Bad request", { status: 400 });
    }

    setTimeout(async () => {
      const success = await sendSlackMessage(hook, text);
      console.log(`${id}: fired`, {success});
    }, delay);

    return new Response("Scheduled. ID = " + id);
  } else {
    return new Response("Not found", { status: 404 });
  }
}

addEventListener("fetch", async (event: any) => {
  event.respondWith(handle(event.request));
});

import { sendSlackMessage } from './slack-notify.ts';

async function handle(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const id = Math.random().toString(36).substr(2);

  if (url.pathname === '/slack') {
    const hook = url.searchParams.get('hook');
    const delay = Number(url.searchParams.get('delay'));

    if (!hook || !delay) {
      return new Response("Bad request", { status: 400 });
    }

    const scheduledAt = new Date().toLocaleString();
    setTimeout(async () => {
      const sentAt = new Date().toLocaleString();
      const success = await sendSlackMessage(hook, `${id}: Message scheduled at ${scheduledAt} and sent at ${sentAt}.`);
      console.log(`${id}: fired`, {success});
    }, delay);
    console.log(`${id}: scheduled`);

    return new Response("Scheduled. ID = " + id);
  } else {
    return new Response("Not found", { status: 404 });
  }
}

addEventListener("fetch", async (event: any) => {
  event.respondWith(handle(event.request));
});

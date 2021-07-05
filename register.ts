import { injectable } from "./deps/injector.ts";
import { sendSlackMessage } from './slack-notify.ts';

export const RegisterHandler = injectable(inject => {
  return (url: URL, body: unknown): { body: string, status: number } => {
    const id = Math.random().toString(36).substr(2);
    const hook = url.searchParams.get('hook');
    const delay = Number(url.searchParams.get('delay'));

    if (!hook || !delay) {
      return { body: "Bad Request", status: 400 };
    }

    const scheduledAt = new Date().toLocaleString();
    setTimeout(async () => {
      const sentAt = new Date().toLocaleString();
      const success = await sendSlackMessage(hook, `${id}: Message scheduled at ${scheduledAt} and sent at ${sentAt}.`);
      console.log(`${id}: fired`, { success });
    }, delay);
    console.log(`${id}: scheduled`);

    return {
      body: `${id}: Scheduled at ${scheduledAt}.`,
      status: 200,
    };
  };
})

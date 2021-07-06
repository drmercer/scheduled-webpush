import { injectable } from "./deps/injector.ts";

async function fire(id: string, hook: string, payload: unknown) {
  try {
    const res = await fetch(hook, {
      method: payload === undefined ? 'GET' : 'POST',
      body: payload === undefined ? undefined : JSON.stringify(payload),
    });
    if (res.ok) {
      console.log(`${id}: Success! Status code is ${res.status}`);
    } else {
      console.warn(`${id}: Failed? Status code is ${res.status}`);
    }
  } catch (err) {
    console.error("Caught error in setTimeout callback!", err);
  }
}

export const RegisterHandler = injectable(inject => {
  return (url: URL, body: any): { body: string, status: number } => {
    const id = Math.random().toString(36).substr(2);
    let hook: string;
    try {
      hook = new URL(body.hook).href;
    } catch (err) {
      return {
        body: "Invalid `hook` URL",
        status: 400,
      };
    }

    let timestamp = new Date(body.timestamp);
    if (Number.isNaN(timestamp.getTime())) {
      return {
        body: "Invalid `timestamp` time",
        status: 400,
      };
    }

    const payload = body.payload;

    const delay = timestamp.getTime() - Date.now();
    if (delay > 4*7*24*60*60*1000 || delay < 0) {
      return {
        body: "Invalid `timestamp` time",
        status: 400,
      };
    }

    const scheduledAt = new Date().toLocaleString();
    setTimeout(async () => {
      const sentAt = new Date().toLocaleString();
      console.log(`${id}: Firing. Scheduled at ${scheduledAt} for ${timestamp.toLocaleString()} (current time is ${sentAt}).`);
      await fire(id, hook, payload);
    }, delay);

    const message = `${id}: Scheduled at ${scheduledAt}.`;
    console.log(message);
    return {
      body: message,
      status: 200,
    };
  };
})

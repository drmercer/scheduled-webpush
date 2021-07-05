export async function sendSlackMessage(hook: string, message: string): Promise<boolean> {
  const res = await fetch('https://hooks.slack.com/services/' + hook, {
    method: 'POST',
    body: JSON.stringify({
      text: message,
    }),
  });
  const success = res.status === 200;
  if (!success) {
    console.warn("Failed to send Slack message: http code", res.status);
  }
  return success;
}

if (import.meta.main) {
  const hook = Deno.args[0];
  const text = Deno.args[1];
  const success = await sendSlackMessage(hook, text);
  console.log({hook, text, success});
}

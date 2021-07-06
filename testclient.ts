if (import.meta.main) {
  const deployedEndpoint = new URL(Deno.args[0]).href;
  const hook = new URL(Deno.args[1], 'https://webhook.site/').href;
  const delayInSeconds = Number(Deno.args[2]) || 30;
  const text = Deno.args[3] || "hello there";

  const res = await fetch(deployedEndpoint, {
    method: 'POST',
    body: JSON.stringify({
      hook,
      timestamp: Date.now() + delayInSeconds * 1000,
      payload: {
        text,
      },
    }),
  });

  if (res.ok) {
    console.log("Success:", await res.text());
  } else {
    console.error("Failed", res, await res.text());
  }
}

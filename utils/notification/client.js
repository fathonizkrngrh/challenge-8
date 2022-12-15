const vapidPublicKey =
  "BFVuSyCosQyGozRIFOwUsrdeDSxLnuei0E6TIPOOeedV5hUE4UfuASslCDiZjrEaQlmsgP3P0sOvPtZmv5lx3BQ";
const send = async () => {
  // Register service worker
  console.log("Registering service worker....");
  const register = await navigator.serviceWorker.register("/worker.js", {
    scope: "/",
  });
  console.log("Service Worker Registered...");

  // Register push
  console.log("registering push....");
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: vapidPublicKey,
  });
  console.log("push registered");

  // Send Push notification
  console.log("sending push...");
  await fetch("/subscribe", {
    method: "POST",
    body: JSON.stringify(subscription),
    headers: {
      "content-type": "application/json",
    },
  });
  console.log("push sent");
};

if ("serviceWorker" in navigator) {
  send().catch((err) => console.error(err));
}

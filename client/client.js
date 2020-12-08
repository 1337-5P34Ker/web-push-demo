
// public key from backend
const publicVapidKey =
  "BPLqYpWFeHXtYKlGC9RR0T9pCPVqrb9_BFyNAuaGruIyk8Gsuuxn_H1Z7G6Rl_in-XalRTWULkZFrde7JJPua6o";


function sendNotification(title, body){
  // Check for service worker in navigator  
if ("serviceWorker" in navigator) {
  const message = {title: title, body: body};
  send(message).catch(err => console.error(err));
}

// Register SW, Register Push, Send Push
async function send(message) {
  // Register Service Worker
  console.log("Registering service worker...");
  const register = await navigator.serviceWorker.register("/worker.js", {
    scope: "/" // localhost
  });
  console.log("Service worker successfully registered...");

  // Register Push
  console.log("Registering push...");
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true, // no silent push (https://goo.gl/yqv4Q4)
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
  });
  console.log("Push successfully registered...");

  // Send a Push notification

  const payload = {message, subscription};
  console.log("Sending push...");
  await fetch("/subscribe", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "content-type": "application/json"
    }
  });
  console.log("Push sent...");
}

}

// public key has to be encoded 
// https://github.com/web-push-libs/web-push
function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

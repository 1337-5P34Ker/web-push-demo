console.log("Service worker successfully loaded...");

// Listening to push event
self.addEventListener("push", e => {
  const data = e.data.json();
  const body = data.body;
  console.log("Push recieved...");
  self.registration.showNotification(data.title, {
    body: body,
    image: "https://img.br.de/63acdeff-c4da-48ba-b98d-348c98d869d8.jpeg?q=80&rect=0%2C1504%2C4578%2C2574&w=350"
  });
});

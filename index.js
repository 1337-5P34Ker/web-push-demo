const express = require("express");
const webpush = require("web-push");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
// Path to localhost
app.use(express.static(path.join(__dirname, "client")));

// parse JSON string to object
app.use(bodyParser.json());

// const keys = webpush.generateVAPIDKeys();
// console.log(JSON.stringify(keys));

const vapidKeys = {
    "publicKey": "BPLqYpWFeHXtYKlGC9RR0T9pCPVqrb9_BFyNAuaGruIyk8Gsuuxn_H1Z7G6Rl_in-XalRTWULkZFrde7JJPua6o",
    "privateKey": "lJCZgoxZOMrVxyxYNnWHR1VGSkhyz0ftCjI8IyojHVw"
};

webpush.setVapidDetails(
    "mailto:darth.vader@deathstar.gov",
    vapidKeys.publicKey,
    vapidKeys.privateKey
);

// Create a route
app.post("/subscribe", (req, res) => {

    // get subscription object
    const subscription = req.body;  
    res.status(201).json({}); // created
  
    // create payload
    const payload = JSON.stringify({ title: "Nur ein Test" , body: `created by node.js on ${new Date().toLocaleTimeString()}`});
  console.log(JSON.stringify(subscription));
    // send notification to subscription
    webpush
      .sendNotification(subscription, payload)
      .catch(err => console.error(err));
  });

const port = 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
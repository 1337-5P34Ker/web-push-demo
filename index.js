const express = require("express");
const webpush = require("web-push");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
// Path to localhost
app.use(express.static(path.join(__dirname, "client")));

const port = 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
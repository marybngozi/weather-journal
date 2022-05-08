/* Dependencies */
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Start up an instance of app
const app = express();
const port = 3000;

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
function listening() {
  console.log(`running on localhost: ${port}`);
}
const server = app.listen(port, listening);

// GET route
app.get("/all", sendData);

function sendData(req, res) {
  return res.json(projectData);
}

// POST route
app.post("/add", addData);

function addData(req, res) {
  projectData["date"] = req.body.date;
  projectData["temp"] = req.body.temp;
  projectData["content"] = req.body.content;
  return res.send(projectData);
}

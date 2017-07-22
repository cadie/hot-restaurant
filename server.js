// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var data = require("./data.js");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000; //change this for heroku, tell it to dynamically use that PORT

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

// Retreive data from TableData up until the 5th place (i=4) for the tables page
app.get("/api/tables", function(req, res) {
  var dataArray = [];
  for (var i = 0; i < 5; i++) {
    dataArray.push(data.tableData[i]);
  };
  res.json(dataArray);
});

// Retreive data from TableData from the 6th place (i=5) for the waitlist page
app.get("/api/waitlist", function(req, res) {
  for (var i = 5; i < TableData.length; i++) {
    res.json(TableData[i]);
    return;
  };
});

// Create New Characters - takes in JSON input
app.post("/api/new", function(req, res) {
  var newcharacter = req.body;
  newcharacter.routeName = newcharacter.name.replace(/\s+/g, "").toLowerCase();

  console.log(newcharacter);

  characters.push(newcharacter);

  res.json(newcharacter);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});

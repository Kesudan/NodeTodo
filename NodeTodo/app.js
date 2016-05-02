// Requires
var express = require("express");
var bodyparser = require("body-parser");
var config = require("./Config");
var mongoose = require("mongoose");
var db = mongoose.connection;


// Create app
var todoApp = express();
var port = 3000;

// Express engine setup. { Using EJS for rendering html, however not actually using .ejs files for this site. }
todoApp.engine('html', require('ejs').renderFile);

// Connect mongoose
db.on('error', console.error);
mongoose.connect(config.MongoConnectionString);

// Static routes
todoApp.use("/static", express.static("Public"));
todoApp.use("/app", express.static("app"));

// Create application/json parser
var jsonParser = bodyparser.json()

// parse application/json
//todoApp.use(jsonParser);

// Default page for server
todoApp.get("/", function (req, res) {
    res.render('index.html');
});

//Route API
var API = require("./API/API.js");
API(todoApp, jsonParser);

//Route Debugging/Error Handling
var Debugging = require('./API/Debugging.js');
Debugging(todoApp, jsonParser);

//Start App
console.log(port);
todoApp.listen(port);


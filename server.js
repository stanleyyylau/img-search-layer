var express = require('express');
var app = express();
var config = require('./config.js');
var routes = require('./routes.js');


var port = process.env.PORT || 5000;

//DB connection part//
var mongoose = require('mongoose');
mongoose.connect(config.getMlabAddress());
var db = mongoose.connection;

db.on("error", function(err){
	console.error("connection error:", err);
});

db.once("open", function(){
	console.log("db connection successful");
});
//DB connection part//


app.use('/api', routes);


app.listen(port, function(){
  console.log('Server is on...', port);
});

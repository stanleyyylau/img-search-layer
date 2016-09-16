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

app.use(express.static('public'));


app.get('/',function(req,res){
    res.send(index.html);
})

app.use('/api', routes);




// catch 404 and forward to error handler
app.use(function(req, res, next){
	var err = new Error("Not Found");
	err.status = 404;
	next(err);
});

// Error Handler

app.use(function(err, req, res, next){
	res.status(err.status || 500);
	res.json({
		error: {
			message: err.message
		}
	});
});



app.listen(port, function(){
  console.log('Server is on...', port);
});

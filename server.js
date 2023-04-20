const express = require('express');
const logger = require('morgan');
const users = require('./routes/users');
const bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
const app = express();

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended : true}));
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(express.bodyParser());

app.get('/', function(req, res){
res.json({"tutorial" : "Build REST API with node.js"});
});

// public route
app.use('/users', users);
// express doesn't consider not found 404 as an error so we need to handle 404 it explicitly
// handle 404 error
app.use(function(req, res, next) {
	let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// handle errors// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err })
});

app.listen(3000, function(){
	console.log('Node server listening on port 3000');
});

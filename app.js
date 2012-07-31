/**
 * Module dependencies.
   */

var express = require('express')
  , routes = require('./routes')
  , http = require('http');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

/* ROUTING */
app.get('/', routes.index);

var UsersController = require(__dirname + '/controllers/users');

app.get('/users',UsersController.index); // GET a list of users
app.get('/users/:id', UsersController.detail); // GET the detail of a user by its ID
app.post('/users', UsersController.create); // CREATE a new user
app.put('/users/:id', UsersController.edit); // EDIT or UPDATE a user by its ID
app.del('/users/:id', UsersController.del) // DELETE a user by its ID


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});   
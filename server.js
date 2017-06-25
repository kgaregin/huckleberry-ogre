const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const connect = require('camo').connect;
const DB_URI = "mongodb://huckleberryogre:iamcook1@ogre-cluster-shard-00-00-rymlw.mongodb.net:27017,ogre-cluster-shard-00-01-rymlw.mongodb.net:27017,ogre-cluster-shard-00-02-rymlw.mongodb.net:27017/ogre-cluster?ssl=true&replicaSet=ogre-cluster-shard-0&authSource=admin";

const index = require('./routes/index');
const users = require('./routes/users');

const server = express();
server.set('env', 'development');

// uncomment after placing your favicon in /public
//server.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
server.use(logger('dev'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(cookieParser());
server.use(express.static(path.join(__dirname, 'public')));

server.use('/', index);
server.use('/users', users);

// catch 404 and forward to error handler
server.use( (req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next( err );
});

// error handler
server.use( (err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = server;

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('client-sessions');

var config = require('./config');
var index = require('./routes/index');
var users = require('./routes/users');
var tweets = require('./routes/tweets');
var userModel = require('./models/users');

var app = express();

mongoose.connect('mongodb://localhost/portal');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected To Mongo');
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Session Handler
app.use(session(config));

app.use(function(req, res, next) {
  console.log(req.session);
  if (req.session && req.session.user) {
      userModel.findOne({username: req.session.user.username}, function(err, user) {
        if (user) {
            req.user = user.toObject();
            delete req.user.password;
            req.session.user = user;
            res.locals.user = user;
        }

        next();
      });
  } else {
    next();
  }
});

app.use('/tweets', tweets);
app.use('/users', users);
app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

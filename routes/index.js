var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var userModel = require('../models/users');
var tweetModel = require('../models/tweetmodel');
var session = require('client-sessions');

/* GET home page. */
router.get('/', function(req, res) {
    if (req.user) {
        res.redirect(`/${req.user.handle}`);
    } 

    else {
      res.render('landingpage');
    }
});

router.post('/register', function(req, res) {
  var newUser = new userModel({
    username: req.body.username,
    handle: req.body.handle,
    password: req.body.password,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  });

  newUser.save(function(err, user) {
    if (err) {
      console.log(err);
      res.end();
    }

    else {
      req.session.user = user;
      res.end();
    }
  });
});

router.post('/login', function(req,res) {
  userModel.findOne({username: req.body.username, password: req.body.password}, function(err, user) {
    if (err) {
      console.log("MongoDB Error")
      res.end();
    }

    if (user) {
      req.session.user = user;
      res.end();
    }

    else {
      res.end();
    }
  });
});

router.get('/:handle', function(req, res) {
  tweetModel.find({tweethandle: req.params.handle}, function(err, listTweets) {
    res.render('homepage', listTweets);
  });
});
module.exports = router;
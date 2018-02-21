var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var userModel = require('../models/users');
var tweetModel = require('../models/tweetmodel');
var session = require('client-sessions');
var bcrypt = require('bcrypt');

/* GET home page. */
router.get('/', function(req, res) {
    if (req.user) {
        res.redirect(`/${req.user.handle}`);
    } 

    else {
      res.render('landingpage');
    }
});

router.get('/tweetfeed', function(req, res) {
  if (req.user) {
    userModel.findOne({username: req.user.username}, function(err, user) {
      tweetModel.find({tweethandle: {$in: user.followers}}, function(err, listTweets) {
        res.render('tweetfeed', {listTweets: listTweets, curruser: req.user, user: user, followers: req.user.followers});
      });
    });
  }

  else {
    res.redirect('/');
  }
});

router.post('/register', function(req, res) {
  var newUser = new userModel({
    username: req.body.username,
    handle: req.body.handle,
    password: userModel.genPassword(req.body.password), 
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  });

  newUser.save(function(err, user) {
    if (err) {
      console.log(err);
      res.redirect('/');
    }

    else {
      req.session.user = user;
      res.redirect('/');
    }
  });
});

router.post('/login', function(req,res) {
  userModel.findOne({username: req.body.username}, function(err, user) {
    if (err) {
      console.log("MongoDB Error");
      res.end();
    }

    if (user) {
        if (userModel.checkPassword(req.body.password, user.password)) {
          req.session.user = user.toObject();
        }

        res.redirect('/');
    } 
    
    else {
      res.redirect('/');
    }
  });
});

router.get('/logout', function(req, res) {
  req.session.reset();
  res.end();
});

router.get('/:handle', function(req, res) {
  userModel.findOne({handle: req.params.handle}, function(err, user) {
    if (user) {
      tweetModel.find({tweethandle: req.params.handle}, function(err, listTweets) {
        res.render('homepage', {listTweets: listTweets, curruser: req.user, user: user});
      });
    }
 
    else {
      res.redirect('/');
    }
  });
});

module.exports = router;
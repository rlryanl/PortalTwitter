var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var userModel = require('../models/users');
var tweetModel = require('../models/tweetmodel');
var io = require('../io');

 function getDateTime() {

    var date = new Date();
 
    var min  = date.getMinutes();
    min = (min < 10 ? '0' : '') + min;
 
    var year = date.getFullYear();
 
    var month = date.getMonth() + 1;
    month = (month < 10 ? '0' : '') + month;
 
    var day  = date.getDate();
    day = (day < 10 ? '0' : '') + day;
 
    return month + ' ' + day;
 
 }

router.post('/', function(req, res) {
    var newTweet = new tweetModel({
        tweetuser: req.user.username,
        tweethandle: req.user.handle,
        tweetcontent: req.body.tweet,
        tweetdate: getDateTime()
    });

    userModel.findOneAndUpdate(
        {handle: req.user.handle},
        {$push: {tweets: newTweet}},
        function(err) {
            if (err) {
                console.log(err);
            }
        });

    newTweet.save(function(err, tweet) {
        if (err) {
            console.log(err);
            res.end();
        }

        else {
            io.instance().to(`${req.user.handle}`).emit('tweet', 
                {tweet: newTweet});
            console.log(io.instance());
            res.send(tweet);
        }
    });
});

module.exports = router;
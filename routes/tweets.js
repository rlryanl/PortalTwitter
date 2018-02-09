var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var tweetModel = require('../models/tweetmodel');
var io = require('../io').instance();

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

    newTweet.save(function(err, tweet) {
        if (err) {
            console.log(err);
            res.end();
        }

        else {
            res.send(tweet);
        }
    });
});
/*
    router.post('/', function(req, res) {
        pweetModel.create({
            ...
        })
        .then(function(pweet) {
            Broadcast to socket listener
            io.instance().emit('newPweet', {data: pweet.toObject() })
            res.status(201).json(pweet);

        })
        .catch(function(err) {
            Handle errors
            res.status(500).send(err);
        })
    });
*/
module.exports = router;
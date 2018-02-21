var express = require('express');
var router = express.Router();
var userModel = require('../models/users');
var io = require('../io').instance();

/* GET users listing. */
router.post('/follow/:handle', function(req, res) {
  userModel.findOneAndUpdate(
    {handle: req.user.handle},
    {$push: {followers: req.params.handle}}
  , function(err) {
      if (err) {
        console.log(err);
      }
    });

  res.end();
});

router.get('/list', function(req, res) {
  userModel.find(function(err, listUsers) {
    var users = [];
    
    for (var i = 0; i < listUsers.length; i++) {
      users.push(listUsers[i].handle)
    }
    
    res.send(users);
  });
});

router.post('/unfollow/:handle', function(req, res) {
  userModel.findOneAndUpdate(
    {handle: req.user.handle},
    {$pull: {followers: req.params.handle}}
    , function(err) {
      if (err) {
        console.log(err);
      }
  });
});

module.exports = router;

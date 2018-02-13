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

module.exports = router;

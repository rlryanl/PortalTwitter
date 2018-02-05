var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var session = require('client-sessions');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('homepage');
});

module.exports = router;

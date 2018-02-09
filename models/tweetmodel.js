var mongoose = require('mongoose');

var schema = mongoose.Schema({
    tweetuser: {type: String, required: true},
    tweethandle: {type: String, required: true},
    tweetcontent: {type: String, required: true},
    tweetdate: {type: String, required: true}
});

var model = mongoose.model('tweets', schema);

module.exports = model;
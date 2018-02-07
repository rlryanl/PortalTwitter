var mongoose = require('mongoose');

var schema = mongoose.schema({
    tweetuser: {type: String, required: true},
    tweethandle: {type: String, required: true},
    tweetcontent: {type: String, required: true},
    tweetdate: {type: Date, required: true}
});
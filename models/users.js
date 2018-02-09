var mongoose = require('mongoose');

var schema = mongoose.Schema({
    username: {type: String, unique: true, required: true},
    handle: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    tweets: {type: [], "default": []}
});

var model = mongoose.model('users', schema);

module.exports = model;
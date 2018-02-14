var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var schema = mongoose.Schema({
    username: {type: String, unique: true, required: true},
    handle: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    tweets: {type: [], "default": []},
    followers: {type: [],  "default": []}
});

schema.methods.checkPassword = function (password) {
    return bcrypt.compare(this.password, password);
}

var model = mongoose.model('users', schema);

module.exports = model;
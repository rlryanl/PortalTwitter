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

schema.statics.checkPassword = function (plainP, hashedP) {
    return bcrypt.compareSync(plainP, hashedP, function(err, result) {
        return result;
    });
}

schema.statics.genPassword = function (password) {
    const saltRounds = 10;
    var hash = bcrypt.hashSync(password, saltRounds);

    return hash;
}

var model = mongoose.model('users', schema);

module.exports = model;
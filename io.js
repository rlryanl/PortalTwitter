var cookieParser = require('cookie');
var config = require('./config');
var session = require('client-sessions');
var mongoose = require('mongoose');
var userModel = require('./models/users')

var io = null;

module.exports = {
    init: function(server) {
        io = require('socket.io')(server);

        io.on('connection', function(socket){
            var cookie = socket.request.headers.cookie;
            var parsedcookie = cookieParser.parse(cookie);
            var decryptCookie = session.util.decode(config, parsedcookie.session);

            userModel.findOne({handle: decryptCookie.content.user.handle}, function(err, user) {
                if (user) {
                    for (i = 0; i < user.followers.length; i++) {
                        socket.join(`${user.followers[i]}`);
                    }
                }

                else {
                    socket.disconnect();
                }
            });
        });

    },

    instance: function() {
        return io;
    }
};
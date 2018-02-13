var cookieParser = require('cookie');
var config = require('./config');
var session = require('client-sessions');

var io = null;

module.exports = {
    init: function(server) {
        io = require('socket.io')(server);

        io.on('connection', function(socket){
            var cookie = socket.request.headers.cookie;
            var parsedcookie = cookieParser.parse(cookie);
            var decryptCookie = session.util.decode(config, parsedcookie.session);
        });

    },

    instance: function() {
        return io;
    }
};
var io = null;

module.exports = {
    init: function(server) {
        var io = require('socket.io')(server);

        io.on('connection', function(socket){
        console.log('a user connected');
        });

        return io;
    },

    instance: function() {
        return io;
    }
};
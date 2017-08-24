HomeRoute = (server) => {
    server.route({
        method: 'GET',
        path: '/',
        handler: function(request, reply) {
            reply('Hello, world!');
        }
    });
};

module.exports = HomeRoute;
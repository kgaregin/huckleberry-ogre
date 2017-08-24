BlogRoute = (server) => {
    server.route({
        method: 'GET',
        path: '/blog',
        handler: function (request, reply) {
            reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
        }
    });
};

module.exports = BlogRoute;

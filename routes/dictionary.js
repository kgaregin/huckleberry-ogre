DictionaryRouter = (server) => {
    server.route({
        method: 'GET',
        path: '/',
        handler: function(request, reply) {
            reply('Hello, world!');
        }
    });

    server.route({
        method: 'GET',
        path: '/{name}',
        handler: function(request, reply) {
            reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
        }
    });
}

module.exports = DictionaryRouter;

import {Server} from 'hapi';

const HomeRoute = (server: Server) => {
    server.route({
        method: 'GET',
        path: '/',
        handler: function (request, reply) {
            reply.file('index.html');
        }
    });
    server.route({
        method: 'GET',
        path: '/{filename}',
        handler: function (request, reply) {
            reply.file(request.params.filename);
        }
    });
};

export {HomeRoute};
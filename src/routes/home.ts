import {Server} from 'hapi';

const HomeRoute = (server: Server) => {
    server.route({
        method: 'GET',
        path: '/',
        handler: function(request, reply) {
            reply('Hello, world!');
        }
    });
};

export {HomeRoute};
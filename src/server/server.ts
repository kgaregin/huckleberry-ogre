'use strict';
import Hapi, {ServerOptions} from 'hapi';
import inert from 'inert';
import {HomeRoute} from './routes/home';
import {BlogRoute} from './routes/blog';
import {FilesRoute} from './routes/files';
import {SERVER_PORT} from '../config';

/**
 * Hapi server options.
 */
const serverOptions: ServerOptions = {
    port: SERVER_PORT,
    host: 'localhost',
    routes: {
        cors: true
    }
};

/**
 * Hapi server instance.
 */
export const server = new Hapi.Server(serverOptions);

/**
 * Server starter.
 */
const start = async () => {
    await server.start();
    const cyanString = '\x1b[36m%s\x1b[0m';
    console.log(cyanString, `\nServer running at: ${server.info.uri}\n`);
};

/**
 * Registering plugins and routes.
 */
server.register(inert).then(
    () => {
        HomeRoute(server);
        BlogRoute(server);
        FilesRoute(server);

        start();
    },
    err => console.log(err)
);

/**
 * Catching errors.
 */
process.on('unhandledRejection', (err) => {
    console.log(err);
});

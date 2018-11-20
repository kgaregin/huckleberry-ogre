'use strict';
import Hapi, {ServerOptions} from 'hapi';
import {plugin as Bell} from 'bell';
import inert from 'inert';
import {HomeRoute} from './routes/home';
import {BlogRoute} from './routes/blog';
import {FilesRoute} from './routes/files';
import {SERVER_HOSTNAME, SERVER_PORT} from '../config';
import {LoginRoute} from './routes/login';

/**
 * Hapi server options.
 */
const serverOptions: ServerOptions = {
    port: SERVER_PORT,
    host: SERVER_HOSTNAME
};

/**
 * Hapi server instance.
 */
export const server = new Hapi.Server(serverOptions);

/**
 * Server starter.
 */
const start = async () => {
    await server.register(inert);
    await server.register(Bell);

    server.auth.strategy('google', 'bell', {
        provider: 'google',
        password: 'cookie_encryption_password_secure',
        clientId: '196556193526-arf8m6in9vtgclg3q01ov6erhccc0588.apps.googleusercontent.com',
        clientSecret: 'bjHlp0zxg4Pdo86JkC5O6Z9A',
        isSecure: false,
    });

    [HomeRoute, LoginRoute, BlogRoute, FilesRoute].forEach(route => route(server));

    await server.start();
    const cyanString = '\x1b[36m%s\x1b[0m';
    console.log(cyanString, `\nServer running at: ${server.info.uri}\n`);
};

start();

/**
 * Catching errors.
 */
process.on('unhandledRejection', (err) => {
    console.log(err);
});

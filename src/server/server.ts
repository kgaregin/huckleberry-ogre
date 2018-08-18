'use strict';
import * as Hapi from 'hapi';
import * as routes from './routes';
import * as inert from 'inert';
import {forEach} from 'lodash';
import {devServerPortNumber} from '../config';

type TRoute = (server: Hapi.Server) => void;

export const server = new Hapi.Server({
    port: devServerPortNumber,
    host: 'localhost',
    routes: {
        cors: true
    }
});

const start = async () => {
    await server.start();
    const cyanString = '\x1b[36m%s\x1b[0m';
    console.log(cyanString, `\nServer running at: ${server.info.uri}\n`);
};

server.register(inert).then(() => {
        forEach(routes, (route: TRoute) => {
            route(server);
        });

        start();
    }, err => console.log(err)
);

process.on('unhandledRejection', (err) => {
    console.log(err);
});

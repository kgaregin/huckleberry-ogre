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

// server.path(path.join(__dirname, '../dist'));

const start = async () => {
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
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

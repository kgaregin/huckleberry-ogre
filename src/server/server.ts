'use strict';
import * as Hapi from 'hapi';
import * as routes from './routes';
import * as inert from 'inert';
import * as path from 'path';
import {forEach} from 'lodash';
import {devServerPortNumber} from '../config';

const server = new Hapi.Server();

type TRoute = (server: Hapi.Server) => void;

server.connection({port: devServerPortNumber, host: 'localhost', routes: { cors: true }});

server.register(inert, (err) => {
    if (err) {
        throw err;
    }
});

server.path(path.join(__dirname, '../dist'));

forEach(routes, (route: TRoute) => {
    route(server);
});

server.start((err) => {
    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info && server.info.uri}`);
});


'use strict';
import * as Hapi from 'hapi';
import {forEach} from 'lodash';
import * as routes from './routes';
import * as inert from 'inert';
import * as path from 'path';

const server = new Hapi.Server();

server.connection({port: 3000, host: 'localhost'});

server.register(inert, (err) => {
    if (err) {
        throw err;
    }
});

server.path(path.join(__dirname, '../dist'));

forEach(routes, (route) => {
    route(server);
});

server.start((err) => {
    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info && server.info.uri}`);
});


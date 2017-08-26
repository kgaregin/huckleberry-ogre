'use strict';
import * as Hapi from 'hapi';
import {forEach} from 'lodash';
import * as routes from './routes';
const server = new Hapi.Server();
server.connection({port: 3000, host: 'localhost'});

forEach(routes,(route) => {
    route(server);
} );

server.start((err) => {
    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info && server.info.uri}`);
});


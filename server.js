'use strict';
const readDirSync = require('klaw-sync');
const Hapi = require('hapi');
const {isFunction} = require('lodash');
const server = new Hapi.Server();
server.connection({port: 3000, host: 'localhost'});

const routeDirs = readDirSync('./routes', {nodir: true});
routeDirs.forEach((routeDir) => {
    const route = require(routeDir.path);
    isFunction(route) && route(server);
} );

server.start((err) => {
    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});


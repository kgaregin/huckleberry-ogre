'use strict';
const Routes = require("./routes/index");

const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({port: 3000, host: 'localhost'});

Routes.forEach((Route) => Route(server));

server.start((err) => {
    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});

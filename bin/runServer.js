#!/usr/bin/env node

/**
 * Module dependencies.
 */

const server = require('../server');
const debug = require('debug')('express:server');
const http = require('http');

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '3000');
server.set('port', port);

/**
 * Create HTTP server.
 */

const serverInstance = http.createServer(server);

/**
 * Listen on provided port, on all network interfaces.
 */

serverInstance.listen(port);
// console.dir(`Server being listened on localhost:${port}`)
serverInstance.on('error', onError);
serverInstance.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP serverInstance "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP serverInstance "listening" event.
 */

function onListening() {
  const addr = serverInstance.address();
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

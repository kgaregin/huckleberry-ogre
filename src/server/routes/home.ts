import {Server, ServerRoute} from 'hapi';
import * as path from 'path';

const routes: ServerRoute[] = [
    {
        method: 'GET',
        path: '/',
        options: {
            files: {
                relativeTo: path.join(__dirname, '../../dist')
            }
        },
        handler: function (__, handler) {
            return handler.file('./index.html');
        }
    },
    {
        method: 'GET',
        path: '/{filename}',
        options: {
            files: {
                relativeTo: path.join(__dirname, '../files')
            }
        },
        handler: function (request, handler) {
            return handler.file(request.params.filename);
        }
    }
];

const HomeRoute = (server: Server) => server.route(routes);

export {HomeRoute};
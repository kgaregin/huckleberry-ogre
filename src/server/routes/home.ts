import {Server, ServerRoute, ResponseObject} from 'hapi';
import {memoize} from 'lodash';
import * as path from 'path';
import * as fs from 'fs';

const distDirectory = path.join(__dirname, '../../../dist');
const isFileExist = memoize(fileName => fs.existsSync(`${distDirectory}\\${fileName}`));

const routes: ServerRoute[] = [
    {
        method: 'GET',
        path: '/{pathVariable*}',
        options: {
            files: {
                relativeTo: distDirectory
            }
        },
        handler: (request, handler) => {
            const pathVariable = request.params && request.params.pathVariable;
            const fileName = pathVariable && pathVariable.substring(pathVariable.lastIndexOf('/') + 1);
            let response: symbol | ResponseObject = handler.continue;

            if (request.path.indexOf('rest') === -1) {
                if (isFileExist(fileName)) {
                    response = handler.file(`./${fileName}`);
                } else {
                    response = handler.file('./index.html');
                }
            }

            return response;
        }
    }
];

const HomeRoute = (server: Server) => server.route(routes);

export {HomeRoute};
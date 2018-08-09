import {Server, ServerRoute} from 'hapi';
import {FileActions} from '../db/actions';
import * as path from 'path';
import * as fs from 'fs';

const routes: ServerRoute[] = [
    {
        method: 'GET',
        path: '/rest/file/{filename}',
        options: {
            files: {
                relativeTo: path.join(__dirname, '../files')
            }
        },
        handler: (request, handler) => {
            return handler.file(`./${request.params.filename}`);
        }
    },
    {
        method: 'POST',
        path: '/rest/file/save',
        options: {
            payload: {
                output: 'file'
            }
        },
        handler: request => {
            //ToDo: find proper typings for files.
            const payload: any = request.payload;
            const file = payload && payload.file;

            return new Promise((resolve, reject) => {
                fs.copyFile(file.path ,`./src/server/files/${file.filename}`, err => {
                    const saveError = new Error('can\'t save file');

                    err && reject(saveError);
                    FileActions.newFile(file.filename)
                        .then(
                            () => resolve(JSON.stringify('file saved')),
                            () => reject(saveError)
                        );
                });
            });

        }
    },
];

export const FilesRoute = (server: Server) => server.route(routes);

import {Server, ServerRoute, ResponseObject} from 'hapi';
import {FileActions} from '../db/actions';
import path from 'path';
import {isEmpty} from 'lodash';
import {rename as fsRename, readFile as fsReadFile, unlink} from 'fs';
import {promisify} from 'util';
import crypto from 'crypto';

const rename = promisify(fsRename);
const readFile = promisify(fsReadFile);

const filesDirectory = path.join(__dirname, '../files');
const noop = () => {};

/**
 * Payload in case of file output.
 *
 * @prop {string} [file.filename] Filename.
 * @prop {string} [file.path] Path to locally saved file.
 */
interface IFilePayload {
    file?: {
        filename: string;
        path: string;
    }
}

/**
 * File manager routes configuration.
 */
const routes: ServerRoute[] = [
    {
        method: 'GET',
        path: '/rest/file/{id}',
        options: {
            files: {
                relativeTo: filesDirectory
            }
        },
        handler: (request, handler) => {
            const id = +request.params.id;

            return FileActions.getFile({id})
                .then(entry => {
                    if (!isEmpty(entry)) {
                        return handler.file(`./${entry.uuid}`);
                    } else {
                        return handler.continue;
                    }
                });
        }
    },
    {
        method: 'GET',
        path: '/rest/db/files/all',
        handler: (__, handler) => {
            return FileActions.getAllFiles()
                .then(entries => {
                    if (!isEmpty(entries)) {
                        return handler.response(JSON.stringify(entries));
                    }

                    return handler.continue;
                });
        }
    },
    {
        method: 'POST',
        path: '/rest/file/save',
        options: {
            payload: {
                output: 'file',
                /** 500 mb */
                maxBytes: 524288000,
                uploads: filesDirectory,
            }
        },
        handler: request => {
            const payload: IFilePayload = request.payload as object;
            const file = payload && payload.file;
            const fileName = file && file.filename;
            const savedFilePath = file && file.path;
            const uuid = savedFilePath && savedFilePath.replace(`${filesDirectory}\\`, '');
            const fileExtension = fileName && fileName.substring(fileName.lastIndexOf('.') + 1);
            const saveError = new Error('can\'t save file');
            let fileHash: string;

            return readFile(savedFilePath)
                .then(file => {
                    fileHash = crypto.createHash('sha256').update(file).digest('hex');
                    return FileActions.getFile({hash: fileHash});
                })
                .then(entry => {
                    if (isEmpty(entry)) {
                        const makeFileEntry = (uuid: string, fileName: string, fileHash: string, fileExtension?: string) =>
                            FileActions.newFile(`${uuid}${fileExtension ? `.${fileExtension}` : ''}`, fileName, fileHash)
                                .then(
                                    (entry) => JSON.stringify(entry),
                                    () => saveError
                                );

                        if (fileExtension) {
                            return rename(savedFilePath, `${savedFilePath}.${fileExtension}`).then(
                                () => makeFileEntry(uuid, fileName, fileHash, fileExtension)
                            );
                        } else {
                            return makeFileEntry(uuid, fileName, fileHash);
                        }
                    } else {
                        unlink(savedFilePath, noop);
                        return JSON.stringify(entry);
                    }
                })
                .catch(() => saveError);
        }
    },
    {
        method: 'DELETE',
        path: '/rest/file/{id}',
        handler: (request, handler) => {
            const error = new Error('can\'t delete file');
            const id = +request.params.id;
            if (id) {
                return FileActions.getFile({id}).then<ResponseObject | number>(entry => {
                    if (!isEmpty(entry)) {
                        const filePath = `${filesDirectory}/${entry.uuid}`;

                        unlink(filePath, noop);

                        return FileActions.deleteFile(id)
                    } else {
                        return handler.response(error);
                    }
                })

            } else {
                return handler.response(error);
            }
        }
    },
];

export const FilesRoute = (server: Server) => server.route(routes);

import {Server, ServerRoute} from 'hapi';
import {FileActions, PostActions} from '../db/actions';
import {isString} from 'lodash';
import * as path from 'path';
import * as fs from 'fs';

const routes: ServerRoute[] = [
    {
        method: 'GET',
        path: '/rest/blog',
        handler: (request, handler) => {
            const queryParams = request.query;
            return PostActions.getAllPosts(queryParams).then(
                (post) => handler.response(post),
                (error) => handler.response({error})
            );
        }
    },
    {
        method: 'GET',
        path: '/rest/blog/image',
        options: {
            files: {
                relativeTo: path.join(__dirname, '../files/images')
            }
        },
        handler: (__, handler) => {
            return handler.file('./Samurai_Jack.png');
        }
    },
    {
        method: 'POST',
        path: '/rest/blog/save',
        handler: request => {
            //ToDo: connect with front.
            const queryParams = request.query;
            queryParams;

            return new Promise((resolve, reject) => {
                fs.appendFile(`./src/server/files/images/${request.params.filename}`, 'data to append', 'utf8', err => {
                    const saveError = new Error("can't save file");

                    err && reject(saveError);
                    FileActions.newFile(request.params.filename)
                        .then(
                            () => resolve(JSON.stringify('file saved')),
                            () => reject(saveError)
                        )
                });
            });

        }
    },
    {
        method: 'POST',
        path: '/rest/blog',
        handler: (request, handler) => {
            const createPostOptions = `${request.payload}`;
            return PostActions.newPost(createPostOptions).then(
                (post) => handler.response(post),
                (error) => handler.response({error})
            );

        }
    },
    {
        method: 'PUT',
        path: '/rest/blog',
        handler: (request, handler) => {
            const findPostOptions = isString(request.payload) && JSON.parse(request.payload);
            return PostActions.updatePost(findPostOptions).then(
                (post) => handler.response(post),
                (error) => handler.response({error})
            );
        }
    },
    {
        method: 'DELETE',
        path: '/rest/blog',
        handler: (request, handler) => {
            const findPostOptions = isString(request.payload) && JSON.parse(request.payload);
            const id = findPostOptions && findPostOptions.id;
            if (id) {
                return PostActions.deletePost(id).then(
                    (post) => handler.response(`${post}`),
                    (error) => handler.response({error})
                );
            } else {
                return handler.response(new Error('post id must be supplied to perform removal'));
            }
        }
    }
];

const BlogRoute = (server: Server) => server.route(routes);

export {BlogRoute};

import {Server, ServerRoute} from 'hapi';
import {PostActions} from '../db/actions/blog/post';
import {isString} from 'lodash';
import * as path from 'path';

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

import {Server, ServerRoute} from 'hapi';
import {PostActions} from '../db/actions';
import {isString} from 'lodash';

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

export const BlogRoute = (server: Server) => server.route(routes);

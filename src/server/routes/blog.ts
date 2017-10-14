import {Server} from 'hapi';
import {PostActions} from '../db/actions/blog/post';
import {isString} from 'lodash';

const BlogRoute = (server: Server) => {

    server.route({
        method: 'GET',
        path: '/rest/blog',
        handler: (request, reply) => {
            const queryParams = request.query;
            PostActions.getAllPosts(queryParams).then(
                (post) => reply(post),
                (error) => reply({error})
            );
        }
    });

    server.route({
        method: 'POST',
        path: '/rest/blog',
        handler: (request, reply) => {
            const createPostOptions = request.payload;
            PostActions.newPost(createPostOptions).then(
                (post) => reply(post),
                (error) => reply({error})
            )

        }
    });

    server.route({
        method: 'PUT',
        path: '/rest/blog',
        handler: (request, reply) => {
            const findPostOptions = isString(request.payload) && JSON.parse(request.payload);
            PostActions.updatePost(findPostOptions).then(
                (post) => reply(post),
                (error) => reply({error})
            )
        }
    });

    server.route({
        method: 'DELETE',
        path: '/rest/blog',
        handler: (request, reply) => {
            const findPostOptions = isString(request.payload) && JSON.parse(request.payload);
            const id = findPostOptions && findPostOptions.id;
            if (id) {
                PostActions.deletePost(id).then(
                    (post) => reply(post),
                    (error) => reply({error})
                )
            } else {
                reply(new Error('post id must be supplied to perform removal'));
            }
        }
    });
};

export {BlogRoute};

import {Server} from 'hapi';
import {PostActions} from '../db/actions/blog/post';

const BlogRoute = (server: Server) => {

    server.route({
        method: 'GET',
        path: '/rest/blog',
        handler: (request, reply) => {
            const findPostOptions = request.query;
            PostActions.getAllPosts(findPostOptions).then(
                (post) => reply(post),
                (error) => reply({error})
            );
        }
    });

    server.route({
        method: 'POST',
        path: '/rest/blog',
        handler: (request, reply) => {
            const findPostOptions = request.query;
            PostActions.newPost(findPostOptions).then(
                (post) => reply(post),
                (error) => reply({error})
            )

        }
    });

    server.route({
        method: 'PUT',
        path: '/rest/blog',
        handler: (request, reply) => {
            const findPostOptions = request.query;
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
            const findPostOptions = request.query;
            PostActions.deletePost(findPostOptions).then(
                (post) => reply(post),
                (error) => reply({error})
            )
        }
    });
};

export {BlogRoute};

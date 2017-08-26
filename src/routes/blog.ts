import {Server} from 'hapi';
import {PostActions} from '../db/actions/blog/post';

const BlogRoute = (server: Server) => {
    server.route({
        method: 'GET',
        path: '/blog',
        handler: function (request, reply) {
            PostActions.newPost({title: 'Hello', message: 'world'}).then(
                () => console.log('new post created!'),
                (error) => console.log(error)
            );
            reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
        }
    });
};

export {BlogRoute};

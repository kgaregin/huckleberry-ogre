import {Server, ServerRoute, RequestQuery} from 'hapi';
import {PostActions} from '../db/actions';
import {isNumber, isNaN} from 'lodash';
import {IPost} from '../db/models';

/**
 * Posts request query interface.
 *
 * @prop {Partial<IPost>} [payload] Payload with options to find posts in db.
 */
interface IPostsRequestQuery {
    payload?: Partial<IPost>
}

/**
 * Blog routes configuration.
 */
const routes: ServerRoute[] = [
    {
        method: 'GET',
        path: '/rest/blog',
        handler: (request, handler) => {
            const queryParams: IPostsRequestQuery = request.query as RequestQuery;
            const findPostOptions = queryParams.payload ? JSON.parse(`${queryParams.payload}`) : {};

            return PostActions.getAllPosts(findPostOptions)
                .then(
                    (post) => handler.response(post),
                    (error) => handler.response({error})
                );
        }
    },
    {
        method: 'POST',
        path: '/rest/blog',
        handler: (request, handler) => {
            const post = JSON.parse(`${request.payload}`);

            return post ?
                PostActions.newPost(post)
                    .then(
                        (post) => handler.response(post),
                        (error) => handler.response({error})
                    ) :
                handler.close;

        }
    },
    {
        method: 'PUT',
        path: '/rest/blog',
        handler: (request, handler) => {
            const findPostOptions = JSON.parse(`${request.payload}`);

            return PostActions.updatePost(findPostOptions)
                .then(
                    (post) => handler.response(post),
                    (error) => handler.response({error})
                );
        }
    },
    {
        method: 'DELETE',
        path: '/rest/blog',
        handler: (request, handler) => {
            const payload: Partial<IPost> = JSON.parse(`${request.payload}`);
            const id = payload && +payload.id;

            if (isNumber(id) && !isNaN(id)) {
                return PostActions.deletePost(id)
                    .then(
                        (rowsAmount) => handler.response(JSON.stringify({deletedRows: rowsAmount})),
                        (error) => handler.response({error})
                    );
            } else {
                return new Error('post id must be supplied to perform removal');
            }
        }
    }
];

export const BlogRoute = (server: Server) => server.route(routes);

import {IPost} from '../../../server/db/models/blog/post';
import find from 'lodash/find';

/**
 * Get post by id.
 *
 * @param {IPost[]} posts Array of posts.
 * @param {number} postID Post identifier.
 */
export const getPost = (posts: IPost[], postID: number): IPost | undefined => {
    return find(posts, post => post.id === postID);
};
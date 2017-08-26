import {sequelize} from '../../db';
import {PostModel, IPost} from '../../models/blog/post';

const Post = sequelize.import('post', PostModel);

class PostActions {
    public static newPost(post: IPost) {
        const {title, message} = post;
        return Post.create({title, message});
    }
    // static deletePost = (title, message) => Post.destroy({title, message});
}

export {PostActions};
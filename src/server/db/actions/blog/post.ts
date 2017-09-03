import {sequelize} from '../../db';
import {PostModel, IPost} from '../../models/blog/post';

const Post = sequelize.import('post', PostModel);

class PostActions {

    public static getAllPosts(findPostOptions: IPost = {}) {
        return Post.findAll({where: findPostOptions});
    }

    public static newPost(post: IPost) {
        return Post.create(post);
    }

    public static deletePost(post: IPost) {
        const {id} = post;
        return Post.destroy({where: {id: `${id}`}})
    }

    public static updatePost(post: IPost) {
        const {id, title, message} = post;
        return Post.update({title, message}, {where: {id: `${id}`}});
    }

}

export {PostActions};
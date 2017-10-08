import {sequelize} from '../../db';
import {PostModel, IPost} from '../../models/blog/post';

const Post = sequelize.import('post', PostModel);

class PostActions {

    public static getAllPosts(queryParams: {[key: string]: any}) {
        const findPostOptions = queryParams && queryParams.payload ? JSON.parse(queryParams.payload) : {};
        return Post.findAll({where: findPostOptions});
    }

    public static newPost(post: string) {
        const {title, message} = JSON.parse(post);
        return Post.create({title, message});
    }

    public static deletePost(id: string) {
        return Post.destroy({where: {id}});
    }

    public static updatePost(post: IPost) {
        const {id, title, message} = post;
        return Post.update({title, message}, {where: {id: `${id}`}});
    }

}

export {PostActions};
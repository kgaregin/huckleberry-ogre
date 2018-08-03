import isString from 'lodash/isString';
import {sequelize} from '../../db';
import {PostModel} from '../../models/blog/post';
import {RequestQuery} from 'hapi';

const Post = sequelize.import('post', PostModel);

class PostActions {

    public static getAllPosts(queryParams: RequestQuery | string) {
        const findPostOptions = !isString(queryParams) && queryParams.payload ? JSON.parse(`${queryParams.payload}`) : {};
        return Post.findAll({where: findPostOptions});
    }

    public static newPost(post: RequestQuery | string) {
        const {title, message} = JSON.parse(`${post}`);
        return Post.create({title, message});
    }

    public static deletePost(id: RequestQuery | string) {
        return Post.destroy({where: {id: `${id}`}});
    }

    public static updatePost({id, title, message}: {id: number, title: string, message: string}) {
        return Post.update({id, title, message}, {where: {id}});
    }

}

export {PostActions};
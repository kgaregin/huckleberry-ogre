import {isString} from 'lodash';
import {Files, Posts} from './db';
import {RequestQuery} from 'hapi';

export class PostActions {

    public static getAllPosts(queryParams: RequestQuery | string) {
        const findPostOptions = !isString(queryParams) && queryParams.payload ? JSON.parse(`${queryParams.payload}`) : {};
        return Posts.findAll({where: findPostOptions});
    }

    public static newPost(post: RequestQuery | string) {
        const {title, message} = JSON.parse(`${post}`);
        return Posts.create({title, message});
    }

    public static deletePost(id: RequestQuery | string) {
        return Posts.destroy({where: {id: `${id}`}});
    }

    public static updatePost({id, title, message}: {id: number, title: string, message: string}) {
        return Posts.update({id, title, message}, {where: {id}});
    }
}

export class FileActions {

    public static getAllFiles(queryParams: RequestQuery | string) {
        const findFileOptions = !isString(queryParams) && queryParams.payload ? JSON.parse(`${queryParams.payload}`) : {};
        return Files.findAll({where: findFileOptions});
    }

    public static newFile(fileName: RequestQuery | string) {
        const name = `${fileName}`;
        return Files.create({name});
    }

    public static deleteFile(id: RequestQuery | string) {
        return Files.destroy({where: {id: `${id}`}});
    }
}


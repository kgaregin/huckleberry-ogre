import {isString} from 'lodash';
import {Files, Posts} from './db';
import {RequestQuery} from 'hapi';
import {IFile} from './models';

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

    public static updatePost({id, title, message}: { id: number, title: string, message: string }) {
        return Posts.update({id, title, message}, {where: {id}});
    }
}

export class FileActions {

    public static getFile = (findFileOptions: Partial<IFile>) => Files.findOne({where: findFileOptions});

    public static getAllFiles = () => Files.all();

    public static newFile(uuid: string, fileName: RequestQuery | string, fileHash: string) {
        const name = `${fileName}`;
        return Files.create({uuid, name, hash: fileHash});
    }

    public static deleteFile(id: number) {
        return Files.destroy({where: {id}});
    }
}


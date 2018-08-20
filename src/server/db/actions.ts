import {Files, Posts} from './db';
import {IFile, IPost} from './models';

/**
 * Actions set for Post model.
 */
export class PostActions {

    public static getAllPosts = (findPostOptions: Partial<IPost>) => Posts.findAll({where: findPostOptions});

    public static newPost = (post: Partial<IPost>) => Posts.create(post);

    public static deletePost = (id: number) => Posts.destroy({where: {id}});

    public static updatePost = (post: Partial<IPost>) => Posts.update(post, {where: {id: post.id}});
}

/**
 * Actions set for File model.
 */
export class FileActions {

    public static getFile = (findFileOptions: Partial<IFile>) => Files.findOne({where: findFileOptions});

    public static getAllFiles = () => Files.all();

    public static newFile = (uuid: string, fileName: string, fileHash: string) => Files.create({
        uuid,
        name: fileName,
        hash: fileHash
    });

    public static deleteFile = (id: number) => Files.destroy({where: {id}});
}


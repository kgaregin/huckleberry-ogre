import {Files, Posts, Users} from './db';
import {IFile, IPost, IUser} from './models';

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


/**
 * Actions set for User model.
 */
export class UserActions {

    public static getUser = (findUserOptions?: Partial<IUser>) => Users.findOne({where: findUserOptions});

    public static getAllUsers = () => Users.all();

    public static newUser = (createUserOptions: Partial<IUser>) => Users.create(createUserOptions);

    public static deleteUser = (searchParameters: Partial<IUser>) => Users.destroy({where: searchParameters});
}

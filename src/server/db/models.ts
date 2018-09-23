import {Sequelize, DataTypes, Instance} from 'sequelize';

/**
 * Common field set for any model.
 *
 * {number} id Unique identifier
 * {string} createdAt Creation timestamp.
 * {string} updatedAt Last update timestamp.
 */
export interface IModelCommonFields {
    id?: number;
    createdAt?: string;
    updatedAt?: string;
}

/**
 * Blog post model.
 *
 * {string} title Heading of post.
 * {string} message Body of post.
 */
export interface IPost extends IModelCommonFields {
    title?: string;
    message?: string;
}

/**
 * Blog post model definition.
 *
 * @param {Sequelize} sequelize Sequelize instance.
 * @param {DataTypes} dataTypes Possible data types object.
 */
export const PostModel = (sequelize: Sequelize, dataTypes: DataTypes) => sequelize.define<Instance<IPost>, IPost>(
    'post',
    {
        title: {type: dataTypes.STRING, validate: {notEmpty: true}},
        message: {type: dataTypes.TEXT, validate: {notEmpty: true}}
    }
);

/**
 * Fields of file model.
 *
 * @prop {string} name Name.
 * @prop {string} uuid Uuid.
 * @prop {string} hash Hash.
 */
export interface IFile extends IModelCommonFields {
    name: string;
    uuid: string;
    hash: string;
}

/**
 * File model definition.
 *
 * @param {Sequelize} sequelize Sequelize instance.
 * @param {DataTypes} dataTypes Possible data types object.
 */
export const FileModel = (sequelize: Sequelize, dataTypes: DataTypes) => sequelize.define<Instance<IFile>, Partial<IFile>>(
    'file',
    {
        name: {type: dataTypes.STRING, validate: {notEmpty: true}},
        uuid: {type: dataTypes.UUID, validate: {notEmpty: true}},
        hash: {type: dataTypes.STRING, validate: {notEmpty: true}}
    }
);

/**
 * User role.
 */
export enum ERole {
    ADMIN = 'ADMIN',
    USER = 'USER'
}

/**
 * Fields of user model.
 *
 * @prop {string} name User name.
 * @prop {string} email User email.
 * @prop {string} avatarURL User avatar link.
 * @prop {string} googleId Google profile id.
 * @prop {ERole} role Hash.
 */
export interface IUser extends IModelCommonFields {
    name: string;
    email: string;
    avatarURL: string;
    googleId: string;
    role: ERole;
}

/**
 * User model definition.
 *
 * @param {Sequelize} sequelize Sequelize instance.
 * @param {DataTypes} dataTypes Possible data types object.
 */
export const UserModel = (sequelize: Sequelize, dataTypes: DataTypes) => sequelize.define<Instance<IUser>, Partial<IUser>>(
    'user',
    {
        name: {type: dataTypes.STRING},
        email: {type: dataTypes.STRING},
        avatarURL: {type: dataTypes.STRING},
        googleId: {type: dataTypes.STRING},
        role: {type: dataTypes.STRING, validate: {notEmpty: true}}
    }
);
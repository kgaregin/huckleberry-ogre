import {Sequelize, DataTypes} from 'sequelize';

/**
 * Blog post model.
 *
 * {number} id Unique identifier of post.
 * {string} title Heading of post.
 * {string} message Body of post.
 * {string} createdAt Creation timestamp.
 * {string} updatedAt Last update timestamp.
 */
export interface IPost {
    id?: number,
    title?: string,
    message?: string,
    createdAt?: string,
    updatedAt?: string
}

/**
 * Blog post model definition.
 *
 * @param {Sequelize} sequelize Sequelize instance.
 * @param {DataTypes} dataTypes Possible data types object.
 */
export const PostModel = (sequelize: Sequelize, dataTypes: DataTypes) => sequelize.define(
    'post',
    {
        title: {type: dataTypes.STRING, validate: {notEmpty: true}},
        message: {type: dataTypes.TEXT, validate: {notEmpty: true}}
    }
);

/**
 * File model definition.
 * ToDo: add hash field to search for duplicates.
 *
 * @param {Sequelize} sequelize Sequelize instance.
 * @param {DataTypes} dataTypes Possible data types object.
 */
export const FileModel = (sequelize: Sequelize, dataTypes: DataTypes) => sequelize.define(
    'file',
    {
        name: {type: dataTypes.STRING, validate: {notEmpty: true}}
    }
);

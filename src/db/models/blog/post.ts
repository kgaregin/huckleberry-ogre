import {Sequelize, DataTypes} from 'sequelize';

export interface IPost {
    id?: number,
    title?: string,
    message?: string,
    createdAt?: string,
    updatedAt?: string
}

const PostModel = (sequelize: Sequelize, DataTypes: DataTypes) => sequelize.define(
    'post',
    {
        title: {type: DataTypes.STRING, validate: {notEmpty: true}},
        message: {type: DataTypes.TEXT, validate: {notEmpty: true}}
    }
);

export {PostModel};
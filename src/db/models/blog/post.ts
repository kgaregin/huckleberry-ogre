import {Sequelize, DataTypes} from 'sequelize';

export interface IPost {title: string, message: string};

const PostModel = (sequelize: Sequelize, DataTypes: DataTypes) => sequelize.define(
    'post',
    {
        title: {type: DataTypes.STRING, validate: {notEmpty: true}},
        message: {type: DataTypes.TEXT, validate: {notEmpty: true}}
    }
);

export {PostModel};
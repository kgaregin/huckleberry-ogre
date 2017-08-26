"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
var PostModel = function (sequelize, DataTypes) { return sequelize.define('post', {
    title: { type: DataTypes.STRING, validate: { notEmpty: true } },
    message: { type: DataTypes.TEXT, validate: { notEmpty: true } }
}); };
exports.PostModel = PostModel;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = require("../../db");
var post_1 = require("../../models/blog/post");
var Post = db_1.sequelize.import('post', post_1.PostModel);
var PostActions = (function () {
    function PostActions() {
    }
    PostActions.newPost = function (post) {
        var title = post.title, message = post.message;
        return Post.create({ title: title, message: message });
    };
    return PostActions;
}());
exports.PostActions = PostActions;

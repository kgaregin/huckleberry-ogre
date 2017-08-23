const sequelize = require('../../db');
const Post = sequelize.import('../../models/blog/post');

class PostActions {
    static newPost(post) {
        const {title, message} = post;
        return Post.create({title, message});
    }
    // static deletePost = (title, message) => Post.destroy({title, message});
}

module.exports = PostActions;
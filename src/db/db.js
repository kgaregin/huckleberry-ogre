const Sequelize = require('sequelize');
const config = require('./config');
const {
    host, port, name, user, password, dialect
} = config.db.remote;

const sequelize = new Sequelize(name, user, password, {
    host, port, dialect
});

sequelize.import('./models/blog/post');

sequelize.sync().then(() => {

    console.log(`db synchronised successful`);
}).catch(error => {
    console.log(`db synchronise error: ${error}`)
});

module.exports = sequelize;

const PostActions = new require('./actions/blog/post');

PostActions.newPost({title: 'Hello', message: 'world'}).then(
    () => console.log('new post created!'),
    (error) => console.log(error)
);

import * as Sequelize from 'sequelize';
import {config} from './config';
import {PostModel} from './models/blog/post'

const {
    host, port, name, user, password, dialect
} = config.db.remote;

const sequelize = new Sequelize(name, user, password, {
    host, port, dialect
});

sequelize.import('post', PostModel);

sequelize.sync().then(() => {

    console.log(`db synchronised successful`);
}).catch(error => {
    console.log(`db synchronise error: ${error}`)
});

export {sequelize};


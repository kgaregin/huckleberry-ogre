import * as Sequelize from 'sequelize';
import {DB_CONNECTION_OPTIONS} from './config';
import {PostModel} from './models/blog/post'

const sequelize = new Sequelize(DB_CONNECTION_OPTIONS);

sequelize.import('post', PostModel);

sequelize.sync().then(() => {

    console.log(`db synchronised successful`);
}).catch((error: string) => {
    console.log(`db synchronise error: \n\n${error}`)
});

export {sequelize};


import Sequelize from 'sequelize';
import {DB_CONNECTION_OPTIONS} from './config';
import {PostModel, FileModel, IFile} from './models';

const sequelize = new Sequelize(DB_CONNECTION_OPTIONS);

export const Posts = sequelize.import('post', PostModel);
export const Files = sequelize.import<IFile, Partial<IFile>>('file', FileModel);

sequelize.sync()
    .then(
        () => console.log(`db synchronised successful`),
        (error: string) => console.log(`db synchronise error: \n\n${error}`)
    );

export {sequelize};


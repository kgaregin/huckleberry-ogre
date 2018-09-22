import Sequelize, {Instance} from 'sequelize';
import {DB_CONNECTION_OPTIONS} from './config';
import {PostModel, FileModel, UserModel, IFile, IPost, IUser} from './models';

const sequelize = new Sequelize(DB_CONNECTION_OPTIONS);

export const Posts = sequelize.import<Instance<IPost>, IPost>('post', PostModel);
export const Files = sequelize.import<Instance<IFile>, Partial<IFile>>('file', FileModel);
export const Users = sequelize.import<Instance<IUser>, Partial<IUser>>('user', UserModel);

sequelize.sync()
    .then(
        () => console.log(`db synchronised successful`),
        (error: string) => console.log(`db synchronise error: \n\n${error}`)
    );

export {sequelize};


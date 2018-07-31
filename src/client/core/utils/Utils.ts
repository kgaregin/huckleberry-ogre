import isEmpty from 'lodash/isEmpty';
import pickBy from 'lodash/pickBy';
import {IAppState} from '../reduxStore';
import {AnyAction} from 'redux';
import {ThunkAction} from 'redux-thunk';

/** Running mode */
export const IS_DEVELOPMENT = process.env.NODE_ENV !== 'production';

/** Common interfaces for typical thunk actions. */
export type TAsyncAction = ThunkAction<Promise<Response>, IAppState, void, AnyAction>;
export type TReturnVoidAction = ThunkAction<void, IAppState, void, AnyAction>;

/**
 * Common interface for any collection.
 */
interface ICollection {
    [key: string]: any
}

/**
 * Removes fields with empty values from collection.
 *
 * @param {ICollection} collection Collection.
 */
export const removeEmptyFields = (collection: ICollection) => pickBy(collection, (element: any) => !isEmpty(element));
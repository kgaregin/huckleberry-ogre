import isEmpty from 'lodash/isEmpty';
import pickBy from 'lodash/pickBy';

/** Running mode */
export const IS_DEVELOPMENT = process.env.NODE_ENV !== 'production';

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
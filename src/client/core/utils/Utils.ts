import {push} from 'react-router-redux';
import {history, store} from '../reduxStore';

/** Running mode */
export const IS_DEVELOPMENT = process.env.NODE_ENV !== 'production';

/**
 * Handle redirect on new location for react-router.
 * @param {string} newLocation Location relative path.
 */
export const handleLocationChange = (newLocation: string) => {
    history.location.pathname !== newLocation && store.dispatch(push(newLocation));
};
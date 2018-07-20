import {push} from 'react-router-redux';
import {history} from '../reduxStore';

/**
 * Workaround for TS compiler.
 * ToDo: maybe no need for this one any more, check it out.
 */
export function mergeProps(stateProps: Object, dispatchProps: Object, ownProps: Object) {
    return {...ownProps, ...stateProps, ...dispatchProps};
}

/** Running mode */
export const IS_DEVELOPMENT = process.env.NODE_ENV !== 'production';

/**
 * Handle redirect on new location for react-router.
 * @param {string} newLocation
 * @returns {Object}
 */
export const handleLocationChange = (newLocation: string) => {
    history.location.pathname !== newLocation && push(newLocation);
};
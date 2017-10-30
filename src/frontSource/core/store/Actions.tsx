import {push} from 'react-router-redux'
import {history, store} from "./reduxStore";
/** Application layer common actions */

/**
 * Action types.
 */
export const LOCATION_CHANGE = 'LOCATION_CHANGE';

/**
 * Handle redirect on new location for react-router.
 * @param {string} newLocation
 * @returns {Object}
 */
export function handleLocationChange(newLocation: string) {
    if (history.location.pathname !== newLocation) store.dispatch(push(newLocation));

    return {
        type: LOCATION_CHANGE
    }
}




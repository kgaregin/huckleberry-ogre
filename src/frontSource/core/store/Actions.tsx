import * as React from "react";
import {withRouter} from "react-router-dom"
import {history} from "../components/Navigation"

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
    if (history.location.pathname !== newLocation) history.push(newLocation);

    return {
        type: LOCATION_CHANGE
    }
}




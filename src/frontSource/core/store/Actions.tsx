import * as React from "react";
import {withRouter} from "react-router-dom"
import {History} from "history";

/** Application layer common actions */

/**
 * Action types.
 */
export const LOCATION_CHANGE = 'LOCATION_CHANGE';

/**
 * Handle redirect on new location for react-router.
 * @param history
 * @param {string} newLocation
 * @returns {Object}
 * ToDo extract handleLocationChange action from blog to app layer
 */
export function handleLocationChange(history: History ,newLocation: string) {
    history.push(newLocation);
    return {
        type: LOCATION_CHANGE
    }
}




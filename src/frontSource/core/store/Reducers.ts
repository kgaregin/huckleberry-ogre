import {Reducer} from "redux";
import { LOCATION_CHANGE} from './Actions'

export interface ICommonState{

}

/**
 * Initial state.
 */
export const initialState: { state: ICommonState } = {
    get state() {
        return {

        };
    }
};

/**
 * Application layer (common) reducer.
 */
export const commonReducer: Reducer<ICommonState> = (state: ICommonState = initialState.state, action) => {
    switch (action.type) {
        case LOCATION_CHANGE:
        default:
            return state;
    }
};
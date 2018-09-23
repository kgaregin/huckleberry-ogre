import {Reducer} from 'redux';
import {
    LOGIN_EXIT,
    LOGIN_SET_USER
} from './Actions';
import {ILoginStateProps} from './Login';

/**
 * Initial user state.
 */
export const initLoginState: ILoginStateProps = {
    user: null
};

/**
 * Login reducer.
 */
export const loginState: Reducer<ILoginStateProps> = (state: ILoginStateProps = initLoginState, action) => {
    switch (action.type) {
        case LOGIN_SET_USER:
            return {
                ...state,
                user: action.payload
            };
        case LOGIN_EXIT:
            return {
                ...state,
                user: null
            };
        default:
            return state;
    }
};
import {Action} from 'redux';
import {IAppState} from '../../core/reduxStore';
import {ThunkDispatch} from 'redux-thunk';
import {IUser} from '../../../server/db/models';
import {SERVER_REST_ADDRESS} from "../../../config";

/**
 * Action types.
 */
export const LOGIN_SET_USER = 'LOGIN_SET_USER';
export const LOGIN_EXIT = 'LOGIN_EXIT';

/**
 * Blog actions.
 */
export class LoginActions {
    constructor(private dispatch: ThunkDispatch<IAppState, void, Action>) {
    }

    /**
     * Starts handshaking with Google.
     */
    startLoginWithGoogle = () => {
        window.location.href = `${SERVER_REST_ADDRESS}/login/google?redirectTo=${window.location.pathname}`;
    };

    /**
     * Sets user settings received from server.
     *
     * @param {IUser} user User settings.
     */
    setUser = (user: IUser) => {
        this.dispatch({
            type: LOGIN_SET_USER,
            payload: user
        });
    };

    /**
     * Handles user logout.
     */
    logOut = () => {
        this.dispatch({type: LOGIN_EXIT});
        localStorage.removeItem('user');
    }

}

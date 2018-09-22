import {Action} from 'redux';
import {IAppState} from '../../core/reduxStore';
import {ThunkDispatch} from 'redux-thunk';

/**
 * Action types.
 */
export const LOGIN_WITH_GOOGLE = 'LOGIN_WITH_GOOGLE';

/**
 * Blog actions.
 */
export class LoginActions {
    constructor(private dispatch: ThunkDispatch<IAppState, void, Action>) {
    }

    /**
     * Log in with Google.
     */
    handleLoginWithGoogle = () => {
        this.dispatch({type: LOGIN_WITH_GOOGLE});
        window.location.href = `http://localhost:3001/rest/login/google?redirectTo=${window.location.pathname}`;
    };

}

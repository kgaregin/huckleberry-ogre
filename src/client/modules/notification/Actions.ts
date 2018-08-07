import {IAppState} from '../../core/reduxStore';
import {ENotificationVariant} from './Notification';
import {ThunkDispatch} from 'redux-thunk';
import {Action} from 'redux';

/**
 * Action types.
 */
export const NOTIFICATION_SHOW = 'NOTIFICATION_SHOW';
export const NOTIFICATION_CLOSE = 'NOTIFICATION_CLOSE';

/**
 * Notification interface.
 *
 * @prop {ENotificationVariant} [variant] Notification variant. Info by default.
 * @prop {string} message Message.
 */
interface INotification {
    message: string;
    variant?: ENotificationVariant;
}

/**
 * Blog actions.
 */
export class NotificationActions {
    constructor(private dispatch: ThunkDispatch<IAppState, void, Action>) {
    }
    /**
     * Show notification.
     *
     * @param {string} message Message.
     * @param {ENotificationVariant} [variant] Notification variant.
     */
    show = ({message, variant}: INotification) => this.dispatch({
        type: NOTIFICATION_SHOW,
        payload: {message, variant: variant || ENotificationVariant.INFO}
    });

    /**
     * Close notification.
     */
    close = () => this.dispatch({type: NOTIFICATION_CLOSE});

}

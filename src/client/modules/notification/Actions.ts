import {store} from '../../core/reduxStore';
import {ENotificationVariant} from './Notification';

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

    /**
     * Show notification.
     *
     * @param {string} message Message.
     * @param {ENotificationVariant} [variant] Notification variant.
     */
    static show = ({message, variant}: INotification) => store.dispatch({
        type: NOTIFICATION_SHOW,
        payload: {message, variant: variant || ENotificationVariant.INFO}
    });

    /**
     * Close notification.
     */
    static close = () => store.dispatch({type: NOTIFICATION_CLOSE});

}

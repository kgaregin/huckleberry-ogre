import {Reducer} from 'redux';
import {NOTIFICATION_SHOW, NOTIFICATION_CLOSE} from './Actions';
import {ENotificationVariant, INotificationStateProps} from './Notification';

/**
 * Initial blog state.
 */
export const initNotificationState: INotificationStateProps = {
    show: false,
    variant: ENotificationVariant.INFO,
    message: ''
};

/**
 * Blog reducer.
 */
export const notificationState: Reducer<INotificationStateProps> = (state: INotificationStateProps = initNotificationState, action) => {
    switch (action.type) {
        case NOTIFICATION_SHOW:
            return {
                ...state,
                show: true,
                message: action.payload.message,
                variant: action.payload.variant
            };
        case NOTIFICATION_CLOSE:
            return {
                ...state,
                show: false
            };
        default:
            return state;
    }
};
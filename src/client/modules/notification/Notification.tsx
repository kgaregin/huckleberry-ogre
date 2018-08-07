import * as React from 'react';
import {SnackbarContent, Snackbar, WithStyles} from '@material-ui/core';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import {NotificationActions} from './Actions';
import {styles} from '../../styles/modules/Notification';
import {HOC} from '../../core/utils/HOC';
import {IAppState} from '../../core/reduxStore';
import {ThunkDispatch} from 'redux-thunk';
import {Action} from 'redux';

/**
 * @prop {boolean} show Rendering flag.
 * @prop {ENotificationVariant} variant Notification variant. Info by default.
 * @prop {string} message Message.
 */
export interface INotificationStateProps {
    show: boolean;
    variant: ENotificationVariant;
    message: string;
}

/**
 * Notification variant.
 */
export enum ENotificationVariant {
    SUCCESS = 'success',
    WARNING = 'warning',
    ERROR = 'error',
    INFO = 'info'
}

type TStyleProps = WithStyles<typeof styles>;

/**
 * Notification component class.
 */
class NotificationComponent extends React.Component<INotificationStateProps & TStyleProps & TDispatchProps> {

    /**
     * Message renderer.
     */
    renderMessage = () => {
        const {variant, message, classes} = this.props;
        const variantIcon = {
            success: CheckCircleIcon,
            warning: WarningIcon,
            error: ErrorIcon,
            info: InfoIcon,
        };
        const Icon = variantIcon[variant];

        return (
            <span className={classes.message}>
                <Icon className={classes.icon}/>
                <span className={classes.messageText}>{message}</span>
            </span>
        );
    };

    render() {
        const {show, classes, variant, actions} = this.props;

        return (
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                onClose={actions.close}
                open={show}
            >
                <SnackbarContent
                    className={classes[variant]}
                    message={this.renderMessage()}
                />
            </Snackbar>
        );
    }
}

const mapStateToProps = (state: IAppState) => state.notificationState;

const mapDispatchToProps = (dispatch: ThunkDispatch<IAppState, void, Action>) => {
    return {
        actions: new NotificationActions(dispatch)
    };
};

type TDispatchProps = { actions: NotificationActions };

export const Notification = HOC<INotificationStateProps, TDispatchProps, TStyleProps, {}>(
    NotificationComponent,
    {
        mapStateToProps,
        mapDispatchToProps,
        styles
    }
);
import React from 'react';
import {Avatar, IconButton, WithStyles, Tooltip} from '@material-ui/core';
import {styles} from '../../styles/modules/Login';
import {HOC} from '../../core/utils/HOC';
import {IAppState} from '../../core/reduxStore';
import {LoginActions} from './Actions';
import {ThunkDispatch} from 'redux-thunk';
import {Action} from 'redux';
import {IUser} from '../../../server/db/models';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import {NotificationActions} from "../notification/Actions";
import {ENotificationVariant} from "../notification/Notification";
import {GoogleIcon} from "../../assets/GoogleIcon";

/**
 * Login state.
 *
 * @prop {IUser} user Current user.
 */
export interface ILoginStateProps {
    user: IUser;
}

/**
 * Login component.
 */
class LoginComponent extends React.Component<ILoginStateProps & TStyleProps & TDispatchProps> {

    componentWillMount() {
        const {user, actions, notificationActions} = this.props;
        const storedUser = localStorage.getItem('user');

        if (!user && storedUser) {
            try {
                actions.setUser(JSON.parse(storedUser));
            } catch (e) {
                notificationActions.show({
                    message: 'Can\'t login with stored user, most likely parsing failure. Try login manually.',
                    variant: ENotificationVariant.WARNING
                })
            }
        }
    }

    render() {
        const {actions, user, classes} = this.props;

        return (
            <span className={classes.loginContainer}>
                {user ? (
                    <div>
                        <span className='onHoverHide'>{user.name}</span>
                        <span className='onHoverShow'>logout</span>
                        <IconButton className='margin-left-1 onHoverHide'>
                            <Avatar src={user.avatarURL}/>
                        </IconButton>
                        <IconButton className='margin-left-1 onHoverShow logoutIcon' onClick={actions.logOut}>
                            <PowerSettingsNewIcon/>
                        </IconButton>
                    </div>
                ) : (
                    <Tooltip title='login via Google'>
                        <IconButton onClick={actions.startLoginWithGoogle}>
                            <AccountCircleIcon className='onHoverHide accountCircleIcon'/>
                            <GoogleIcon className='onHoverShow googleIcon'/>
                        </IconButton>
                    </Tooltip>
                )}
            </span>
        )
    }
}

const mapStateToProps = (state: IAppState) => state.loginState;

const mapDispatchToProps = (dispatch: ThunkDispatch<IAppState, void, Action>) => {
    return {
        actions: new LoginActions(dispatch),
        notificationActions: new NotificationActions(dispatch)
    };
};

type TDispatchProps = {
    actions: LoginActions,
    notificationActions: NotificationActions
};
type TStyleProps = WithStyles<typeof styles>;

export const Login = HOC<ILoginStateProps, TDispatchProps, TStyleProps, {}>(
    LoginComponent,
    {
        mapStateToProps,
        mapDispatchToProps,
        styles
    }
);

import React from 'react';
import {MuiThemeProvider, Grid, Paper, WithStyles} from '@material-ui/core';
import {theme} from '../Theme';
import {styles} from '../styles/components/GlobalLayout';
import {preventDefaultDragNDropEvents} from '../modules/dropZone/Utils';
import {DropZone} from '../modules/dropZone/DropZone';
import {HOC} from '../core/utils/HOC';
import {IAppState, navigateTo} from '../core/reduxStore';
import {DropZoneActions} from '../modules/dropZone/Actions';
import {ThunkDispatch} from 'redux-thunk';
import {Action} from 'redux';
import {EBlogViewMode} from '../modules/blog/Enums';
import RouteParser from 'route-parser';
import {Location} from 'history';
import {BlogActions} from '../modules/blog/Actions';
import {RouteComponentProps} from 'react-router-dom';
import {get as getCookie, erase as removeCookie} from 'browser-cookies';
import {Base64} from 'js-base64';
import {ENotificationVariant} from "../modules/notification/Notification";
import {LoginActions} from "../modules/login/Actions";
import {NotificationActions} from "../modules/notification/Actions";

/**
 * @prop {JSX.Element} children React children not provided by default.
 */
interface IProps extends TStyleProps, TDispatchProps, TRouteProps {
    children: JSX.Element;
}

/**
 * First layer component.
 */
class GlobalLayoutComponent extends React.Component<IProps> {

    constructor(props: IProps) {
        super(props);
        const {history} = this.props;
        this.handleLocationChange(history.location);
        history.listen(location => this.handleLocationChange(location));
    }

    componentWillMount() {
        preventDefaultDragNDropEvents();
    }

    /**
     * Location change handler.
     *
     * @param {Location} location Location object.
     */
    handleLocationChange = (location: Location) => {
        const {blogActions, dropZoneActions, loginActions, notificationActions} = this.props;
        const newLocation = getCookie('redirectTo');
        const user = getCookie('user');
        const pathName = newLocation && Base64.decode(newLocation) || location.pathname;
        const blogPageRoute = new RouteParser('/blog(/:mode)(/:postID)');
        const blogPageRouteMatch = blogPageRoute.match(pathName);

        let isDropZoneEnabled = false;

        if (user) {
            try {
                const decodedUser = Base64.decode(user);
                loginActions.setUser(JSON.parse(decodedUser));
                localStorage.setItem('user', decodedUser);
                removeCookie('user', {path: 'rest/login'});
            } catch (exception) {
                notificationActions.show({
                    message: 'Can\'t log in, check console for errors',
                    variant: ENotificationVariant.ERROR
                });
                console.log(exception)
            }
        }

        if (newLocation) {
            //toDo: find out why cookie doesn't deletes if path is not given...
            //toDo: find other approach, this way is too dangerous :\
            removeCookie('redirectTo', {path: 'rest/login'});
            if (getCookie('redirectTo')) {
                notificationActions.show({
                    message: 'Trying to delete cookie manually to avoid errors.',
                    variant: ENotificationVariant.WARNING
                });
                document.cookie = 'redirectTo=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
            }
            navigateTo(Base64.decode(newLocation));
        }


        if (blogPageRouteMatch) {
            blogActions.requestBlogPosts().then(() => {
                if (blogPageRouteMatch.mode === EBlogViewMode.EDIT && blogPageRouteMatch.postID) {
                    blogActions.fillPostEditForm(+blogPageRouteMatch.postID);
                }
            });
            if (blogPageRouteMatch.mode === EBlogViewMode.EDIT || blogPageRouteMatch.mode === EBlogViewMode.CREATE) {
                isDropZoneEnabled = true;
            }
        }

        isDropZoneEnabled ? dropZoneActions.enable() : dropZoneActions.disable();
    };

    render() {
        const {classes, children, dropZoneActions} = this.props;

        return (
            <MuiThemeProvider theme={theme}>
                <div>
                    <DropZone/>
                    <Grid container onDragEnter={dropZoneActions.handleDragEnter}>
                        <Paper className={classes.mainPaper} square>
                            {children}
                        </Paper>
                    </Grid>
                </div>
            </MuiThemeProvider>
        );
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<IAppState, void, Action>) => {
    return {
        blogActions: new BlogActions(dispatch),
        dropZoneActions: new DropZoneActions(dispatch),
        loginActions: new LoginActions(dispatch),
        notificationActions: new NotificationActions(dispatch)
    };
};

type TRouteProps = RouteComponentProps<{ mode: EBlogViewMode, postID: string }>;
type TDispatchProps = {
    blogActions: BlogActions,
    dropZoneActions: DropZoneActions,
    loginActions: LoginActions,
    notificationActions: NotificationActions
}
type TStyleProps = WithStyles<typeof styles>;

export const GlobalLayout = HOC<{}, TDispatchProps, TStyleProps, TRouteProps>(
    GlobalLayoutComponent,
    {
        mapStateToProps: null,
        mapDispatchToProps,
        styles,
        isWithRouter: true
    }
);
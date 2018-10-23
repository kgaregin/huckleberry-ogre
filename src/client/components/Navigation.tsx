import React from 'react';
import {
    AppBar,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
    WithStyles,
} from '@material-ui/core';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import BlurOnIcon from '@material-ui/icons/BlurOn';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import {styles} from '../styles/components/Navigation';
import classNames from 'classnames';
import {Link, Route, RouteComponentProps, Switch} from 'react-router-dom';
import {Blog} from '../modules/blog/Blog';
import {EBlogViewMode} from '../modules/blog/Enums';
import {ErrorBoundary} from './ErrorBoundary';
import {IAppState, navigateTo} from '../core/reduxStore';
import Samurai_Jack from '../assets/Samurai_Jack.png';
import {Notification} from '../modules/notification/Notification';
import {BlogActions} from '../modules/blog/Actions';
import {HOC} from '../core/utils/HOC';
import {ThunkDispatch} from 'redux-thunk';
import {Action} from 'redux';
import {DropZoneActions} from '../modules/dropZone/Actions';
import {LoginActions} from '../modules/login/Actions';
import {Login} from '../modules/login/Login';
import {NotificationActions} from '../modules/notification/Actions';
import {ElectricForceField} from '../modules/electricForceField/electricForceField';

/**
 * Navigation component properties.
 */
type TProps = TDispatchProps & TRouteProps & TStyleProps;

/**
 * @prop {boolean} isDrawerOpen Drawer open flag.
 */
interface IState {
    isDrawerOpen: boolean;
}

/**
 * Navigation component.
 */
class NavigationComponent extends React.Component<TProps, IState> {

    state: IState = {
        isDrawerOpen: false,
    };

    /**
     * Drawer open handler.
     */
    handleDrawerOpen = () => {
        this.setState({isDrawerOpen: true});
    };

    /**
     * Drawer close handler.
     */
    handleDrawerClose = () => {
        this.setState({isDrawerOpen: false});
    };

    /**
     * Menu link click handler.
     */
    handleListItemClick = (newLocation: string = '/') => {
        this.handleDrawerClose();
        navigateTo(newLocation);
    };

    /**
     * Menu list rendering.
     */
    getNavigationList = () => {
        const {classes} = this.props;

        return (
            <List className={classes.list}>
                <ListItem
                    className={classes.listItem}
                    onClick={() => this.handleListItemClick('/blog')}
                >
                    <ListItemIcon>
                        <BorderColorIcon/>
                    </ListItemIcon>
                    <ListItemText className={classes.listItemText} primary="Blog"/>
                </ListItem>
                <Divider/>
                <ListItem
                    className={classes.listItem}
                    onClick={() => this.handleListItemClick('/electricForceField')}
                >
                    <ListItemIcon>
                        <BlurOnIcon/>
                    </ListItemIcon>
                    <ListItemText className={classes.listItemText} primary="Electric force field app"/>
                </ListItem>
                <Divider/>
            </List>
        );
    };

    render() {
        const {classes, location:{pathname}} = this.props;
        const {isDrawerOpen} = this.state;
        const isElectricForceFieldPage = pathname === '/electricForceField';
        const mainClassName = classNames(classes.content, {
                [classes.contentShift]: isDrawerOpen,
                'padding-0 overflowHidden': isElectricForceFieldPage
            }
        );

        return (
            <ErrorBoundary>
                <div className={classes.root}>
                    <div className={classes.appFrame}>
                        <AppBar className={classNames(classes.appBar, isDrawerOpen && classes.appBarShift)}>
                            <Toolbar className={classes.toolbar} disableGutters={!isDrawerOpen}>
                                <IconButton
                                    className={classNames(classes.menuButton, isDrawerOpen && classes.hide)}
                                    color="primary"
                                    aria-label="open drawer"
                                    onClick={this.handleDrawerOpen}
                                >
                                    <MenuIcon/>
                                </IconButton>
                                <Typography
                                    variant="title"
                                    className={classNames(classes.homeButton, isDrawerOpen && classes.homeButtonShift)}
                                >
                                    <Link to="/" onClick={this.handleDrawerClose}>
                                        {'Huckleberry Ogre Home'}
                                    </Link>
                                </Typography>
                                <Login/>
                            </Toolbar>
                        </AppBar>
                        <Drawer
                            variant="persistent"
                            classes={{
                                paper: classes.drawerPaper,
                                docked: classes.drawerDocked
                            }}
                            open={isDrawerOpen}
                        >
                            <div>
                                <div className={classes.drawerHeader}>
                                    <IconButton onClick={this.handleDrawerClose}>
                                        <ChevronLeftIcon/>
                                    </IconButton>
                                </div>
                                <Divider/>
                                {this.getNavigationList()}
                            </div>
                        </Drawer>
                        <main className={mainClassName} onClick={this.handleDrawerClose}>
                            <Switch>
                                <Route exact path="/" component={Blog}/>
                                <Route path="/blog/:mode?/:postID?" component={Blog}/>
                                <Route path="/electricForceField" component={ElectricForceField}/>
                                <Route render={() => (
                                    <div className='text-center'>
                                        <h1>404 :\</h1>
                                        <h3>This page is totally lost!</h3>
                                        <img src={Samurai_Jack} alt="just like Jack..."/>
                                    </div>
                                )}
                                />
                            </Switch>
                            <Notification/>
                        </main>
                    </div>
                </div>
            </ErrorBoundary>
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

type TDispatchProps = {
    blogActions: BlogActions,
    dropZoneActions: DropZoneActions,
    loginActions: LoginActions,
    notificationActions: NotificationActions
}
type TRouteProps = RouteComponentProps<{ mode: EBlogViewMode, postID: string }>;
type TStyleProps = WithStyles<typeof styles>;

export const Navigation = HOC<{}, TDispatchProps, TStyleProps, TRouteProps>(
    NavigationComponent,
    {
        mapStateToProps: null,
        mapDispatchToProps,
        styles,
        isWithRouter: true
    });

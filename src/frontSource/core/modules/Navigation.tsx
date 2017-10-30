import * as React from "react";
import {
    AppBar,
    IconButton,
    Typography,
    Toolbar,
    Drawer,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    WithStyles,
    StyledComponentProps
} from "material-ui";
import BorderColorIcon from "material-ui-icons/BorderColor";
import MenuIcon from "material-ui-icons/Menu";
import ChevronLeftIcon from "material-ui-icons/ChevronLeft";
import withStyles from "material-ui/styles/withStyles";
import {styles} from "../../styles/core/components/Navigation";
import * as classNames from "classnames";
import Divider from "material-ui/Divider";
import {RouteComponentProps, withRouter, Route, Switch} from "react-router-dom";
import {Blog} from "../../modules/blog/Blog";
import {Dispatch, bindActionCreators} from "redux";
import {connect, MapDispatchToProps, MapStateToProps} from "react-redux";
import {handleLocationChange} from "../store/Actions";
import {ICommonState} from "../store/Reducers";
import {MODE} from "../../modules/blog/Enums";
import {requestBlogPosts} from "../../modules/blog/Actions";
import {IReduxStore} from "../store/reduxStore";
import {ErrorBoundary} from "./ErrorBoundary";

/**
 * Navigation component actions.
 */
export interface INavigationActions {
    handleLocationChange: (newLocation: string) => { type: string };
    requestBlogPosts: (id?: number, title?: string, message?: string) => (dispatch: Dispatch<null>) => Promise<void>;
}

/**
 * Navigation component properties.
 */
export interface INavigationProps {
    actions: INavigationActions,
}

/**
 * Navigation component.
 */
class NavigationComponent extends React.Component <INavigationProps & WithStyles & RouteComponentProps<{ mode: MODE }>> {
    state = {
        isDrawerOpen: false,
    };

    private handleDrawerOpen = () => {
        this.setState({isDrawerOpen: true});
    };

    private handleDrawerClose = () => {
        this.setState({isDrawerOpen: false});
    };

    private handleListItemClick = (to: string = '/') => {
        this.props.actions.handleLocationChange(to);
    };

    private getNavList = () => {
        const {classes} = this.props;

        return (
            <div>
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
                </List>
            </div>
        );
    };

    render() {
        const {classes} = this.props;
        const {isDrawerOpen} = this.state;
        const mainClassName = classNames(classes.content, {
                [classes.contentShift]: isDrawerOpen
            }
        );

        return (
            <div className={classes.root}>
                <div className={classes.appFrame}>
                    <AppBar className={classNames(classes.appBar, isDrawerOpen && classes.appBarShift)}>
                        <Toolbar className={classes.toolbar} disableGutters={!isDrawerOpen}>
                            <IconButton
                                className={classNames(classes.menuButton, isDrawerOpen && classes.hide)}
                                color="contrast"
                                aria-label="open drawer"
                                onClick={this.handleDrawerOpen}
                            >
                                <MenuIcon/>
                            </IconButton>
                            <Typography type="title" color="inherit" className={classes.flex}>
                                {'Huckleberry Ogre Home'}
                            </Typography>
                            {/*<Button color="contrast">Login</Button>*/}
                        </Toolbar>
                    </AppBar>
                    <Drawer
                        type="persistent"
                        classes={{
                            paper: classes.drawerPaper,
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
                            <List className={classes.list}>{this.getNavList()}</List>
                            <Divider/>
                        </div>
                    </Drawer>
                    <main className={mainClassName}>
                        {/*ToDo: maybe add some cool iScroll with touch events support here?*/}
                        <Grid container justify={'center'}>
                            <Grid item xl={7} lg={9} md={11} sm={12} xs={12}>
                                <ErrorBoundary>
                                    <Switch>
                                        <Route exact path="/" render={() => <h1>Main page under construction</h1>}/>
                                        <Route path="/blog/:mode?/:postID?" component={Blog}/>
                                    </Switch>
                                </ErrorBoundary>
                            </Grid>
                        </Grid>
                    </main>
                </div>
            </div>);
    }
}

const mapStateToProps: MapStateToProps<ICommonState, {}> = (state: IReduxStore) => state.commonReducer;

const mapDispatchToProps: MapDispatchToProps<{ actions: INavigationActions }, {}> = (dispatch: Dispatch<ICommonState>) => {
    return {
        actions: bindActionCreators({
            handleLocationChange,
            requestBlogPosts
        }, dispatch)
    }
};

const NavigationStyled = withStyles(styles)<INavigationProps>(NavigationComponent);

const NavigationStyledConnected = connect<{} & StyledComponentProps, INavigationProps, {}>(
    mapStateToProps,
    mapDispatchToProps
)<INavigationProps>(NavigationStyled);

const NavigationStyledConnectedWithRouter = withRouter(NavigationStyledConnected);

export {NavigationStyledConnectedWithRouter as Navigation};
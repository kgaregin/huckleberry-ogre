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
    ListItemText
} from "material-ui";
import BorderColorIcon from "material-ui-icons/BorderColor";
import MenuIcon from "material-ui-icons/Menu";
import ChevronLeftIcon from "material-ui-icons/ChevronLeft";
import withStyles from "material-ui/styles/withStyles";
import {styles} from "../../styles/core/components/Navigation";
import {IWithClasses} from "../Interfaces";
import * as classNames from "classnames";
import Divider from "material-ui/Divider";
import {RouteComponentProps, withRouter, Route} from "react-router-dom";
import {IReduxStore} from "../store/reduxStore"
import {Blog} from "../../modules/blog/Blog";
import {Dispatch, bindActionCreators} from "redux";
import {connect} from "react-redux";
import {mergeProps} from "../utils/Utils";
import {handleLocationChange} from "../store/Actions";
import {ICommonState} from "../store/Reducers";
import {History} from "history";
import {MODE} from "../../modules/blog/Enums";
import {requestBlogPosts} from "../../modules/blog/Actions";

/**
 * Kinda dirty workaround to get access to history.
 * Since "push" method from react-router-redux don't work or i can't cook it right.
 * Also react-router docs suck!
 * ToDo: find way to replace it with real solution.
 */
export let history: History;

/**
 * Navigation component actions.
 */
export interface INavigationActions {
    handleLocationChange: (newLocation: string) => (dispatch: Dispatch<null>) => Object;
    requestBlogPosts: (id?: number, title?: string, message?: string) => (dispatch: Dispatch<null>) => Promise<{ type: string, reason: string } | { type: string, responseValue: Response }>;
}

/**
 * Navigation component properties.
 */
export interface INavigationProps extends IWithClasses, RouteComponentProps<{}> {
    actions: INavigationActions,
    locationPathname: string;
}

/**
 * Navigation component.
 */
class NavigationComponent extends React.Component <INavigationProps> {
    state = {
        isDrawerOpen: false,
    };

    componentDidMount() {
        history = this.props.history;
    }

    private handleDrawerOpen = () => {
        this.setState({isDrawerOpen: true});
    };

    private handleDrawerClose = () => {
        this.setState({isDrawerOpen: false});
    };

    private handleListItemClick = (to: string = '/') => {
        this.props.actions.handleLocationChange(to)
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

        return (
            <div className={classes.root}>
                <div className={classes.appFrame}>
                    <AppBar className={classNames(classes.appBar, this.state.isDrawerOpen && classes.appBarShift)}>
                        <Toolbar className={classes.toolbar} disableGutters={!this.state.isDrawerOpen}>
                            <IconButton
                                className={classNames(classes.menuButton, this.state.isDrawerOpen && classes.hide)}
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
                        open={this.state.isDrawerOpen}
                    >
                        <div className={classes.drawerInner}>
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
                    <main className={classNames(classes.content, this.state.isDrawerOpen && classes.contentShift)}>
                        {/*ToDo: maybe add some cool iScroll with touch events support here?*/}
                        <Grid container justify={'center'}>
                            <Grid item xl={7} lg={9} md={11} sm={12} xs={12}>
                                <Route path="/" exact={true} render={() => <h1>Main page under construction</h1>}/>
                                <Route
                                    path="/blog/:mode?/:postID?"
                                    render={(props) => {
                                        const mode = props.match.params.mode || MODE.READ;

                                        if (mode === MODE.READ) this.props.actions.requestBlogPosts();
                                        return <Blog/>
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </main>
                </div>
            </div>);
    }
}

const mapStateToProps = (state: IReduxStore) => state.commonReducer;

const mapDispatchToProps = (dispatch: Dispatch<ICommonState>) => {
    return {
        actions: bindActionCreators({
            handleLocationChange,
            requestBlogPosts
        }, dispatch)
    }
};

export const Navigation = withRouter(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps, mergeProps)(NavigationComponent)));
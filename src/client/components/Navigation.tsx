import * as React from 'react';
import {
    AppBar,
    IconButton,
    Typography,
    Toolbar,
    Drawer,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    WithStyles,
    withStyles,
} from '@material-ui/core';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import {styles} from '../styles/components/Navigation';
import * as classNames from 'classnames';
import {RouteComponentProps, withRouter, Route, Switch, Link} from 'react-router-dom';
import {Blog} from '../modules/blog/Blog';
import {EBlogViewMode} from '../modules/blog/Enums';
import {ErrorBoundary} from './ErrorBoundary';
import {handleLocationChange} from '../core/reduxStore';
import Samurai_Jack from '../assets/Samurai_Jack.png';

/**
 * Navigation component properties.
 */
interface IProps extends RouteComponentProps<{ mode: EBlogViewMode }>, WithStyles<typeof styles> {
}

/**
 * @prop {boolean} isDrawerOpen Drawer open flag.
 */
interface IState {
    isDrawerOpen: boolean;
}

/**
 * Navigation component.
 */
class NavigationComponent extends React.Component<IProps, IState> {
    state: IState = {
        isDrawerOpen: false,
    };

    private handleDrawerOpen = () => {
        this.setState({isDrawerOpen: true});
    };

    private handleDrawerClose = () => {
        this.setState({isDrawerOpen: false});
    };

    private handleListItemClick = (to: string = '/') => {
        this.handleDrawerClose();
        handleLocationChange(to);
    };

    private getNavigationList = () => {
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
            </List>
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
                                color="primary"
                                aria-label="open drawer"
                                onClick={this.handleDrawerOpen}
                            >
                                <MenuIcon/>
                            </IconButton>
                            <Typography variant="title"
                                        className={classNames(classes.homeButton, isDrawerOpen && classes.homeButtonShift)}>
                                <Link to="/" onClick={this.handleDrawerClose}>
                                    {'Huckleberry Ogre Home'}
                                </Link>
                            </Typography>
                            {/*<Button color="contrast">Login</Button>*/}
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
                        {/*ToDo: maybe add some cool iScroll with touch events support here?*/}
                        <Grid container justify={'center'}>
                            <Grid item xl={8} lg={10} md={11} sm={12} xs={12}>
                                <ErrorBoundary>
                                    <Switch>
                                        <Route exact path="/" render={() => <h1>Main page under construction</h1>}/>
                                        <Route path="/blog/:mode?/:postID?" component={Blog}/>
                                        <Route render={() => (
                                            <div className='text-center'>
                                                <h1>404 :\</h1>
                                                <h3>This page is totally lost!</h3>
                                                <img src={Samurai_Jack} alt=""/>
                                            </div>
                                        )}
                                        />
                                    </Switch>
                                </ErrorBoundary>
                            </Grid>
                        </Grid>
                    </main>
                </div>
            </div>);
    }
}

const WithRouter = withRouter<IProps>((props: IProps) => <NavigationComponent {...props}/>);
const StyledWithRouter = withStyles(styles)(props => <WithRouter {...props}/>);

export {StyledWithRouter as Navigation};

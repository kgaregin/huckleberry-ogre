import * as React from "react";
import {Link} from 'react-router-dom';
import {
    AppBar,
    IconButton,
    Typography,
    Toolbar,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText
} from "material-ui";
import MenuIcon from 'material-ui-icons/Menu';
import BorderColorIcon from 'material-ui-icons/BorderColor';
import withStyles from "material-ui/styles/withStyles";
import {styles} from "../../styles/core/components/Navigation";
import {IWithClasses} from "../Interfaces";

class NavigationComponent extends React.Component <IWithClasses> {
    state = {
        isDrawerOpen: false,
    };

    onMenuButtonClick = () => {
        this.setState({isDrawerOpen: true});
    };

    onDrawerClose = () => {
        this.setState({isDrawerOpen: false});
    };

    render() {
        const {classes} = this.props;

        const navList = (
            <div>
                <List className={classes.list}>
                    <ListItem>
                        <Link to="/">
                            <ListItemIcon>
                                <BorderColorIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Blog" />
                        </Link>
                    </ListItem>
                </List>
            </div>
        );

        return (
            <AppBar position="static">
                <Toolbar disableGutters>
                    <IconButton
                        className={classes.menuButton}
                        color="contrast"
                        aria-label="Menu"
                        onClick={this.onMenuButtonClick}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography type="title" color="inherit" className={classes.flex}>
                        {'Huckleberry Ogre Home'}
                    </Typography>
                    <Drawer
                        type={'persistent'}
                        open={this.state.isDrawerOpen}
                        onRequestClose={this.onDrawerClose}
                        onClick={this.onDrawerClose}
                    >
                        {navList}
                    </Drawer>
                    {/*<Button color="contrast">Login</Button>*/}
                </Toolbar>
            </AppBar>);
    }
}

const Navigation = withStyles(styles)(NavigationComponent);

// <Navbar inverse collapseOnSelect>
//     <Navbar.Header>
//         <Navbar.Brand>
//             <LinkContainer to="/" exact={true}>
//                 <a>Huckleberry Ogre Homepage</a>
//             </LinkContainer>
//         </Navbar.Brand>
//         <Navbar.Toggle/>
//     </Navbar.Header>
//     <Navbar.Collapse>
//         <Nav>
//             <LinkContainer to="/" exact={true}>
//                 <NavItem eventKey={1}>Blog</NavItem>
//             </LinkContainer>
//             <LinkContainer to="/blog/post/CREATE" exact={true}>
//                 <NavItem eventKey={2}>New post</NavItem>
//             </LinkContainer>
//         </Nav>
//     </Navbar.Collapse>
// </Navbar>


export {Navigation};
import * as React from "react";
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

const Navigation = () =>
    <Navbar inverse collapseOnSelect>
        <Navbar.Header>
            <Navbar.Brand>
                <LinkContainer to="/" exact={true}>
                    <a>Huckleberry Ogre Homepage</a>
                </LinkContainer>
            </Navbar.Brand>
            <Navbar.Toggle/>
        </Navbar.Header>
        <Navbar.Collapse>
            <Nav>
                <LinkContainer to="/" exact={true}>
                    <NavItem eventKey={1}>Blog</NavItem>
                </LinkContainer>
                <LinkContainer to="/blog/post/CREATE" exact={true}>
                    <NavItem eventKey={2}>New post</NavItem>
                </LinkContainer>
            </Nav>
        </Navbar.Collapse>
    </Navbar>;

export {Navigation};
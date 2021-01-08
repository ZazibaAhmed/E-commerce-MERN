 import React from 'react';
 import {LinkContainer} from 'react-router-bootstrap'
 import { useDispatch, useSelector } from 'react-redux'
 import { Container,Navbar, Nav, NavDropdown} from 'react-bootstrap';
 import { logout } from '../actions/userActions'
 
 const Header = () => {
    const dispatch = useDispatch()

    const userLogin = useSelector( state => state.userLogin );
    
    //Destructuring parts of the state that could be sent down from reducer
    const { loading, error, userInfo } = userLogin

    const logoutHandler = () => {
        dispatch(logout())
    }
    return (
    <header>   
        <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
            <Container>
                <LinkContainer to="/">
                    <Navbar.Brand>ProShop</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <LinkContainer to="/cart">
                            <Nav.Link>
                                <i className="fas fa-shopping-cart mr-1"></i>Cart
                            </Nav.Link>
                        </LinkContainer>
                        {userInfo ? (
                           <NavDropdown title={userInfo.name} id='username'>
                                <LinkContainer to='/profile'>
                                    <NavDropdown.Item>Profile</NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Item onClick={logoutHandler}>
                                    Logout 
                                </NavDropdown.Item>
                            </NavDropdown>                       
                        )                   
                        :  (
                            <LinkContainer to="/login">
                                <Nav.Link>
                                    <i className="fas fa-user mr-1"></i>Sign In
                                </Nav.Link>
                            </LinkContainer>
                        )
                        }                       
                    </Nav>        
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
    )
 }
 
 export default Header
 
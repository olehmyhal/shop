import React from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import {Nav , Navbar , Container , NavDropdown} from 'react-bootstrap'
import {useDispatch , useSelector} from 'react-redux'
import {Route} from 'react-router-dom'

import { logout } from '../actions/userActions'
import { SearchBox } from './'

const Header = () => {
    const dispacth = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const logoutHandler = () => {
        dispacth(logout())
    }

    return (
        <header>
            <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand>Oleg's Shop</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Route render={({history}) => <SearchBox history={history}/>} />
                        <Nav className='ml-auto'>
                            <LinkContainer to='/cart'>
                                <Nav.Link><i className='fas fa-shopping-cart'/>Cart</Nav.Link>
                            </LinkContainer>
                            {userInfo
                            ?(
                                <NavDropdown title={userInfo.name} id='username'>
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                                </NavDropdown>    
                            )
                            :( 
                            <LinkContainer to='/login'>
                                <Nav.Link><i className='fas fa-user'/>Sign In</Nav.Link>
                            </LinkContainer>
                            )}
                            {userInfo && userInfo.isAdmin && (
                                <NavDropdown title='Admin' id='adminmenu'>
                                    <LinkContainer to='/admin/userlist'>
                                        <NavDropdown.Item>Users</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/admin/productlist'>
                                        <NavDropdown.Item>Products</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/admin/orderlist'>
                                        <NavDropdown.Item>Orders</NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>    
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
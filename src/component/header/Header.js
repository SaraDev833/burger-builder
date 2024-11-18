import React, { Component, useState } from 'react'
import { NavLink } from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText,
} from 'reactstrap';
import header from './header.css';
import Logo from '../../assets/logo.png';
import BurgerBuilder from './../BurgerBuilder/BurgerBuilder';
import { connect } from 'react-redux';

const mapStateToProps= state => {
   return{
    token: state.token ,
    userId: state.userId ,
   }
}

class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false,
        }
    }

    toggle = () => {
        this.setState(prevState => ({ isOpen: !prevState.isOpen }));

    }
    render() {
        console.log(this.props.userId)
        let links = null ; 
        if(this.props.token){
            links = (        <Nav className="ms-auto" navbar>
                <NavItem className='nav_ul'>
                    <NavLink to="/BurgerBuilder" className='nav_li'>Burger Builder</NavLink>
                </NavItem>
                <NavItem className='nav_ul'>
                    <NavLink to='/orders' className='nav_li'>Orders</NavLink>
                </NavItem>
                <NavItem className='nav_ul'>
                    <NavLink to='/logout' className='nav_li'>Logout</NavLink>
                </NavItem>
            </Nav>)
        }
        else{
            links =(
<Nav className="ms-auto" navbar>
                
                <NavItem className='nav_ul'>
                    <NavLink to='/Auth' className='nav_li'>Login</NavLink>
                </NavItem>
             
            </Nav>
            )
        }
        return (
            <div>
                <Navbar color="dark" dark expand="md" style={{paddingLeft: 30 , paddingRight:30}}>
                    <NavbarBrand href="/"><img src={Logo} width="80px"/></NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                {links}
                    </Collapse>
                </Navbar>
            </div>
        )
    }
}


export default connect(mapStateToProps) (Header)
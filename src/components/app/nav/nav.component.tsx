import React from 'react'

import { MainNav, NavMenu, NavMenuItem, Logout, Flare, LogoHolder } from './nav.component.style'
import { logoutRequest } from '../../../authenticate/loginout.actions';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Logo from '../../../assets/logo_link.png'

class MainNavigation extends React.Component<IDispatchProps> {
    logout = () => {
        this.props.logoutRequest();
    }

    render() {
        return (
            <MainNav>
                <LogoHolder src={Logo}></LogoHolder>

                <NavMenu>
                    <NavMenuItem to={'/home'} exact >Home</NavMenuItem>
                    <NavMenuItem to={'/graphing'} exact>Graphing</NavMenuItem>
                    <NavMenuItem to={'/reports'} exact>Reports</NavMenuItem>
                    <NavMenuItem to={'/register'} exact>Register</NavMenuItem>
                    
                    <NavMenuItem to={'/donors'} exact>Donors</NavMenuItem>
                    <NavMenuItem to={'/settings'} exact>Settings</NavMenuItem>
                </NavMenu>

                <Logout onClick={this.logout}>Logout</Logout>

                <Flare></Flare>
            </MainNav>
        )
    }
}

interface IDispatchProps {
    logoutRequest: Function
}
const mapDispatchToProps: IDispatchProps = {
    logoutRequest
}

export default connect(null, mapDispatchToProps)(MainNavigation)
import React from 'react'

import { MainNav, NavMenu, NavMenuItem, Logout, Flare, LogoHolder } from './nav.component.style'
import { logoutRequest } from '../../authenticate/loginout.actions';
import { connect } from 'react-redux';
import Logo from '../../assets/logo_link.png'

class MainNavigation extends React.Component<IDispatchProps> {
    logout = () => {
        this.props.logoutRequest();
    }

    render() {
        return (
            <MainNav>
                <LogoHolder src={Logo}></LogoHolder>

                <NavMenu>
                    <NavMenuItem to={'/home'}>Home</NavMenuItem>
                    <NavMenuItem to={'/graphing'}>Graphing</NavMenuItem>
                    <NavMenuItem to={'/reports'}>Reports</NavMenuItem>
                    <NavMenuItem to={'/register'}>Register</NavMenuItem>
                    
                    <NavMenuItem to={'/donors'}>Donors</NavMenuItem>
                    <NavMenuItem to={'/donations'}>Donations</NavMenuItem>
                    <NavMenuItem to={'/settings'}>Settings</NavMenuItem>
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
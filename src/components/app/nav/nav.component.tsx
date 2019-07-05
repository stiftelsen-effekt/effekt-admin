import React from 'react'

import { MainNav, NavMenu, NavMenuItem, Logout, Flare } from './nav.component.style'
import { logoutRequest } from '../../../authenticate/loginout.actions';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

class MainNavigation extends React.Component<IDispatchProps> {
    logout = () => {
        this.props.logoutRequest();
    }

    render() {
        return (
            <MainNav>
                <NavMenu>
                    <NavLink to={'/'} exact><NavMenuItem>Home</NavMenuItem></NavLink>
                    <NavLink to={'/graphing'} exact><NavMenuItem>Graphing</NavMenuItem></NavLink>
                    <NavLink to={'/reports'} exact><NavMenuItem>Reports</NavMenuItem></NavLink>
                    <NavLink to={'/register'} exact><NavMenuItem>Register</NavMenuItem></NavLink>
                    
                    <NavLink to={'/donors'} exact><NavMenuItem>Donors</NavMenuItem></NavLink>
                    <NavMenuItem>Settings</NavMenuItem>
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
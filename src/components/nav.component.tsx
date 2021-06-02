import React from 'react'

import { MainNav, NavMenu, NavMenuItem, Logout, Flare, LogoHolder } from './nav.component.style'
import { logoutRequest } from '../authenticate/loginout.actions';
import { connect } from 'react-redux';
import Logo from '../assets/logo_link.png'
import { Home, BarChart2, Upload, Clipboard, User, List, LogOut, PieChart, Activity } from "react-feather"

class MainNavigation extends React.Component<IDispatchProps> {
    logout = () => {
        this.props.logoutRequest();
    }

    render() {
        const iconSize: number = 20;

        return (
            <MainNav>
                <LogoHolder src={Logo}></LogoHolder>

                <NavMenu>
                    <NavMenuItem to={'/home'}>          <span>Home</span>           <Home size={iconSize} color={"white"}></Home></NavMenuItem>

                    <NavMenuItem to={'/donors'}>        <span>Donors</span>         <User size={iconSize} color={"white"}></User></NavMenuItem>
                    <NavMenuItem to={'/distributions'}> <span>Distributions</span>  <PieChart size={iconSize} color={"white"}></PieChart></NavMenuItem>
                    <NavMenuItem to={'/donations'}>     <span>Donations</span>      <List size={iconSize} color={"white"}></List></NavMenuItem>

                    <NavMenuItem to={'/register'}>      <span>Register</span>       <Upload size={iconSize} color={"white"}></Upload></NavMenuItem>
                    <NavMenuItem to={'/reports'}>       <span>Reports</span>        <Clipboard size={iconSize} color={"white"}></Clipboard></NavMenuItem>

                    <NavMenuItem to={'/graphing'}>      <span>Graphing</span>       <BarChart2 size={iconSize} color={"white"}></BarChart2></NavMenuItem>
                    <NavMenuItem to={'/logs'}>          <span>Logs</span>           <Activity size={iconSize} color={"white"}></Activity></NavMenuItem>
                </NavMenu>

                <Logout onClick={this.logout}>          <span>Logout</span>         <LogOut size={iconSize} color={"white"}></LogOut></Logout>

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
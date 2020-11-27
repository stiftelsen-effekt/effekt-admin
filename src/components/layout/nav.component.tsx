import React from 'react';

import {
  Home,
  BarChart2,
  Upload,
  Clipboard,
  User,
  List,
  LogOut,
  PieChart,
} from 'react-feather';
import { useDispatch } from 'react-redux';
import {
  MainNav,
  NavMenu,
  NavMenuItem,
  Logout,
  Flare,
  LogoHolder,
} from './nav.component.style';
import Logo from '../../assets/logo_link.png';
import { logoutRequest } from '../../store/auth/loginout.actions';

export const MainNavigation: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const iconSize = 20;

  return (
    <MainNav>
      <LogoHolder src={Logo} />

      <NavMenu>
        <NavMenuItem to="/home">
          {' '}
          <span>Home</span> <Home size={iconSize} color="white" />
        </NavMenuItem>

        <NavMenuItem to="/donors">
          {' '}
          <span>Donors</span> <User size={iconSize} color="white" />
        </NavMenuItem>
        <NavMenuItem to="/distributions">
          {' '}
          <span>Distributions</span> <PieChart size={iconSize} color="white" />
        </NavMenuItem>
        <NavMenuItem to="/donations">
          {' '}
          <span>Donations</span> <List size={iconSize} color="white" />
        </NavMenuItem>

        <NavMenuItem to="/register">
          {' '}
          <span>Register</span> <Upload size={iconSize} color="white" />
        </NavMenuItem>
        <NavMenuItem to="/reports">
          {' '}
          <span>Reports</span> <Clipboard size={iconSize} color="white" />
        </NavMenuItem>

        <NavMenuItem to="/graphing">
          {' '}
          <span>Graphing</span> <BarChart2 size={iconSize} color="white" />
        </NavMenuItem>
      </NavMenu>

      <Logout onClick={() => dispatch(logoutRequest)}>
        {' '}
        <span>Logout</span> <LogOut size={iconSize} color="white" />
      </Logout>

      <Flare />
    </MainNav>
  );
};

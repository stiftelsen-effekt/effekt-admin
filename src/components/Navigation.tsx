import React from 'react';

import { MainNav, NavMenu, NavMenuItem, Logout, LogoHolder } from './Navigation.style';
import Logo from '../assets/GiEffektivt_Logo_Hvit_RGB.png';
import {
  Home,
  Upload,
  Clipboard,
  User,
  List,
  LogOut,
  PieChart,
  Activity,
  Smartphone,
  FileText,
} from 'react-feather';
import { useAuth0 } from '@auth0/auth0-react';

export const MainNavigation: React.FC = () => {
  const { logout } = useAuth0();

  const iconSize: number = 20;

  return (
    <MainNav>
      <LogoHolder src={Logo}></LogoHolder>

      <NavMenu>
        <NavMenuItem to={'/home'}>
          {' '}
          <span>Home</span> <Home size={iconSize} color={'white'}></Home>
        </NavMenuItem>

        <NavMenuItem to={'/donors'}>
          {' '}
          <span>Donors</span> <User size={iconSize} color={'white'}></User>
        </NavMenuItem>
        <NavMenuItem to={'/distributions'}>
          {' '}
          <span>Distributions</span> <PieChart size={iconSize} color={'white'}></PieChart>
        </NavMenuItem>
        <NavMenuItem to={'/donations'}>
          {' '}
          <span>Donations</span> <List size={iconSize} color={'white'}></List>
        </NavMenuItem>
        <NavMenuItem to={'/vipps/agreements'}>
          {' '}
          <span>Vipps</span> <Smartphone size={iconSize} color={'white'}></Smartphone>
        </NavMenuItem>
        <NavMenuItem to={'/avtalegiro'}>
          {' '}
          <span>AvtaleGiro</span> <FileText size={iconSize} color={'white'}></FileText>
        </NavMenuItem>

        <NavMenuItem to={'/register'}>
          {' '}
          <span>Register</span> <Upload size={iconSize} color={'white'}></Upload>
        </NavMenuItem>
        <NavMenuItem to={'/reports'}>
          {' '}
          <span>Reports</span> <Clipboard size={iconSize} color={'white'}></Clipboard>
        </NavMenuItem>

        <NavMenuItem to={'/logs'}>
          {' '}
          <span>Logs</span> <Activity size={iconSize} color={'white'}></Activity>
        </NavMenuItem>
      </NavMenu>

      <Logout onClick={() => logout({ returnTo: window.location.origin })}>
        {' '}
        <span>Logout</span> <LogOut size={iconSize} color={'white'}></LogOut>
      </Logout>
    </MainNav>
  );
};

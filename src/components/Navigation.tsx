import React from "react";

import { MainNav, NavMenu, NavMenuItem, Logout, LogoHolder } from "./Navigation.style";
import NOLogo from "../assets/GiEffektivt_Logo_Hvit_RGB.png";
import SELogo from "../assets/GeEffektivt_Logo_Hvit_RGB.png";
import {
  Home,
  Upload,
  User,
  List,
  LogOut,
  PieChart,
  Activity,
  Smartphone,
  FileText,
  Award,
} from "react-feather";
import { useAuth0 } from "@auth0/auth0-react";
import { AdminPanelLocale } from "../models/locale";

const iconSize: number = 20;

const navigationItems = {
  home: (
    <NavMenuItem to={"/home"}>
      {" "}
      <span>Home</span> <Home size={iconSize} color={"white"}></Home>
    </NavMenuItem>
  ),
  donors: (
    <NavMenuItem to={"/donors"}>
      {" "}
      <span>Donors</span> <User size={iconSize} color={"white"}></User>
    </NavMenuItem>
  ),
  distributions: (
    <NavMenuItem to={"/distributions"}>
      {" "}
      <span>Distributions</span> <PieChart size={iconSize} color={"white"}></PieChart>
    </NavMenuItem>
  ),
  donations: (
    <NavMenuItem to={"/donations"}>
      {" "}
      <span>Donations</span> <List size={iconSize} color={"white"}></List>
    </NavMenuItem>
  ),
  fundraisers: (
    <NavMenuItem to={"/fundraisers"}>
      {" "}
      <span>Fundraisers</span> <Award size={iconSize} color={"white"}></Award>
    </NavMenuItem>
  ),
  vippsAgreements: (
    <NavMenuItem to={"/vipps/agreements"}>
      {" "}
      <span>Vipps</span> <Smartphone size={iconSize} color={"white"}></Smartphone>
    </NavMenuItem>
  ),
  avtaleGiroAgreements: (
    <NavMenuItem to={"/avtalegiro"}>
      {" "}
      <span>AvtaleGiro</span> <FileText size={iconSize} color={"white"}></FileText>
    </NavMenuItem>
  ),
  autogiroAgreements: (
    <NavMenuItem to={"/autogiro"}>
      {" "}
      <span>AutoGiro</span> <FileText size={iconSize} color={"white"}></FileText>
    </NavMenuItem>
  ),
};

const localeMenuItems = {
  NO: [
    navigationItems.home,
    navigationItems.donors,
    navigationItems.distributions,
    navigationItems.donations,
    navigationItems.fundraisers,
    navigationItems.avtaleGiroAgreements,
    navigationItems.vippsAgreements,
  ],
  SV: [
    navigationItems.home,
    navigationItems.donors,
    navigationItems.distributions,
    navigationItems.donations,
    navigationItems.fundraisers,
    navigationItems.autogiroAgreements,
  ],
};

export const MainNavigation: React.FC<{ locale: AdminPanelLocale }> = ({ locale }) => {
  const { logout } = useAuth0();

  return (
    <MainNav>
      <LogoHolder src={locale === AdminPanelLocale.NO ? NOLogo : SELogo}></LogoHolder>

      <NavMenu>
        {localeMenuItems[locale].map((item, index) => (
          <React.Fragment key={index}>{item}</React.Fragment>
        ))}
        <NavMenuItem to={"/register"}>
          {" "}
          <span>Register</span> <Upload size={iconSize} color={"white"}></Upload>
        </NavMenuItem>
        {/**
         *  <NavMenuItem to={"/reports"}>
         *    {" "}
         *    <span>Reports</span> <Clipboard size={iconSize} color={"white"}></Clipboard>
         *  </NavMenuItem>
         */}

        <NavMenuItem to={"/logs"}>
          {" "}
          <span>Logs</span> <Activity size={iconSize} color={"white"}></Activity>
        </NavMenuItem>
      </NavMenu>

      <Logout onClick={() => logout({ returnTo: window.location.origin })}>
        {" "}
        <span>Logout</span> <LogOut size={iconSize} color={"white"}></LogOut>
      </Logout>
    </MainNav>
  );
};

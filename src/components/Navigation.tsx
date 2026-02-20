import React from "react";

import {
  MainNav,
  NavMenu,
  NavMenuItem,
  NavGroupHeader,
  NavSeparator,
  Logout,
  LogoHolder,
} from "./Navigation.style";
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
  Globe,
  Tag,
  Target,
} from "react-feather";
import { useAuth0 } from "@auth0/auth0-react";
import { AdminPanelLocale } from "../models/locale";

const iconSize: number = 16;

const localeMenuGroups = {
  NO: [
    {
      header: "Overview",
      items: [
        { to: "/home", label: "Home", icon: Home },
        { to: "/donors", label: "Donors", icon: User },
        { to: "/distributions", label: "Distributions", icon: PieChart },
        { to: "/donations", label: "Donations", icon: List },
      ],
    },
    {
      header: "Agreements",
      items: [
        { to: "/vipps/agreements", label: "Vipps", icon: Smartphone },
        { to: "/avtalegiro", label: "AvtaleGiro", icon: FileText },
      ],
    },
    {
      header: "Fundraisers",
      items: [
        { to: "/fundraisers", label: "Fundraisers", icon: Award },
        { to: "/adoveo", label: "Adoveo", icon: Globe },
      ],
    },
    {
      header: "Reporting",
      items: [
        { to: "/register", label: "Register", icon: Upload },
        { to: "/logs", label: "Logs", icon: Activity },
      ],
    },
    {
      header: "Configuration",
      items: [
        { to: "/referraltypes", label: "Referrals", icon: Tag },
        { to: "/causeareas", label: "Cause Areas", icon: Target },
      ],
    },
  ],
  SV: [
    {
      header: "Overview",
      items: [
        { to: "/home", label: "Home", icon: Home },
        { to: "/donors", label: "Donors", icon: User },
        { to: "/distributions", label: "Distributions", icon: PieChart },
        { to: "/donations", label: "Donations", icon: List },
      ],
    },
    {
      header: "Agreements",
      items: [{ to: "/autogiro", label: "AutoGiro", icon: FileText }],
    },
    {
      header: "Fundraisers",
      items: [
        { to: "/fundraisers", label: "Fundraisers", icon: Award },
        { to: "/adoveo", label: "Adoveo", icon: Globe },
      ],
    },
    {
      header: "Reporting",
      items: [
        { to: "/register", label: "Register", icon: Upload },
        { to: "/logs", label: "Logs", icon: Activity },
      ],
    },
    {
      header: "Configuration",
      items: [
        { to: "/referraltypes", label: "Referrals", icon: Tag },
        { to: "/causeareas", label: "Cause Areas", icon: Target },
      ],
    },
  ],
};

export const MainNavigation: React.FC<{ locale: AdminPanelLocale }> = ({ locale }) => {
  const { logout } = useAuth0();

  const groups = localeMenuGroups[locale];

  return (
    <MainNav>
      <LogoHolder src={locale === AdminPanelLocale.NO ? NOLogo : SELogo}></LogoHolder>

      <NavMenu>
        {groups.map((group, groupIndex) => (
          <React.Fragment key={group.header}>
            {groupIndex > 0 && <NavSeparator />}
            <NavGroupHeader>{group.header}</NavGroupHeader>
            {group.items.map((item) => (
              <NavMenuItem key={item.to} to={item.to}>
                <span>{item.label}</span>
                <item.icon size={iconSize} color={"white"} />
              </NavMenuItem>
            ))}
          </React.Fragment>
        ))}
      </NavMenu>

      <Logout onClick={() => logout({ returnTo: window.location.origin })}>
        <span>Logout</span> <LogOut size={iconSize} color={"white"}></LogOut>
      </Logout>
    </MainNav>
  );
};

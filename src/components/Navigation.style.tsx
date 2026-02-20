import styled from "styled-components";
import { NavLink, type NavLinkProps } from "react-router-dom";

const NavMenuLink = ({ className, ...props }: NavLinkProps) => (
  <NavLink
    {...props}
    className={({ isActive }) =>
      [typeof className === "string" ? className : "", isActive ? "active" : ""]
        .filter(Boolean)
        .join(" ")
    }
  />
);

export const MainNav = styled.nav`
  width: 240px;
  height: 100vh;
  background: black;
  flex-shrink: 0;

  color: white;
  padding-top: 5px;
  box-sizing: border-box;

  display: inline-block;
  vertical-align: top;

  display: flex;
  flex-direction: column;
  justify-content: space_between;
  overflow: auto;
`;

export const NavMenu = styled.ul`
  padding: 0;
  padding-right: 36px;
  padding-left: 24px;
  overflow: auto;
`;

export const NavMenuItem = styled(NavMenuLink)`
  font-size: 15px;
  font-weight: 400;
  color: white;
  padding: 7px 0;
  text-decoration: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  &.active:after {
    content: "";
    display: block;
    position: absolute;
    right: -36px;
    top: 50%;
    transform: translateY(-50%);

    width: 0;
    height: 0;
    border-style: solid;
    border-width: 8px 8px 8px 0;
    border-color: transparent #fff transparent transparent;
  }

  span {
    display: inline-block;
    vertical-align: middle;
  }

  svg {
    display: inline-block;
    vertical-align: middle;
    flex-shrink: 0;
  }
`;

export const NavGroupHeader = styled.li`
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: #666;
  list-style: none;
  padding-top: 16px;
  padding-bottom: 4px;

  &:first-child {
    padding-top: 0;
  }
`;

export const NavSeparator = styled.li`
  list-style: none;
  border-top: 1px solid #333;
  margin: 8px 0;
`;

export const Logout = styled.span`
  cursor: pointer;
  bottom: 48px;
  padding-right: 36px;
  padding-left: 24px;
  font-size: 15px;
  font-weight: 400;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 0px;
  padding-bottom: 12px;
`;

export const LogoHolder = styled.img`
  display: block;
  margin: 0 auto;
  width: 160px;
  margin-top: 60px;
  margin-bottom: 40px;
`;

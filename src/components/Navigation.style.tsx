import styled from "styled-components";
import { NavLink } from "react-router-dom";

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
  text-align: right;
  padding-right: 36px;
  overflow: auto;
`;

export const NavMenuItem = styled(NavLink)`
  font-size: 24px;
  font-weight: 100;
  color: white;
  padding-top: 12px;
  padding-bottom: 12px;
  text-decoration: none;
  display: list-item;
  position: relative;

  &.active:after {
    content: "";
    display: block;
    position: absolute;
    right: -36px;
    top: 18px;

    width: 0;
    height: 0;
    border-style: solid;
    border-width: 11px 11px 11px 0;
    border-color: transparent #fff transparent transparent;
  }

  span {
    display: inline-block;
    margin-right: 10px;
    vertical-align: middle;
  }

  svg {
    display: inline-block;
    vertical-align: middle;
  }
`;

export const Logout = styled.span`
  cursor: pointer;
  bottom: 48px;
  padding-right: 36px;
  left: 36px;
  font-size: 24px;
  font-weight: 300;
  color: white;
  display: flex;
  align-items: center;
  padding-top: 0px;
  padding-bottom: 12px;
  align-self: flex-end;

  & span {
    margin-right: 14px;
  }
`;

export const LogoHolder = styled.img`
  display: block;
  margin: 0 auto;
  width: 180px;
  margin-top: 40px;
  margin-bottom: 40px;
`;

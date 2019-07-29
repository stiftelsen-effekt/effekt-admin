import styled from 'styled-components'
import { orange50, orange20, orange10 } from './style/colors';
import { NavLink } from 'react-router-dom';

export const MainNav = styled.nav`
    width: 300px;
    height: 100vh;
    background: black;
    flex-shrink: 0;

    color: white;
    padding-top: 5px;
    box-sizing: border-box;

    display: inline-block;
    vertical-align: top;

    position: relative;
    overflow: hidden;
`

export const NavMenu = styled.ul`
    list-style: none;
    padding: 0;
    text-align: right;
    padding-right: 36px;
`

export const NavMenuItem = styled(NavLink)`
    font-size: 24px;
    font-weight: 300;
    color: white;
    padding-top: 12px;
    padding-bottom: 12px;
    text-decoration: none;
    display: list-item;
    position: relative;

    &.active:after {
        content: '';
        display: block;
        position: absolute;
        right: -36px;
        top: 15px;
        
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 11px 11px 11px 0;
        border-color: transparent #fff transparent transparent;
    }
`

export const Logout = styled.span`
    cursor: pointer;
    position: absolute;
    bottom: 48px;
    right: 36px;
    font-size: 24px;
    font-weight: 300;
    color: white;
`

export const Flare = styled.div`
    position: absolute;
    bottom: -80px;
    left: -100px;
    width: 240px;
    height: 100px;
    background: ${orange50};
    transform: rotate(10deg);
    opacity: .9;

    &:after {
        content: '';
        width: 240px;
        height: 100px;
        background: ${orange20};
        position: absolute;
        left: 35px;
        transform: rotate(26deg);
        opacity: .6;
    }

    &:before {
        content: '';
        width: 240px;
        height: 100px;
        background: ${orange10};
        position: absolute;
        left: -34px;
        bottom: 20px;
        transform: rotate(55deg);
        opacity: .3;
    }
`

export const LogoHolder = styled.img`
    display: block;
    margin: 0 auto;
    width: 220px;
    margin-top: 40px;
    margin-bottom: 20px;
`
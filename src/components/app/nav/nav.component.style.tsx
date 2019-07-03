import styled from 'styled-components'

export const MainNav = styled.nav`
    width: 340px;
    height: 100vh;
    background: black;
    flex-shrink: 0;

    color: white;
    padding-top: 5px;
    box-sizing: border-box;

    display: inline-block;
    vertical-align: top;

    position: relative;
`

export const NavMenu = styled.ul`
    list-style: none;
    padding: 0;
    text-align: right;
    padding-right: 36px;
`

export const NavMenuItem = styled.li`
    font-size: 24px;
    font-weight: 300;
    color: white;
    padding-top: 12px;
    padding-bottom: 12px;
    text-decoration: none;
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
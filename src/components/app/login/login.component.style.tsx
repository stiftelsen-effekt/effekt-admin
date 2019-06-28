import styled from 'styled-components'
import loginBackground from '../../../assets/loginbg.jpg'

export const LoginWrapper = styled.div`
    background: url(${loginBackground});
    background-position: center center;
    background-size: cover;

    width: 100vw;
    height: 100vh;

    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
`

export const LoginButton = styled.button`
    border: 3px solid white;
    padding: 20px 50px;
    background: none;
    color: white;
    font-size: 16px;
    font-family: 'Open Sans';
    background: rgba(0,0,0,.5);
    cursor: pointer;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 600;
` 

export const LoginHeader = styled.h1`
    color: white;
    padding-bottom: 40px;
    text-shadow: 0 1px black;
`
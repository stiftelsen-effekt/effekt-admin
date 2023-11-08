import styled from "styled-components";
import loginBackground from "../../assets/loginbg.jpg";

export const LoginWrapper = styled.div`
  background-image: url(${loginBackground});
  background-color: #000;
  background-position: center center;
  background-size: 340px;
  background-repeat: no-repeat;

  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  padding-bottom: 50px;
  box-sizing: border-box;
`;

export const LoginButton = styled.button`
  border: 3px solid white;
  padding: 20px 50px;
  background: none;
  color: white;
  font-size: 16px;
  font-family: "Open Sans", sans-serif;
  background: rgba(0, 0, 0, 0.5);
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
  margin-top: 20px;
`;

export const LoginHeader = styled.h1`
  color: white;
  padding-bottom: 0px;
  text-shadow: 0 1px black;
  padding-top: 300px;
`;

export const LoginError = styled.div`
  background: rgba(180, 0, 0, 1);
  color: white;
  padding: 10px 20px;
  border: 1px solid white;
`;

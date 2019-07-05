import styled from "styled-components";
import { orange50, orange05, brown50 } from "../colors";

export const MainHeader = styled.h1`
    border-left: 6px solid ${orange50};
    background: ${orange05};
    color: black;
    font-family: 'Georgia';
    font-size: 30px;
    font-weight: normal;
    padding: 14px 25px;
    width: 100%;
    box-sizing: border-box;
    max-width: 1024px;
`
export const SubHeader = styled.h2`
    border-left: 4px solid ${brown50};
    color: ${brown50};
    font-family: 'Georgia';
    font-size: 22px;
    font-weight: normal;
    padding: 6px 15px;
    width: 100%;
    box-sizing: border-box;
    max-width: 1024px;
`

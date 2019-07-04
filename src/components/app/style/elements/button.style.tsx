import styled, { css } from "styled-components";
import { brown50, brown05 } from "../colors";

export enum EffektButtonTypes {
    PRIMARY,
    SECONDARY,
    TERTIARY
}

interface EffektButtonProps {
    buttonStyle?: EffektButtonTypes
}

export const EffektButton = styled.button`
    padding: 10px 30px;
    
    font-family: 'Roboto';
    font-weight: 500;
    letter-spacing: 1px;
    font-size: 14px;
    border: none;
    cursor: pointer;
    box-shadow: 0 1px 3px 0px rgba(0,0,0,.2);

    ${
        (props: EffektButtonProps) => {
            switch(props.buttonStyle) {
                case EffektButtonTypes.SECONDARY:
                    return css`
                    background: ${brown05};
                    color: white;`
                default:
                    return css`
                    background: ${brown50};
                    color: white;`
            }
        }
    }
`
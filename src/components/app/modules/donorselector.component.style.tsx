import styled, { css } from "styled-components";

export interface SelectorWrapperProps {
    visible: boolean
}

export const SelectorWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,.6);
    display: none;

    justify-content: center;
    align-items: center;

    ${
        (props: SelectorWrapperProps) => props.visible && css`
            display: flex;
        `
    }
`

export const DonorSelectorDialog = styled.div`
    background: white;
    box-shadow: 0px 0px 3px 0px rgba(0,0,0,.3);
    min-width: 640px;
    min-height: 640px;
`
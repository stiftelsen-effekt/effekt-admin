import styled from "styled-components";
import { SwitchSelected } from "./effekt-switch.component";
import { orange50, orange05, brown50, brown30 } from "../../colors";

export const EffektSwitchWrapper = styled.div`
    background: ${orange05};
    box-shadow: 0px 1px 3px 0px rgba(0,0,0,.2);
    display: inline-block;
    position: relative;
    user-select: none;
    overflow: hidden;
`

interface ISwitchItemProps {
    active: boolean
}
export const EffektSwitchItem = styled.span<ISwitchItemProps>`
    display: inline-block;
    cursor: pointer;
    padding: 8px 18px;
    color: ${(props) => (props.active ? 'white' : brown30)};
    text-shadow: ${(props) => (props.active ? '0px 1px rgba(0,0,0,.3)' : '')};
    font-weight: 500;
    font-family: 'Roboto';
    font-size: 14px;
    position: relative;
    transition: all 200ms;
`

interface ISwitchSliderProps {
    state: SwitchSelected
}
export const EffektSwitchSlider = styled.div<ISwitchSliderProps>`
    position: absolute;
    top: 0;
    left: 0;
    width: calc(50% - 5px);
    height: 100%;
    background: ${orange50};
    transform: translateX(${(props) => (props.state === SwitchSelected.RIGHT ? 'calc(100% + 10px)' : '0%')});
    transition: transform 200ms;

    &:after {
        content: '';
        position: absolute;
        top: 0;
        left: -9.7px;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 0 0 33px 10px;
        border-color: transparent transparent ${orange50} transparent;
    }

    &:before {
        content: '';
        position: absolute;
        top: 0;
        right: -10px;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 33px 10px 0 0;
        border-color: ${orange50} transparent transparent transparent;
    }
`
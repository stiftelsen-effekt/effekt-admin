import styled from "styled-components";
import { SwitchSelected } from "./effekt-switch.component";

export const EffektSwitchWrapper = styled.div`

`

interface ISwitchItemProps {
    active: boolean
}
export const EffektSwitchItem = styled.span<ISwitchItemProps>`
    display: inline-block;
    cursor: pointer;
    padding: 10px;
    background: ${(props) => (props.active ? 'red' : '')}
`

interface ISwitchSliderProps {
    state: SwitchSelected
}
export const EffektSwitchSlider = styled.div<ISwitchSliderProps>`

`
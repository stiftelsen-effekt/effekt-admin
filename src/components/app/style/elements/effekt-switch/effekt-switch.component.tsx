import React, { useEffect } from 'react'
import { EffektSwitchWrapper, EffektSwitchItem, EffektSwitchSlider } from "./effekt-switch.component.style";
import { useState } from "react";

export enum SwitchSelected {
    LEFT,
    RIGHT
}

interface IProps {
    left: string,
    right: string,
    onChange(selected: SwitchSelected): void
}

export const EffektSwitch: React.FunctionComponent<IProps> = ({left, right, onChange}) => {
    const [selected, setSelected] = useState<SwitchSelected>(SwitchSelected.LEFT)

    useEffect(() => onChange(selected), [onChange, selected])

    return (
        <EffektSwitchWrapper>
            <EffektSwitchSlider state={selected}></EffektSwitchSlider>
            <EffektSwitchItem 
                active={(selected === SwitchSelected.LEFT)}
                onClick={() => setSelected(SwitchSelected.LEFT)}>
                {left}
            </EffektSwitchItem>
            <EffektSwitchItem 
                active={(selected === SwitchSelected.RIGHT)}
                onClick={() => setSelected(SwitchSelected.RIGHT)}>
                {right}
            </EffektSwitchItem>
        </EffektSwitchWrapper>
    )
}
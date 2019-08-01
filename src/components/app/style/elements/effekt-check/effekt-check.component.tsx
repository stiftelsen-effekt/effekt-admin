import React from 'react'
import { EffektCheckWrapper, EffektCheckBox, EffektCheckLabel } from './effekt-check.component.style';

interface IProps {
    checked: boolean,
    label: string,
    azure: boolean,
    onChange(checked: boolean): void
}

export const EffektCheck: React.FunctionComponent<IProps> = ({label, checked, azure, onChange}) => {
    return (
        <EffektCheckWrapper onClick={() => onChange(!checked)}>
            <EffektCheckBox azure={azure} checked={checked} />
            <EffektCheckLabel>{label}</EffektCheckLabel>
        </EffektCheckWrapper>
    )
}
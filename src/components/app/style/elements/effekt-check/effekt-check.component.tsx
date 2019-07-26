import React from 'react'
import { EffektCheckWrapper, EffektCheckBox, EffektCheckLabel } from './effekt-check.component.style';

interface IProps {
    checked: boolean,
    label: string,
    onChange(checked: boolean): void
}

export const EffektCheck: React.FunctionComponent<IProps> = ({label, checked, onChange}) => {
    return (
        <EffektCheckWrapper onClick={() => onChange(!checked)}>
            <EffektCheckBox checked={checked} />
            <EffektCheckLabel>{label}</EffektCheckLabel>
        </EffektCheckWrapper>
    )
}
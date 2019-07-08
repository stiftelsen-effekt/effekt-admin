import React from 'react'
import check from '../../../../../assets/checked.png'
import exclamation from '../../../../../assets/exclamation-mark.png'
import { Invalid, Valid, SummationString } from './distribution-summation.style.component';

interface SummationProps {
    max: number,
    current: number
}

export const SummationComponent: React.FunctionComponent<SummationProps> = (props: SummationProps) => {
    let valid = props.current === props.max;

    let summation = (
        <SummationString>Sum: {props.current.toString() + " / " + props.max.toString()}</SummationString>
    )

    if (valid) {
        return (
            <Valid>
                <img src={check} alt="Valid" style={{verticalAlign: 'middle'}}/>
                {summation}
            </Valid>
        )
    } else {
        return (
            <Invalid>
                <img src={exclamation} alt="Invalid" style={{verticalAlign: 'middle'}}/>
                {summation}
            </Invalid>
        )
    }
}


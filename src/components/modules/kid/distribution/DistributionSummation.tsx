import React from 'react'
import check from '../../../../assets/checked.png'
import exclamation from '../../../../assets/exclamation-mark.png'
import { Invalid, Valid, SummationString } from './DistributionSummation.style';
import Decimal from 'decimal.js';

interface IProps {
    max: Decimal,
    current: Decimal
}

export const SummationComponent: React.FunctionComponent<IProps> = (props: IProps) => {
    let valid = props.current.equals(props.max);

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


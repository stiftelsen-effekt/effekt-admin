import React from 'react'
import { EffektDatePicker } from '../../style/elements/datepicker/datepicker.style';
import rightArrow from '../../../assets/right-arrow.svg'

interface IProps {
    from: Date | null,
    to: Date | null,
    onChangeFrom(date: Date|null): void,
    onChangeTo(date: Date|null): void
}
export const EffektDateRange: React.FunctionComponent<IProps> = ({ from, to, onChangeFrom, onChangeTo }) => {
    return (
        <React.Fragment>
            <EffektDatePicker 
                        onChange={onChangeFrom}//
                        selected={from}
                        placeholderText="from"
                        dateFormat="dd.MM.yyyy"></EffektDatePicker>

            <img src={rightArrow} style={{ margin: '0 12px', height: '20px', verticalAlign: 'middle' }} alt="arrow" />

            <EffektDatePicker 
                        onChange={onChangeTo}//
                        selected={to}
                        placeholderText="to"
                        dateFormat="dd.MM.yyyy"
                        popperClassName="right-aligned"
                        popperPlacement="bottom-end"></EffektDatePicker>
        </React.Fragment>
    )
}
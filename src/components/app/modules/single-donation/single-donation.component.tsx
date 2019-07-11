import React, { useState } from 'react'
import { SingleDonationWrapper, InputWrapper, KIDTextWrapper } from "./single-donation.style.component";
import KIDComponent from "../kid/kid.component";
import { EffektText } from "../../style/elements/text.style";
import { EffektSelect } from "../../style/elements/select.style"

import { EffektDatePicker } from '../../style/elements/datepicker.style';
import "react-datepicker/dist/react-datepicker.css";

export const SingleDonation: React.FunctionComponent = (props) => {
    const [startDate, setStartDate] = useState<Date | null>(new Date())

    

    return (
        <SingleDonationWrapper>
            <InputWrapper>
                <EffektDatePicker
                    selected={startDate}
                    onChange={(newDate) => setStartDate(newDate)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat="dd.MM.yyyy HH:mm"
                    timeCaption="time"
                />
                <KIDTextWrapper><EffektText placeholder="KID" style={{ width: '90px', height: '100%' }}></EffektText></KIDTextWrapper>
                <EffektText placeholder="Sum" style={{ width: '90px' }}></EffektText>
                <EffektText placeholder="Repeat sum" style={{ width: '90px' }}></EffektText>
                <EffektText placeholder="External ref." style={{ width: '90px' }}></EffektText>
                <EffektSelect placeholder="Payment method" style={{ width: '90px' }}></EffektSelect>
            </InputWrapper>
            <KIDComponent></KIDComponent>
        </SingleDonationWrapper>
    )
}
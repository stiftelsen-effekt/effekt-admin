import React, { useState } from 'react'
import { SingleDonationWrapper, InputWrapper, KIDTextWrapper } from "./single-donation.style.component";
import KIDComponent from "../kid/kid.component";
import { EffektText } from "../../style/elements/text.style";
import { EffektSelect } from "../../style/elements/select.style"

import { EffektDatePicker } from '../../style/elements/datepicker.style';
import "react-datepicker/dist/react-datepicker.css";
import { IPaymentMethod } from '../../../../models/dbtypes';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../../../models/state';
import { fetchPaymentMethodsRequest } from './single-donation.actions';

export const SingleDonation: React.FunctionComponent = (props) => {
    const [startDate, setStartDate] = useState<Date | null>(new Date())

    const dispatch = useDispatch()
    const paymentMethods = useSelector<AppState, Array<IPaymentMethod> | undefined>((state: AppState) => state.singleDonation.paymentMethods)

    let paymentOptions = null;
    if (!paymentMethods) dispatch(fetchPaymentMethodsRequest())
    else {
        paymentOptions = paymentMethods.map((method, i) => (
            <option key={i} value={method.id}>{method.name}</option>
        ));
    }

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
                    timeCaption="time" />
                <KIDTextWrapper><EffektText placeholder="KID" style={{ width: '90px', height: '100%' }}></EffektText></KIDTextWrapper>
                <EffektText placeholder="Sum" style={{ width: '90px' }}></EffektText>
                <EffektText placeholder="Repeat sum" style={{ width: '90px' }}></EffektText>
                <EffektText placeholder="External ref." style={{ width: '90px' }}></EffektText>
                <EffektSelect placeholder="Payment method" style={{ width: '90px' }}>
                    {paymentOptions}
                </EffektSelect>
            </InputWrapper>
            <KIDComponent></KIDComponent>
        </SingleDonationWrapper>
    )
}
import React, { useState, useCallback } from 'react'
import { Page } from "../../style/elements/page.style";
import { MainHeader, SubHeader } from "../../style/elements/headers.style";
import { EffektDatePicker } from '../../style/elements/datepicker.style';
import { EffektButton } from '../../style/elements/button.style';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../../../models/state';
import { fetchPaymentMethodsRequest } from '../../modules/single-donation/single-donation.actions';
import { EffektSwitch, SwitchSelected } from '../../style/elements/effekt-switch/effekt-switch.component';

export enum ReportFileFormats {
    EXCEL,
    JSON
}

export const ReportsComponent: React.FunctionComponent = () => {
    const dispatch = useDispatch()

    const [from, setFrom] = useState<Date | null>()
    const [to, setTo] = useState<Date | null>()

    //TODO: Move payment methods to different place in state
    const paymentMethods = useSelector((state: AppState) => state.singleDonation.paymentMethods)
    //TODO: Rewrite to FSA
    if (!paymentMethods) dispatch(fetchPaymentMethodsRequest())

    const [paymentMethodId, setPaymentMethodId] = useState<number>()
    const [fileFormat, setFileFormat] = useState<ReportFileFormats>()

    if (from && to && paymentMethodId && setPaymentMethodId && fileFormat)
        console.log("yay")

    const download = () => {
        alert('JUST DO IT!')
    }

    const fileFormatChanged = useCallback((selected: SwitchSelected) => setFileFormat(selected === SwitchSelected.LEFT ? ReportFileFormats.EXCEL : ReportFileFormats.JSON ), [setFileFormat])

    return (
        <Page>
            <MainHeader>Reports</MainHeader>
            <SubHeader>Transaction reports</SubHeader>
            <div>
                <EffektDatePicker 
                    onChange={(date) => setFrom(date)}
                    selected={from}
                    placeholderText="from"
                    dateFormat="dd.MM.yyyy"></EffektDatePicker>
                <span>-></span>
                <EffektDatePicker 
                    onChange={(date) => setTo(date)}
                    selected={to}
                    placeholderText="to"
                    dateFormat="dd.MM.yyyy"></EffektDatePicker>
            </div>

            <EffektSwitch left="Excel" right="JSON" onChange={fileFormatChanged} ></EffektSwitch>
            <EffektButton onClick={download}>Download</EffektButton>
        </Page>
    )
}
import React, { useState, useCallback } from 'react'
import { Page } from "../../style/elements/page.style";
import { MainHeader, SubHeader } from "../../style/elements/headers.style";
import { EffektDatePicker } from '../../style/elements/datepicker/datepicker.style';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../../../models/state';
import { fetchPaymentMethodsAction } from '../../modules/single-donation/single-donation.actions';
import { EffektSwitch, SwitchSelected } from '../../style/elements/effekt-switch/effekt-switch.component';
import { EffektCheckChoice, EffektCheckForm } from '../../style/elements/effekt-check/effekt-check-form.component';
import { API_URL } from '../../../../config/config';
import { DateTime } from 'luxon';
import { EffektButton } from '../../style/elements/button.style';
import { grey30 } from '../../style/colors';
import rightArrow from '../../../../assets/right-arrow.svg'
import { FormSection, FormSectionHeader } from '../../style/elements/from-section';

export enum ReportFileFormats {
    EXCEL,
    JSON
}

export const ReportsComponent: React.FunctionComponent = () => {
    const dispatch = useDispatch()

    const token = useSelector((state:AppState) => state.auth.currentToken)

    const [from, setFrom] = useState<Date | null>()
    const [to, setTo] = useState<Date | null>(new Date())

    //TODO: Move payment methods to different place in state
    const paymentMethods = useSelector((state: AppState) => state.singleDonation.paymentMethods)
    //TODO: Rewrite to FSA
    if (paymentMethods.length === 0) dispatch(fetchPaymentMethodsAction.started())

    const [paymentMethodIds, setPaymentMethodIds] = useState<Array<number>>([4])
    let paymentMethodChoices: Array<EffektCheckChoice> = paymentMethods.map(method => ({
        label: method.abbriviation,
        value: method.id,
        selected: paymentMethodIds.indexOf(method.id) !== -1
    }))

    const [fileFormat, setFileFormat] = useState<ReportFileFormats>(ReportFileFormats.EXCEL)
    const fileFormatChanged = useCallback((selected: SwitchSelected) => setFileFormat(selected === SwitchSelected.LEFT ? ReportFileFormats.EXCEL : ReportFileFormats.JSON ), [setFileFormat])

    const reportRangeUrl = `${API_URL}/reports/range?pretty`
    let form = React.createRef<HTMLFormElement>()

    return (
        <Page>
            <MainHeader>Reports</MainHeader>
            <SubHeader>Transaction reports</SubHeader>
            <form method="POST" action={reportRangeUrl} target="_blank" ref={form}>
                {/* Consider splitting each section into subcomponents */}
                <FormSection>
                    <FormSectionHeader>Range</FormSectionHeader>

                    <EffektDatePicker 
                        onChange={(date) => setFrom(date)}
                        selected={from}
                        placeholderText="from"
                        dateFormat="dd.MM.yyyy"></EffektDatePicker>
                    <input
                        type="hidden"
                        name="fromDate"
                        value={(from ? DateTime.fromJSDate(from).toISODate().toString() : '')} />
                    <img src={rightArrow} style={{ margin: '0 12px', height: '20px', verticalAlign: 'middle' }} alt="arrow" />
                    <EffektDatePicker 
                        onChange={(date) => setTo(date)}
                        selected={to}
                        placeholderText="to"
                        dateFormat="dd.MM.yyyy"></EffektDatePicker>
                    <input
                        type="hidden"
                        name="toDate"
                        value={(to ? DateTime.fromJSDate(to).toISODate().toString()  : '')} />

                    <span style={{ color: grey30, marginLeft: '14px', fontSize: '14px' }}>Date range is inclusive</span>
                </FormSection>

                <FormSection>
                    <FormSectionHeader>Payment methods</FormSectionHeader>

                    <EffektCheckForm 
                        choices={paymentMethodChoices} 
                        onChange={(choices) => setPaymentMethodIds(choices)} />
                    <input
                        type="hidden"
                        name="paymentMethodIDs"
                        value={paymentMethodIds.join("|")} />
                </FormSection>

                <FormSection>
                    <FormSectionHeader>Filetype</FormSectionHeader>

                    <EffektSwitch 
                        left="Excel" 
                        right="JSON" 
                        selected={(fileFormat === ReportFileFormats.EXCEL ? SwitchSelected.LEFT : SwitchSelected.RIGHT)} 
                        onChange={fileFormatChanged} />
                    <input 
                        type="hidden" 
                        name="filetype"
                        value={(fileFormat === ReportFileFormats.EXCEL ? "excel" : "json")}></input>
                </FormSection>
                
                <input type="hidden" name="token" value={(token ? token.token : '')}></input>
                
                <EffektButton onClick={() => form.current && form.current.submit()}>Download</EffektButton>
            </form>
        </Page>
    )
}
import React from 'react'

import { Page } from "../../style/elements/page.style";
import { MainHeader, GreenBox, RedBox } from "../../style/elements/headers.style";
import { IInvalidTransaction } from "../../../../models/types";
import { useSelector, useDispatch } from "react-redux";
import { AppState, ReportProcessingState } from "../../../../models/state";
import { Redirect } from "react-router";
import { EffektDisplayTable } from '../../style/elements/display-table/display-table.component.style';
import { SingleDonation } from '../../modules/single-donation/single-donation.component';
import { popInvalidTransaction } from './process.actions';

export const ProcessDonations: React.FunctionComponent = (props) => {
    const processingState: ReportProcessingState = useSelector((state: AppState) => state.reportProcessing)
    const current: IInvalidTransaction = processingState.invalidTransactions[processingState.invalidTransactions.length-1]

    const dispatch = useDispatch()

    if (processingState.invalidTransactions.length === 0) {
        return (
            <Redirect to="/register"></Redirect>
        )
    }

    const ignoreTransaction = () => {
        console.log("ignore")
        dispatch(popInvalidTransaction())
    }

    return (
        <Page>
            <MainHeader>Report upload - Manual review</MainHeader>

            <GreenBox>
                <strong>{processingState.valid}</strong> processed donations, 
                <strong>{processingState.invalid}</strong> up for manual review
            </GreenBox>
            <RedBox>
                <div className="header">Reason for failure</div>
                <span>{current.reason}</span>
            </RedBox>

            <EffektDisplayTable style={{ marginBottom: '40px', marginTop: '30px' }}>
                <thead>
                    <tr>
                        <th>Saleslocation</th>
                        <th>Name</th>
                        <th>Message</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{current.transaction.location}</td>
                        <td>{current.transaction.name}</td>
                        <td>{current.transaction.message}</td>
                    </tr>
                </tbody>
            </EffektDisplayTable>

            <SingleDonation 
                suggestedValues={{
                    sum: current.transaction.amount,
                    paymentExternalRef: current.transaction.transactionID,
                    paymentId: 4,
                    timestamp: current.transaction.date
                }}
                onIgnore={ignoreTransaction}></SingleDonation>
        </Page>
    )
}
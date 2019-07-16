import React from 'react'

import { Page } from "../../style/elements/page.style";
import { MainHeader, GreenBox, RedBox } from "../../style/elements/headers.style";
import { useState } from "react";
import { IInvalidTransaction } from "../../../../models/types";
import { useSelector, useDispatch } from "react-redux";
import { AppState, ReportProcessingState } from "../../../../models/state";
import { Redirect } from "react-router";
import { EffektDisplayTable } from '../../style/elements/display-table/display-table.component.style';
import { SingleDonation } from '../../modules/single-donation/single-donation.component';
import { popInvalidTransaction } from './process.actions';

interface IState {
    current: IInvalidTransaction
}

export const ProcessDonations: React.FunctionComponent = (props) => {
    const processingState: ReportProcessingState = useSelector((state: AppState) => state.reportProcessing)
    
    const getDefaultState = (): IState => {
        return {
            current: processingState.invalidTransactions[processingState.invalidTransactions.length-1]
        }
    }
    const [state, setState] = useState<IState>(getDefaultState())
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

    const transaction = state.current.transaction
    return (
        <Page>
            <MainHeader>Report upload - Manual review</MainHeader>

            <GreenBox><strong>{processingState.valid}</strong> processed donations, <strong>{processingState.invalid}</strong> up for manual review</GreenBox>
            <RedBox>
                <div className="header">Reason for failure</div>
                <span>{state.current.reason}</span>
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
                        <td>{transaction.location}</td>
                        <td>{transaction.name}</td>
                        <td>{transaction.message}</td>
                    </tr>
                </tbody>
            </EffektDisplayTable>

            <SingleDonation 
                sum={transaction.amount} 
                repeatSum={transaction.amount}
                externalRef={transaction.transactionID}
                paymentMethodId={4}
                selectedDate={transaction.date}
                onIgnore={ignoreTransaction}></SingleDonation>
        </Page>
    )
}
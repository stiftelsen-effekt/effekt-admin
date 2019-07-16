import React, { useState } from 'react'
import { SingleDonationWrapper, InputWrapper, KIDTextWrapper, ControlsWrapper, DonationInput } from "./single-donation.style.component";
import KIDComponent from "../kid/kid.component";
import { EffektSelect } from "../../style/elements/select.style"

import { EffektDatePicker } from '../../style/elements/datepicker.style';
import "react-datepicker/dist/react-datepicker.css";
import { IPaymentMethod, IDonor } from '../../../../models/dbtypes';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../../../models/state';
import { fetchPaymentMethodsRequest, createDistribitionAndInsertDonationAction, IInsertDonationParams, ICreateDistributionParams } from './single-donation.actions';
import { EffektButton } from '../../style/elements/button.style';
import { IDistribution } from '../kid/kid.models';
import { Decimal } from 'decimal.js';
import { toast } from 'react-toastify';

interface IState {
    selectedDate: Date | null,
    distribution: Array<IDistribution>,
    sum: number | undefined,
    repeatSum: number | undefined,
    externalRef: string | undefined,
    paymentMethodId: number | undefined
}

export const SingleDonation: React.FunctionComponent = (props) => {
    const [state, setState] = useState<IState>({
        selectedDate: new Date(),
        distribution: [],
        sum: 200,
        repeatSum: 200,
        externalRef: "abc",
        paymentMethodId: 1
    })

    const dispatch = useDispatch()
    const paymentMethods = useSelector<AppState, Array<IPaymentMethod> | undefined>((state: AppState) => state.singleDonation.paymentMethods)
    const selectedDonor = useSelector<AppState, IDonor | undefined>((state: AppState) => state.donorSelector.selectedDonor)

    let paymentOptions = null;
    if (!paymentMethods) dispatch(fetchPaymentMethodsRequest())
    else {
        paymentOptions = paymentMethods.map((method, i) => (
            <option key={i} value={method.id}>{method.name}</option>
        ));
    }

    const submit = () => {
        if (selectedDonor &&
            state.sum !== undefined &&
            state.paymentMethodId !== undefined  &&
            state.selectedDate !== undefined &&
            state.externalRef !== undefined) {
            let filteredDistribution = state.distribution.filter((dist) => !dist.value.equals(new Decimal(0)));

            const donationParams: IInsertDonationParams = {
                sum: state.sum,
                
                KID: undefined,
                time: state.selectedDate,
                externalRef: state.externalRef,
                methodId: state.paymentMethodId
            }

            const distributionParams: ICreateDistributionParams = {
                distribution: filteredDistribution,
                donor: selectedDonor
            }
            
            dispatch(createDistribitionAndInsertDonationAction.started({
                donation: donationParams,
                distribution: distributionParams
            }))
        }
        else {
            toast.error('Missing fields')
        }
    }

    return (
        <SingleDonationWrapper>
            <InputWrapper>
                <EffektDatePicker
                    selected={state.selectedDate}
                    onChange={(selectedDate) => setState({...state, selectedDate })}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat="dd.MM.yyyy HH:mm"
                    timeCaption="time" />
                <KIDTextWrapper><DonationInput placeholder="KID" style={{ height: '100%' }}></DonationInput></KIDTextWrapper>
                <DonationInput placeholder="Sum"            onChange={(e) => setState({ ...state, sum: parseInt(e.target.value) })} />
                <DonationInput placeholder="Repeat sum"     onChange={(e) => setState({ ...state, repeatSum: parseInt(e.target.value) })} />
                <DonationInput placeholder="External ref."  onChange={(e) => setState({ ...state, externalRef: e.target.value })} />
                <EffektSelect placeholder="Payment method"  onChange={(e) => setState({ ...state, paymentMethodId: parseInt(e.target.value) })}>
                    {paymentOptions}
                </EffektSelect>
            </InputWrapper>
            <KIDComponent onChange={(distribution: Array<IDistribution>) => setState({ ...state, distribution })}></KIDComponent>

            <ControlsWrapper>
                <EffektButton onClick={submit}>Insert</EffektButton>
            </ControlsWrapper>
        </SingleDonationWrapper>
    )
}
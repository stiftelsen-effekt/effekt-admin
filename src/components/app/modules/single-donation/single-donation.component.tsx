import React, { useState } from 'react'
import { SingleDonationWrapper, InputWrapper, ControlsWrapper } from "./single-donation.style.component";

import { IPaymentMethod, IDonor, IDonation } from '../../../../models/types';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../../../models/state';
import { fetchPaymentMethodsRequest, createDistribitionAndInsertDonationAction, ICreateDistributionParams } from './single-donation.actions';
import { IDistribution } from '../kid/kid.models';
import { Decimal } from 'decimal.js';

import { DonationControls } from './controls/donation-controls.component';
import KIDComponent from "../kid/kid.component";
import { DonationInput } from './input/donation-input.component';
import { toast } from 'react-toastify';

interface IState {
    donationInput?: Partial<IDonation>,
    distribution?: Array<IDistribution>
}

interface IProps {
    onIgnore?(): void,
    suggestedValues?: Partial<IDonation>
}

export const SingleDonation: React.FunctionComponent<IProps> = (props: IProps) => {
    const [state, setState] = useState<IState>({})
    const dispatch = useDispatch()
    
    const paymentMethods = useSelector<AppState, Array<IPaymentMethod>>((state: AppState) => state.singleDonation.paymentMethods)
    if (paymentMethods.length === 0) dispatch(fetchPaymentMethodsRequest())

    const selectedDonor = useSelector<AppState, IDonor | undefined>((state: AppState) => state.donorSelector.selectedDonor)

    const getFilteredDistribution = (distribution: Array<IDistribution>) => {
        return distribution.filter((dist) => !dist.value.equals(new Decimal(0)));
    }

    const getDonation = (input: Partial<IDonation>): IDonation | null => {
        if (input.sum !== undefined,
            input.paymentId !== undefined,
            input.paymentExternalRef !== undefined,
            input.timestamp !== undefined)
            return input as IDonation
        else
            return null
    }

    const submit = () => {
        if (!selectedDonor)
            return toast.error('No donor selected')
        if (!state.distribution || !state.donationInput) 
            return toast.error('Error initializing distribution or input')

        const donation = getDonation(state.donationInput)

        if (!donation)
            return toast.error('Missing fields')

        const filteredDistribution = getFilteredDistribution(state.distribution);

        const donationParams: IDonation = donation;
        const distributionParams: ICreateDistributionParams = {
            distribution: filteredDistribution,
            donor: selectedDonor
        }
        
        dispatch(createDistribitionAndInsertDonationAction.started({
            donation: donationParams,
            distribution: distributionParams
        }))
    }

    return (
        <SingleDonationWrapper>
            <InputWrapper>
                <DonationInput
                    suggestedValues={props.suggestedValues}
                    paymentMethods={paymentMethods}
                    onChange={(donationInput) => setState({...state, donationInput})}></DonationInput>
            </InputWrapper>
            <KIDComponent
                donationAmount={state.donationInput && state.donationInput.sum}
                onChange={(distribution: Array<IDistribution>) => setState({ ...state, distribution })}></KIDComponent>
            <ControlsWrapper>
                <DonationControls 
                    onInsert={() => submit()}
                    onIgnore={props.onIgnore}></DonationControls>
            </ControlsWrapper>
        </SingleDonationWrapper>
    )
}
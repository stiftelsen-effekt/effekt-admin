import React, { useState, useEffect } from 'react'
import { SingleDonationWrapper, InputWrapper, KIDTextWrapper, ControlsWrapper, DonationInput } from "./single-donation.style.component";
import KIDComponent from "../kid/kid.component";

import { EffektDatePicker } from '../../style/elements/datepicker.style';
import "react-datepicker/dist/react-datepicker.css";
import { IPaymentMethod, IDonor } from '../../../../models/types';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../../../models/state';
import { fetchPaymentMethodsRequest, createDistribitionAndInsertDonationAction, IInsertDonationParams, ICreateDistributionParams } from './single-donation.actions';
import { EffektButton, EffektSecondaryButton } from '../../style/elements/button.style';
import { IDistribution } from '../kid/kid.models';
import { Decimal } from 'decimal.js';
import { toast } from 'react-toastify';
import Select from 'react-select';

interface ICommonPropsAndState {
    selectedDate?: Date | null,
    sum?: number,
    repeatSum?: number,
    externalRef?: string,
    paymentMethodId?: number,
}

interface IState extends ICommonPropsAndState {
    distribution: Array<IDistribution>
    paymentMethodId: number
}

interface IProps extends ICommonPropsAndState {
    onIgnore?(): void
}

export const SingleDonation: React.FunctionComponent<IProps> = (props: IProps) => {
    const getDefaultState = ():IState => {
        return {
            selectedDate: props.selectedDate || new Date(),
            sum: props.sum || 200,
            repeatSum: props.repeatSum || 200,
            externalRef: props.externalRef || "abc",
            paymentMethodId: props.paymentMethodId || 4,

            distribution: [],
        }
    }
    
    const [state, setState] = useState<IState>(getDefaultState())

    useEffect(() => setState(
        // eslint-disable-next-line react-hooks/exhaustive-deps
        getDefaultState()), [props])

    const dispatch = useDispatch()
    const paymentMethods = useSelector<AppState, Array<IPaymentMethod> | undefined>((state: AppState) => state.singleDonation.paymentMethods)
    if (!paymentMethods) dispatch(fetchPaymentMethodsRequest())
    const selectedDonor = useSelector<AppState, IDonor | undefined>((state: AppState) => state.donorSelector.selectedDonor)

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

    const methodToOption = (method: IPaymentMethod) => {
        return {value: method.id, label: method.name}
    }

    let ignoreButton;
    if (props.onIgnore !== undefined) {
        let onIgnore = props.onIgnore;
        ignoreButton = <EffektSecondaryButton onClick={() => onIgnore()} style={{ marginRight: '20px' }}>Ignore</EffektSecondaryButton>
    }

    let methodsSelect;
    if (paymentMethods) {
        let currentPaymentOption = paymentMethods.find((method) => method.id === state.paymentMethodId);
        if (currentPaymentOption) {
            methodsSelect = <div style={{width: '120px'}}><Select 
                options={paymentMethods.map(method => methodToOption(method))}
                value={methodToOption(currentPaymentOption)}
                onChange={(selected: any) => setState({...state,paymentMethodId: selected.value})}></Select>
            </div>
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
                <DonationInput value={state.sum} placeholder="Sum"            onChange={(e) => setState({ ...state, sum: parseInt(e.target.value) })} />
                <DonationInput value={state.repeatSum} placeholder="Repeat sum"     onChange={(e) => setState({ ...state, repeatSum: parseInt(e.target.value) })} />
                <DonationInput value={state.externalRef} placeholder="External ref."  onChange={(e) => setState({ ...state, externalRef: e.target.value })} />
                {methodsSelect}
            </InputWrapper>
            <KIDComponent onChange={(distribution: Array<IDistribution>) => setState({ ...state, distribution })}></KIDComponent>

            <ControlsWrapper>
                {ignoreButton}
                <EffektButton onClick={submit}>Insert</EffektButton>
            </ControlsWrapper>
        </SingleDonationWrapper>
    )
}
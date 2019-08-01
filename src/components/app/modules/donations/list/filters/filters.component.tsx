import React, { useState } from 'react'

import { FilterWrapper, FilterGroupHeader, FilterDateRange, FilterInput, FilterDateRangeWrapper, FilterGroup, FilterHeader } from "./filters.component.style";
import { HistogramInputComponent } from './histogram-input/histogram-input.component';
import { EffektCheckForm, EffektCheckChoice } from '../../../../style/elements/effekt-check/effekt-check-form.component';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../../../../../models/state';
import { fetchPaymentMethodsAction } from '../../../single-donation/single-donation.actions';
import { setDonationFilterKid, setDonationFilterDateRange, setDonationFilterSumRange } from './filters.actions';
import { fetchDonationsAction } from '../donations-list.actions';

export const FilterComponent: React.FunctionComponent = () => {
    const dispatch = useDispatch()

    const donationDateRange = useSelector((state: AppState) => state.donations.filter.date)
    const donationSumRange = useSelector((state: AppState) => state.donations.filter.sum)
    const kid = useSelector((state: AppState) => state.donations.filter.KID)
    const paymentMethods = useSelector((state: AppState) => state.singleDonation.paymentMethods)
    if (paymentMethods.length === 0) dispatch(fetchPaymentMethodsAction.started())

    const [paymentMethodIds, setPaymentMethodIds] = useState<Array<number>>([2,3,4])
    let paymentMethodChoices: Array<EffektCheckChoice> = paymentMethods.map(method => ({
        label: method.abbriviation,
        value: method.id,
        selected: paymentMethodIds.indexOf(method.id) !== -1
    }))

    return (
        <FilterWrapper>
            <FilterHeader>Filters</FilterHeader>

            <FilterGroup>
                <FilterGroupHeader>Date range</FilterGroupHeader>
                <FilterDateRangeWrapper><FilterDateRange 
                    from={donationDateRange.from}
                    to={donationDateRange.to}
                    onChangeFrom={(date) => dispatch(setDonationFilterDateRange(date, donationDateRange.to))}
                    onChangeTo={(date) => dispatch(setDonationFilterDateRange(donationDateRange.from, date))}></FilterDateRange>
                </FilterDateRangeWrapper>
            </FilterGroup>

            <FilterGroup>
                <FilterGroupHeader>Donation sum</FilterGroupHeader>
                <HistogramInputComponent
                    range={[donationSumRange.from, donationSumRange.to]}
                    onChange={(range) => {
                        dispatch(setDonationFilterSumRange(Math.min(...range), Math.max(...range)))
                        dispatch(fetchDonationsAction.started())
                    } }>
                </HistogramInputComponent>
            </FilterGroup>
            
            <FilterGroup>
                <FilterGroupHeader>KID like</FilterGroupHeader>
                <FilterInput 
                    value={kid}
                    placeholder={"Fuzzy search"} 
                    style={{width: '100%'}}
                    onChange={(e) => {
                        dispatch(setDonationFilterKid(e.target.value))
                        dispatch(fetchDonationsAction.started())
                    }} ></FilterInput>
            </FilterGroup>

            <FilterGroup>
                <FilterGroupHeader>Payment method</FilterGroupHeader>
                <EffektCheckForm
                    choices={paymentMethodChoices}
                    onChange={(choices) => setPaymentMethodIds(choices)} 
                    ></EffektCheckForm>
            </FilterGroup>
        </FilterWrapper>
    )
}
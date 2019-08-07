import React, { useState } from 'react'

import { FilterWrapper, FilterGroupHeader, FilterDateRange, FilterInput, FilterDateRangeWrapper, FilterGroup, FilterHeader } from "../../../../style/elements/filters.component.style";
import { HistogramInputComponent } from './histogram-input/histogram-input.component';
import { EffektCheckForm, EffektCheckChoice } from '../../../../style/elements/effekt-check/effekt-check-form.component';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../../../../../models/state';
import { fetchPaymentMethodsAction } from '../../../single-donation/single-donation.actions';
import { setDonationFilterKid, setDonationFilterDateRange, setDonationFilterSumRange, setDonationFilterPaymentMethodIDs } from './filters.actions';
import { fetchDonationsAction } from '../donations-list.actions';
import { fetchHistogramAction } from '../../../../../../store/donations/donation.actions';
import { FilterOpenButton } from '../../../../style/elements/filter-buttons/filter-open-button.component';

export const DonationsFilterComponent: React.FunctionComponent = () => {
    const dispatch = useDispatch()

    const donationDateRange = useSelector((state: AppState) => state.donations.filter.date)
    const donationSumRange = useSelector((state: AppState) => state.donations.filter.sum)
    const kid = useSelector((state: AppState) => state.donations.filter.KID)
    const selectedPaymentMethodIDs = useSelector((state: AppState) => state.donations.filter.paymentMethodIDs)

    const paymentMethods = useSelector((state: AppState) => state.singleDonation.paymentMethods)
    if (paymentMethods.length === 0) dispatch(fetchPaymentMethodsAction.started())

    const histogram = useSelector((state: AppState) => state.donations.histogram)
    if (!histogram) dispatch(fetchHistogramAction.started())

    let paymentMethodChoices: Array<EffektCheckChoice> = paymentMethods.map(method => ({
        label: method.abbriviation,
        value: method.id,
        selected: selectedPaymentMethodIDs.indexOf(method.id) !== -1
    }))

    const [filterIsOpen, setFilterIsOpen] = useState<boolean>(false)

    if (!histogram || !paymentMethods) return <FilterWrapper isOpen={filterIsOpen}>Loading...</FilterWrapper>
    return (
        <FilterWrapper isOpen={filterIsOpen}>
            <FilterOpenButton onClick={() => setFilterIsOpen(!filterIsOpen)}></FilterOpenButton>
            <FilterHeader>Filters</FilterHeader>

            <FilterGroup>
                <FilterGroupHeader>Date range</FilterGroupHeader>
                <FilterDateRangeWrapper><FilterDateRange 
                    from={donationDateRange.from}
                    to={donationDateRange.to}
                    onChangeFrom={(date) => { 
                        dispatch(setDonationFilterDateRange(date, donationDateRange.to))
                        dispatch(fetchDonationsAction.started())
                    }}
                    onChangeTo={(date) => {
                        dispatch(setDonationFilterDateRange(donationDateRange.from, date))
                        dispatch(fetchDonationsAction.started())
                    }}></FilterDateRange>
                </FilterDateRangeWrapper>
            </FilterGroup>

            <FilterGroup>
                <FilterGroupHeader>Donation sum</FilterGroupHeader>
                <HistogramInputComponent
                    range={[donationSumRange.from, donationSumRange.to]}
                    histogram={histogram}
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
                    azure={true}
                    choices={paymentMethodChoices}
                    onChange={(choices: Array<number>) => {
                       dispatch(setDonationFilterPaymentMethodIDs(choices))
                       dispatch(fetchDonationsAction.started())
                    }}></EffektCheckForm>
            </FilterGroup>
        </FilterWrapper>
    )
}
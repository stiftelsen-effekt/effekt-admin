import React, { useState } from 'react';

import {
  FilterWrapper,
  FilterGroupHeader,
  FilterDateRange,
  FilterInput,
  FilterDateRangeWrapper,
  FilterGroup,
  FilterHeader,
  FilterContent,
} from '../../../../style/elements/filters.component.style';
import { HistogramInputComponent } from '../../../histogram-input/HistogramInput';
import {
  EffektCheckForm,
  EffektCheckChoice,
} from '../../../../style/elements/effekt-check/effekt-check-form.component';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../../../../models/state';
import { fetchPaymentMethodsAction } from '../../../../../store/single-donation/single-donation.actions';
import {
  setDonationFilterKid,
  setDonationFilterDonor,
  setDonationFilterDateRange,
  setDonationFilterSumRange,
  setDonationFilterPaymentMethodIDs,
} from '../../../../../store/donations/donation-filters.actions';
import { fetchHistogramAction } from '../../../../../store/donations/donation.actions';
import { FilterOpenButton } from '../../../../style/elements/filter-buttons/filter-open-button.component';

export const DonationsFilterComponent: React.FunctionComponent = () => {
  const dispatch = useDispatch();

  const donationDateRange = useSelector((state: AppState) => state.donations.filter.date);
  const donationSumRange = useSelector((state: AppState) => state.donations.filter.sum);
  const kid = useSelector((state: AppState) => state.donations.filter.KID);
  const donor = useSelector((state: AppState) => state.donations.filter.donor);
  const selectedPaymentMethodIDs = useSelector(
    (state: AppState) => state.donations.filter.paymentMethodIDs
  );

  const paymentMethods = useSelector((state: AppState) => state.singleDonation.paymentMethods);
  if (paymentMethods.length === 0) dispatch(fetchPaymentMethodsAction.started(undefined));

  const histogram = useSelector((state: AppState) => state.donations.histogram);
  if (!histogram) dispatch(fetchHistogramAction.started(undefined));

  let paymentMethodChoices: Array<EffektCheckChoice> = paymentMethods.map((method) => ({
    label: method.abbriviation,
    value: method.id,
    selected: selectedPaymentMethodIDs.indexOf(method.id) !== -1,
  }));

  const allPaymentMethods = new Set(paymentMethodChoices.reduce(
    (result: Array<number>, origChoice: EffektCheckChoice) => {
      result.push(origChoice.value);
      return result;
    },
    []
  ));

  const [filterIsOpen, setFilterIsOpen] = useState<boolean>(false);
  const [allChecked, setAllChecked] = useState<boolean>(true);
  const [activePaymentMethods, setActivePaymentMethods] = useState(new Set([2,3,4,5,6,7,8]));

  

  function clickfunction(value: number, checked: boolean){
    var newActivePaymentMethods = activePaymentMethods;
    if (value === 99){
      if (checked){
        setAllChecked(true);
        newActivePaymentMethods = allPaymentMethods;
      }
      else{
        setAllChecked(false);
        newActivePaymentMethods = new Set<number>();
      }
    }
    else{
      if (checked){
        newActivePaymentMethods.add(value);
      }
      else{
        setAllChecked(false);
        newActivePaymentMethods.delete(value);
      }
    }
    setActivePaymentMethods(newActivePaymentMethods);
    dispatch(setDonationFilterPaymentMethodIDs(Array.from(newActivePaymentMethods)));
  }

  if (!histogram || !paymentMethods)
    return <FilterWrapper isOpen={filterIsOpen}>Loading...</FilterWrapper>;
  return (
    <FilterWrapper isOpen={filterIsOpen}>
      <FilterContent>
        <FilterOpenButton
          isOpen={filterIsOpen}
          onClick={() => setFilterIsOpen(!filterIsOpen)}
        ></FilterOpenButton>
        <FilterHeader>Filters</FilterHeader>

        <FilterGroup>
          <FilterGroupHeader>Date range</FilterGroupHeader>
          <FilterDateRangeWrapper>
            <FilterDateRange
              from={donationDateRange.from}
              to={donationDateRange.to}
              onChangeFrom={(date) => {
                dispatch(setDonationFilterDateRange(date, donationDateRange.to));
              }}
              onChangeTo={(date) => {
                dispatch(setDonationFilterDateRange(donationDateRange.from, date));
              }}
            ></FilterDateRange>
          </FilterDateRangeWrapper>
        </FilterGroup>

        <FilterGroup>
          <FilterGroupHeader>Donation sum</FilterGroupHeader>
          <HistogramInputComponent
            range={[donationSumRange.from, donationSumRange.to]}
            histogram={histogram}
            onChange={(range) => {
              dispatch(setDonationFilterSumRange(Math.min(...range), Math.max(...range)));
            }}
          ></HistogramInputComponent>
        </FilterGroup>

        <FilterGroup>
          <FilterGroupHeader>Donor like</FilterGroupHeader>
          <FilterInput
            value={donor}
            placeholder={'Fuzzy search'}
            style={{ width: '100%' }}
            onChange={(e) => {
              dispatch(setDonationFilterDonor(e.target.value));
            }}
          ></FilterInput>
        </FilterGroup>

        <FilterGroup>
          <FilterGroupHeader>KID like</FilterGroupHeader>
          <FilterInput
            value={kid}
            placeholder={'Fuzzy search'}
            style={{ width: '100%' }}
            onChange={(e) => {
              dispatch(setDonationFilterKid(e.target.value));
            }}
          ></FilterInput>
        </FilterGroup>

        <FilterGroup>
          <FilterGroupHeader>Payment method</FilterGroupHeader>
          <EffektCheckForm
            azure={true}
            choices={paymentMethodChoices}
            allChecked={allChecked}
            onChange={(value: number, checked: boolean) => {
              clickfunction(value, checked);}}
          ></EffektCheckForm>
        </FilterGroup>
      </FilterContent>
    </FilterWrapper>
  );
};

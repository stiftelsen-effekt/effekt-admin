import React, { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import {
  FilterWrapper,
  FilterGroupHeader,
  FilterDateRange,
  FilterInput,
  FilterDateRangeWrapper,
  FilterGroup,
  FilterHeader,
  FilterContent,
} from '../../../elements/filters.component.style';
import { HistogramInputComponent } from './histogram-input/histogram-input.component';
import {
  EffektCheckForm,
  EffektCheckChoice,
} from '../../../elements/effekt-check/effekt-check-form.component';
import { AppState } from '../../../../../store/state';
import {
  setDonationFilterKid,
  setDonationFilterDonor,
  setDonationFilterDateRange,
  setDonationFilterSumRange,
  setDonationFilterPaymentMethodIDs,
} from '../../../../../store/donations/filter/filters.actions';
import { fetchHistogramAction } from '../../../../../store/donations/donation/donation.actions';
import { FilterOpenButton } from '../../../elements/filter-buttons/filter-open-button.component';
import { fetchPaymentMethodsAction } from '../../../../../store/donations/donation/single/single-donation.actions';

export const DonationsFilterComponent: React.FunctionComponent = () => {
  const dispatch = useDispatch();

  const donationDateRange = useSelector(
    (state: AppState) => state.donations.filter.date,
  );
  const donationSumRange = useSelector(
    (state: AppState) => state.donations.filter.sum,
  );
  const kid = useSelector((state: AppState) => state.donations.filter.KID);
  const donor = useSelector((state: AppState) => state.donations.filter.donor);
  const selectedPaymentMethodIDs = useSelector(
    (state: AppState) => state.donations.filter.paymentMethodIDs,
  );

  const paymentMethods = useSelector(
    (state: AppState) => state.singleDonation.paymentMethods,
  );
  if (paymentMethods.length === 0)
    dispatch(fetchPaymentMethodsAction.started(undefined));

  const histogram = useSelector((state: AppState) => state.donations.histogram);
  if (!histogram) dispatch(fetchHistogramAction.started(undefined));

  const paymentMethodChoices: Array<EffektCheckChoice> = paymentMethods.map(
    (method) => ({
      label: method.abbriviation,
      value: method.id,
      selected: selectedPaymentMethodIDs.indexOf(method.id) !== -1,
    }),
  );

  const [filterIsOpen, setFilterIsOpen] = useState<boolean>(false);

  if (!histogram || !paymentMethods)
    return <FilterWrapper isOpen={filterIsOpen}>Loading...</FilterWrapper>;
  return (
    <FilterWrapper isOpen={filterIsOpen}>
      <FilterContent>
        <FilterOpenButton
          isOpen={filterIsOpen}
          onClick={() => setFilterIsOpen(!filterIsOpen)}
        />
        <FilterHeader>Filters</FilterHeader>

        <FilterGroup>
          <FilterGroupHeader>Date range</FilterGroupHeader>
          <FilterDateRangeWrapper>
            <FilterDateRange
              from={donationDateRange.from}
              to={donationDateRange.to}
              onChangeFrom={(date) => {
                dispatch(
                  setDonationFilterDateRange(date, donationDateRange.to),
                );
              }}
              onChangeTo={(date) => {
                dispatch(
                  setDonationFilterDateRange(donationDateRange.from, date),
                );
              }}
            />
          </FilterDateRangeWrapper>
        </FilterGroup>

        <FilterGroup>
          <FilterGroupHeader>Donation sum</FilterGroupHeader>
          <HistogramInputComponent
            range={[donationSumRange.from, donationSumRange.to]}
            histogram={histogram}
            onChange={(range) => {
              dispatch(
                setDonationFilterSumRange(
                  Math.min(...range),
                  Math.max(...range),
                ),
              );
            }}
          />
        </FilterGroup>

        <FilterGroup>
          <FilterGroupHeader>Donor like</FilterGroupHeader>
          <FilterInput
            value={donor}
            placeholder="Fuzzy search"
            style={{ width: '100%' }}
            onChange={(e) => {
              dispatch(setDonationFilterDonor(e.target.value));
            }}
          />
        </FilterGroup>

        <FilterGroup>
          <FilterGroupHeader>KID like</FilterGroupHeader>
          <FilterInput
            value={kid}
            placeholder="Fuzzy search"
            style={{ width: '100%' }}
            onChange={(e) => {
              dispatch(setDonationFilterKid(e.target.value));
            }}
          />
        </FilterGroup>

        <FilterGroup>
          <FilterGroupHeader>Payment method</FilterGroupHeader>
          <EffektCheckForm
            azure
            choices={paymentMethodChoices}
            onChange={(choices: Array<number>) => {
              dispatch(setDonationFilterPaymentMethodIDs(choices));
            }}
          />
        </FilterGroup>
      </FilterContent>
    </FilterWrapper>
  );
};

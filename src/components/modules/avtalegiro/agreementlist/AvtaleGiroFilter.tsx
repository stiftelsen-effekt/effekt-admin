import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../../../models/state';
import {
  fetchAvtaleGiroAgreementsAction,
  fetchAvtaleGiroHistogramAction,
  setAvtaleGiroFilterActive,
  setAvtalegiroFilterAmount,
  setAvtaleGiroFilterDonor,
  setAvtaleGiroFilterKID,
  setAvtaleGiroFilterPaymentDate,
  setAvtaleGiroFilterDraftDate,
} from '../../../../store/avtalegiro/avtalegiro.actions';
import {
  EffektCheckChoice,
  EffektCheckForm,
} from '../../../style/elements/effekt-check/effekt-check-form.component';
import { FilterOpenButton } from '../../../style/elements/filter-buttons/filter-open-button.component';
import {
  FilterWrapper,
  FilterContent,
  FilterHeader,
  FilterGroup,
  FilterGroupHeader,
  FilterInput,
  FilterDateRangeWrapper,
  FilterDateRange,
} from '../../../style/elements/filters.component.style';
import { HistogramInputComponent } from '../../histogram-input/HistogramInput';
import EffektNumberRange from '../../../style/elements/effekt-range/effekt-range.component';

const statusTypes = [
  { name: 'STOPPED', id: 0 },
  { name: 'ACTIVE', id: 1 },
];

export const AvtaleGiroFilter: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const { getAccessTokenSilently } = useAuth0();

  const filter = useSelector((state: AppState) => state.avtaleGiroAgreements.filter);
  const histogram = useSelector((state: AppState) => state.avtaleGiroAgreements.histogram);
  const [filterIsOpen, setFilterIsOpen] = useState<boolean>(false);
  const amountRange = filter.amount;
  const KID = filter.KID;
  const draftDate = filter.created;
  const donor = filter.donor;
  const statuses = filter.statuses;

  useEffect(() => {
    getAccessTokenSilently().then((token) =>
      dispatch(fetchAvtaleGiroAgreementsAction.started({ token }))
    );
  }, [filter, dispatch, getAccessTokenSilently]);

  if (statuses) {
    if (!histogram)
      getAccessTokenSilently().then((token) =>
        dispatch(fetchAvtaleGiroHistogramAction.started({ token }))
      );

    let statusChoices: Array<EffektCheckChoice> = statusTypes.map((status) => ({
      label: status.name,
      value: status.id,
      // If status is not found, set box to unchecked
      selected: statuses.indexOf(status.id.toString()) !== -1,
    }));

    if (!histogram) return <FilterWrapper isOpen={filterIsOpen}>Loading...</FilterWrapper>;
    return (
      <FilterWrapper isOpen={filterIsOpen}>
        <FilterContent>
          <FilterOpenButton
            isOpen={filterIsOpen}
            onClick={() => setFilterIsOpen(!filterIsOpen)}
          ></FilterOpenButton>
          <FilterHeader>Filters</FilterHeader>

          <FilterGroup>
            <FilterGroupHeader>AvtaleGiro sum</FilterGroupHeader>
            <HistogramInputComponent
              range={[amountRange.from, amountRange.to]}
              histogram={histogram}
              onChange={(range: any) => {
                let minRange = range[0]
                let maxRange = range[1]
                if (isNaN(minRange)) minRange = 0
                if (isNaN(maxRange)) maxRange = 0
                dispatch(
                  setAvtalegiroFilterAmount({ from: minRange, to: maxRange })
                );
              }}
            ></HistogramInputComponent>
          </FilterGroup>

          <FilterGroup>
            <FilterGroupHeader>Donor like</FilterGroupHeader>
            <FilterInput
              value={donor}
              placeholder={'Fuzzy search'}
              style={{ width: '100%' }}
              onChange={(e: any) => {
                dispatch(setAvtaleGiroFilterDonor(e.target.value));
              }}
            ></FilterInput>
          </FilterGroup>

          <FilterGroup>
            <FilterGroupHeader>KID like</FilterGroupHeader>
            <FilterInput
              value={KID}
              placeholder={'Fuzzy search'}
              style={{ width: '100%' }}
              onChange={(e: any) => {
                dispatch(setAvtaleGiroFilterKID(e.target.value));
              }}
            ></FilterInput>
          </FilterGroup>

          <FilterGroup>
            <FilterGroupHeader>Status</FilterGroupHeader>
            <EffektCheckForm
              inverted={true}
              choices={statusChoices}
              onChange={(choices: Array<number>) => {
                let newChoices: number[] = [];
                choices.forEach((choiceID) => {
                  newChoices.push(statusTypes[choiceID].id);
                });
                dispatch(setAvtaleGiroFilterActive(newChoices));
              }}
            ></EffektCheckForm>
          </FilterGroup>

          <FilterGroup>
            <FilterGroupHeader>Charge day</FilterGroupHeader>
            <EffektNumberRange
              min={0}
              max={28}
              onChange={(from: number, to: number) => {
                dispatch(
                  setAvtaleGiroFilterPaymentDate({ from: from, to: to })
                );
              }}
            ></EffektNumberRange>
          </FilterGroup>

          <FilterGroup>
            <FilterGroupHeader>Draft date</FilterGroupHeader>
            <FilterDateRangeWrapper>
              <FilterDateRange
                from={draftDate ? draftDate.from : null}
                to={draftDate ? draftDate.to : null}
                onChangeFrom={(date) => {
                  console.log(date);
                  dispatch(setAvtaleGiroFilterDraftDate(date, draftDate ? draftDate.to : null));
                }}
                onChangeTo={(date) => {
                  console.log(date);
                  dispatch(setAvtaleGiroFilterDraftDate(draftDate ? draftDate.from : null, date));
                }}
                onChangeRange={(to, from) => {
                  console.log(to, from);
                  dispatch(setAvtaleGiroFilterDraftDate(to, from));
                }}
                inverted
              ></FilterDateRange>
            </FilterDateRangeWrapper>
          </FilterGroup>
        </FilterContent>
      </FilterWrapper>
    );
  } else {
    return <div>Error loading filter statuses</div>;
  }
};

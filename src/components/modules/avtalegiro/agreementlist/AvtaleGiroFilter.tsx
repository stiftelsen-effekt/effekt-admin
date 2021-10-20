import React, { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../../../models/state';
import {
  fetchAvtaleGiroHistogramAction,
  setAvtaleGiroFilterActive,
  setAvtalegiroFilterAmount,
  setAvtaleGiroFilterDonor,
  setAvtaleGiroFilterKID,
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
} from '../../../style/elements/filters.component.style';
import { HistogramInputComponent } from '../../histogram-input/HistogramInput';

const statusTypes = [
  { name: 'STOPPED', id: 0 },
  { name: 'ACTIVE', id: 1 },
];

export const AvtaleGiroFilter: React.FunctionComponent = () => {
  const dispatch = useDispatch();

  const amountRange = useSelector((state: AppState) => state.avtaleGiroAgreements.filter.amount);
  const KID = useSelector((state: AppState) => state.avtaleGiroAgreements.filter.KID);
  const donor = useSelector((state: AppState) => state.avtaleGiroAgreements.filter.donor);
  const statuses = useSelector((state: AppState) => state.avtaleGiroAgreements.filter.statuses);

  const histogram = useSelector((state: AppState) => state.avtaleGiroAgreements.histogram);
  if (!histogram) dispatch(fetchAvtaleGiroHistogramAction.started(undefined));

  let statusChoices: Array<EffektCheckChoice> = statusTypes.map((status) => ({
    label: status.name,
    value: status.id,
    // If status is not found, set box to unchecked
    selected: statuses.indexOf(status.id) !== -1,
  }));

  const [filterIsOpen, setFilterIsOpen] = useState<boolean>(false);

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
              dispatch(
                setAvtalegiroFilterAmount({ from: Math.min(...range), to: Math.max(...range) })
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
            azure={true}
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
      </FilterContent>
    </FilterWrapper>
  );
};

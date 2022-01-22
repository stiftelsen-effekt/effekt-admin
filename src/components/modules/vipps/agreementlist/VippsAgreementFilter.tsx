import React, { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../../../models/state';
import {
  fetchAgreementHistogramAction,
  setVippsAgreementsFilterAmount,
  setVippsAgreementsFilterDonor,
  setVippsAgreementsFilterKID,
  setVippsAgreementsFilterStatus,
} from '../../../../store/vipps/vipps.actions';
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
  { name: 'PENDING', id: 0 },
  { name: 'ACTIVE', id: 1 },
  { name: 'STOPPED', id: 2 },
  { name: 'EXPIRED', id: 3 },
];

export const VippsAgreementFilter: React.FunctionComponent = () => {
  const dispatch = useDispatch();

  const amountRange = useSelector((state: AppState) => state.vippsAgreements.filter.amount);
  const KID = useSelector((state: AppState) => state.vippsAgreements.filter.KID);
  const donor = useSelector((state: AppState) => state.vippsAgreements.filter.donor);
  const statuses = useSelector((state: AppState) => state.vippsAgreements.filter.statuses);
  const histogram = useSelector((state: AppState) => state.vippsAgreements.histogram);
  const [filterIsOpen, setFilterIsOpen] = useState<boolean>(false);

  if (statuses) {
    if (!histogram) dispatch(fetchAgreementHistogramAction.started(undefined));

    let statusChoices: Array<EffektCheckChoice> = statusTypes.map((status) => ({
      label: status.name,
      value: status.id,
      selected: statuses.indexOf(status.name) !== -1,
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
            <FilterGroupHeader>Agreement sum</FilterGroupHeader>
            <HistogramInputComponent
              range={[amountRange.from, amountRange.to]}
              histogram={histogram}
              onChange={(range: any) => {
                dispatch(
                  setVippsAgreementsFilterAmount({ from: Math.min(...range), to: Math.max(...range) })
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
                dispatch(setVippsAgreementsFilterDonor(e.target.value));
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
                dispatch(setVippsAgreementsFilterKID(e.target.value));
              }}
            ></FilterInput>
          </FilterGroup>

          <FilterGroup>
            <FilterGroupHeader>Status</FilterGroupHeader>
            <EffektCheckForm
              azure={true}
              choices={statusChoices}
              onChange={(choices: Array<number>) => {
                let newChoices: string[] = [];
                choices.forEach((choiceID) => {
                  newChoices.push(statusTypes[choiceID].name);
                });
                dispatch(setVippsAgreementsFilterStatus(newChoices));
              }}
            ></EffektCheckForm>
          </FilterGroup>
        </FilterContent>
      </FilterWrapper>
    );
  }
  else return <div>Error loading filter</div>
};

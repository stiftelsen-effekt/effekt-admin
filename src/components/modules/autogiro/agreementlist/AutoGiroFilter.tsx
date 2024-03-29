import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../../../../models/state";
import {
  fetchAutoGiroHistogramAction,
  setAutoGiroFilterActive,
  setAutoGiroFilterAmount,
  setAutoGiroFilterDonor,
  setAutoGiroFilterKID,
  setAutoGiroFilterPaymentDate,
  setAutoGiroFilterDraftDate,
} from "../../../../store/autogiro/autogiro.actions";
import {
  EffektCheckChoice,
  EffektCheckForm,
} from "../../../style/elements/effekt-check/effekt-check-form.component";
import { FilterOpenButton } from "../../../style/elements/filter-buttons/filter-open-button.component";
import {
  FilterWrapper,
  FilterContent,
  FilterHeader,
  FilterGroup,
  FilterGroupHeader,
  FilterInput,
  FilterDateRangeWrapper,
  FilterDateRange,
  FilterStatsTableContainer,
} from "../../../style/elements/filters.component.style";
import { HistogramInputComponent } from "../../histogram-input/HistogramInput";
import EffektNumberRange from "../../../style/elements/effekt-range/effekt-range.component";
import { thousandize } from "../../../../util/formatting";

const statusTypes = [
  { name: "STOPPED", id: 0 },
  { name: "ACTIVE", id: 1 },
];

export const AutoGiroFilter: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const { getAccessTokenSilently } = useAuth0();

  const [filterIsOpen, setFilterIsOpen] = useState<boolean>(false);

  const histogram = useSelector((state: AppState) => state.autoGiroAgreements.histogram);
  const statistics = useSelector((state: AppState) => state.autoGiroAgreements.filter.statistics);
  const amountRange = useSelector((state: AppState) => state.autoGiroAgreements.filter.amount);
  const KID = useSelector((state: AppState) => state.autoGiroAgreements.filter.KID);
  const draftDate = useSelector((state: AppState) => state.autoGiroAgreements.filter.created);
  const donor = useSelector((state: AppState) => state.autoGiroAgreements.filter.donor);
  const statuses = useSelector((state: AppState) => state.autoGiroAgreements.filter.statuses);

  useEffect(() => {
    if (!histogram)
      getAccessTokenSilently().then((token) =>
        dispatch(fetchAutoGiroHistogramAction.started({ token })),
      );
  }, [histogram, dispatch, getAccessTokenSilently]);

  const statusChoices: Array<EffektCheckChoice> = statusTypes.map((status) => ({
    label: status.name,
    value: status.id,
    // If status is not found, set box to unchecked
    selected: statuses ? statuses.indexOf(status.id) !== -1 : true,
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
          <FilterGroupHeader>AutoGiro sum</FilterGroupHeader>
          <HistogramInputComponent
            range={[amountRange.from, amountRange.to]}
            histogram={histogram}
            onChange={(range: any) => {
              let minRange = range[0];
              let maxRange = range[1];
              if (isNaN(minRange)) minRange = 0;
              if (isNaN(maxRange)) maxRange = 0;
              dispatch(setAutoGiroFilterAmount({ from: minRange, to: maxRange }));
            }}
          ></HistogramInputComponent>
        </FilterGroup>

        <FilterGroup>
          <FilterGroupHeader>Donor like</FilterGroupHeader>
          <FilterInput
            value={donor}
            placeholder={"Fuzzy search"}
            style={{ width: "100%" }}
            onChange={(e: any) => {
              dispatch(setAutoGiroFilterDonor(e.target.value));
            }}
          ></FilterInput>
        </FilterGroup>

        <FilterGroup>
          <FilterGroupHeader>KID like</FilterGroupHeader>
          <FilterInput
            value={KID}
            placeholder={"Fuzzy search"}
            style={{ width: "100%" }}
            onChange={(e: any) => {
              dispatch(setAutoGiroFilterKID(e.target.value));
            }}
          ></FilterInput>
        </FilterGroup>

        <FilterGroup>
          <FilterGroupHeader>Status</FilterGroupHeader>
          <EffektCheckForm
            inverted={true}
            choices={statusChoices}
            onChange={(choices: Array<number>, allSelected: boolean) => {
              if (allSelected) {
                dispatch(setAutoGiroFilterActive(undefined));
              } else {
                let newChoices: number[] = [];
                choices.forEach((choiceID) => {
                  newChoices.push(statusTypes[choiceID].id);
                });
                dispatch(setAutoGiroFilterActive(newChoices));
              }
            }}
          ></EffektCheckForm>
        </FilterGroup>

        <FilterGroup>
          <FilterGroupHeader>Charge day</FilterGroupHeader>
          <EffektNumberRange
            min={0}
            max={28}
            onChange={(from: number, to: number) => {
              dispatch(setAutoGiroFilterPaymentDate({ from: from, to: to }));
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
                dispatch(setAutoGiroFilterDraftDate(date, draftDate ? draftDate.to : null));
              }}
              onChangeTo={(date) => {
                dispatch(setAutoGiroFilterDraftDate(draftDate ? draftDate.from : null, date));
              }}
              onChangeRange={(to, from) => {
                dispatch(setAutoGiroFilterDraftDate(to, from));
              }}
              inverted
            ></FilterDateRange>
          </FilterDateRangeWrapper>
        </FilterGroup>

        <FilterStatsTableContainer>
          <table>
            <tbody>
              <tr>
                <td>Count</td>
                <td>{thousandize(statistics.numAgreements)}</td>
              </tr>
              <tr>
                <td>Sum</td>
                <td>kr {thousandize(statistics.sumAgreements)}</td>
              </tr>
              <tr>
                <td>Average</td>
                <td>kr {thousandize(statistics.avgAgreement)}</td>
              </tr>
            </tbody>
          </table>
        </FilterStatsTableContainer>
      </FilterContent>
    </FilterWrapper>
  );
};

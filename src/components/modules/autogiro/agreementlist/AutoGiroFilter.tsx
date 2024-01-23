import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../../../../models/state";
import {
  fetchAutoGiroAgreementsAction,
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
} from "../../../style/elements/filters.component.style";
import { HistogramInputComponent } from "../../histogram-input/HistogramInput";
import EffektNumberRange from "../../../style/elements/effekt-range/effekt-range.component";

const statusTypes = [
  { name: "STOPPED", id: 0 },
  { name: "ACTIVE", id: 1 },
];

export const AutoGiroFilter: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const { getAccessTokenSilently } = useAuth0();

  const filter = useSelector((state: AppState) => state.autoGiroAgreements.filter);
  const histogram = useSelector((state: AppState) => state.autoGiroAgreements.histogram);
  const [filterIsOpen, setFilterIsOpen] = useState<boolean>(false);
  const amountRange = filter.amount;
  const KID = filter.KID;
  const draftDate = filter.created;
  const donor = filter.donor;
  const statuses = filter.statuses;

  useEffect(() => {
    getAccessTokenSilently().then((token) =>
      dispatch(fetchAutoGiroAgreementsAction.started({ token })),
    );
  }, [filter, dispatch, getAccessTokenSilently]);

  if (statuses) {
    if (!histogram)
      getAccessTokenSilently().then((token) =>
        dispatch(fetchAutoGiroHistogramAction.started({ token })),
      );

    const statusChoices: Array<EffektCheckChoice> = statusTypes.map((status) => ({
      label: status.name,
      value: status.id,
      // If status is not found, set box to unchecked
      selected: statuses.indexOf(status.id) !== -1,
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
              onChange={(choices: Array<number>) => {
                let newChoices: number[] = [];
                choices.forEach((choiceID) => {
                  newChoices.push(statusTypes[choiceID].id);
                });
                dispatch(setAutoGiroFilterActive(newChoices));
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
        </FilterContent>
      </FilterWrapper>
    );
  } else {
    return <div>Error loading filter statuses</div>;
  }
};

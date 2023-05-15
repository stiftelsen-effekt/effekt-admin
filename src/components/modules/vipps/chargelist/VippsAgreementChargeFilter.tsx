import { useAuth0 } from "@auth0/auth0-react";
import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../../../../models/state";
import {
  fetchChargeHistogramAction,
  setVippsChargesFilterAmount,
  setVippsChargesFilterDonor,
  setVippsChargesFilterKID,
  setVippsChargesFilterStatus,
} from "../../../../store/vipps/vipps.actions";
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
} from "../../../style/elements/filters.component.style";
import { HistogramInputComponent } from "../../histogram-input/HistogramInput";

const statusTypes = [
  { name: "CHARGED", id: 0 },
  { name: "PENDING", id: 1 },
  { name: "RESERVED", id: 2 },
  { name: "FAILED", id: 3 },
  { name: "PROCESSING", id: 4 },
  { name: "REFUNDED", id: 5 },
  { name: "PARTIALLY_REFUNDED", id: 6 },
  { name: "DUE", id: 7 },
  { name: "CANCELLED", id: 8 },
];

export const VippsChargeFilter: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const { getAccessTokenSilently } = useAuth0();

  const amountRange = useSelector(
    (state: AppState) => state.vippsAgreementCharges.filter.amountNOK,
  );
  const KID = useSelector((state: AppState) => state.vippsAgreementCharges.filter.KID);
  const donor = useSelector((state: AppState) => state.vippsAgreementCharges.filter.donor);
  const statuses = useSelector((state: AppState) => state.vippsAgreementCharges.filter.statuses);
  const histogram = useSelector((state: AppState) => state.vippsAgreements.histogram);
  const [filterIsOpen, setFilterIsOpen] = useState<boolean>(false);

  if (statuses) {
    if (!histogram)
      getAccessTokenSilently().then((token) =>
        dispatch(fetchChargeHistogramAction.started({ token })),
      );

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
            <FilterGroupHeader>Charge sum</FilterGroupHeader>
            <HistogramInputComponent
              range={[amountRange.from, amountRange.to]}
              histogram={histogram}
              onChange={(range: any) => {
                dispatch(
                  setVippsChargesFilterAmount({ from: Math.min(...range), to: Math.max(...range) }),
                );
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
                dispatch(setVippsChargesFilterDonor(e.target.value));
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
                dispatch(setVippsChargesFilterKID(e.target.value));
              }}
            ></FilterInput>
          </FilterGroup>

          <FilterGroup>
            <FilterGroupHeader>Status</FilterGroupHeader>
            <EffektCheckForm
              inverted={true}
              choices={statusChoices}
              onChange={(choices: Array<number>) => {
                let newChoices: string[] = [];
                choices.forEach((choiceID) => {
                  newChoices.push(statusTypes[choiceID].name);
                });
                dispatch(setVippsChargesFilterStatus(newChoices));
              }}
            ></EffektCheckForm>
          </FilterGroup>
        </FilterContent>
      </FilterWrapper>
    );
  } else return <div>Error loading filter</div>;
};

import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../../../../models/state";
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
import { AutoGiroMandateStatus } from "../../../../models/types";
import {
  fetchAutoGiroMandatesAction,
  setAutoGiroMandateFilterDonor,
  setAutoGiroMandateFilterKID,
  setAutoGiroMandateFilterStatus,
} from "../../../../store/autogiro/autogiromedgivande.actions";

const statusTypes: Array<AutoGiroMandateStatus> = [
  "DRAFTED",
  "NEW",
  "PENDING",
  "ACTIVE",
  "STOPPED",
];

export const AutoGiroMandateFilter: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const { getAccessTokenSilently } = useAuth0();

  const filter = useSelector((state: AppState) => state.autoGiroMandates.filter);
  const [filterIsOpen, setFilterIsOpen] = useState<boolean>(false);
  const KID = filter.KID;
  const donor = filter.donor;
  const statuses = filter.statuses;

  useEffect(() => {
    getAccessTokenSilently().then((token) =>
      dispatch(fetchAutoGiroMandatesAction.started({ token })),
    );
  }, [filter, dispatch, getAccessTokenSilently]);

  const statusChoices: Array<EffektCheckChoice> = statusTypes.map((status) => ({
    label: status,
    value: status,
    // If status is not found, set box to unchecked
    selected: statuses ? statuses.indexOf(status) !== -1 : true,
  }));

  return (
    <FilterWrapper isOpen={filterIsOpen}>
      <FilterContent>
        <FilterOpenButton
          isOpen={filterIsOpen}
          onClick={() => setFilterIsOpen(!filterIsOpen)}
        ></FilterOpenButton>
        <FilterHeader>Filters</FilterHeader>

        <FilterGroup>
          <FilterGroupHeader>Donor like</FilterGroupHeader>
          <FilterInput
            value={donor}
            placeholder={"Fuzzy search"}
            style={{ width: "100%" }}
            onChange={(e: any) => {
              dispatch(setAutoGiroMandateFilterDonor(e.target.value));
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
              dispatch(setAutoGiroMandateFilterKID(e.target.value));
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
              choices.forEach((choice) => {
                newChoices.push(choice);
              });
              dispatch(setAutoGiroMandateFilterStatus(newChoices));
            }}
          ></EffektCheckForm>
        </FilterGroup>
      </FilterContent>
    </FilterWrapper>
  );
};

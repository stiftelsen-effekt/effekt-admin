import React, { useEffect, useState } from "react";

import {
  FilterWrapper,
  FilterGroupHeader,
  FilterDateRange,
  FilterInput,
  FilterDateRangeWrapper,
  FilterGroup,
  FilterHeader,
  FilterContent,
  FilterStatsTableContainer,
} from "../../../../style/elements/filters.component.style";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../../../../../models/state";
import {
  setFundraiserFilterRegistrationDateRange,
  setFundraiserFilterDonor,
  setFundraiserFilterId,
  setFundraiserFilterDonationCountRange,
  setFundraiserFilterDonationSumRange,
  setFundraiserFilterOrganizationIDs,
} from "../../../../../store/fundraisers/fundraiser-filters.actions";
import { FilterOpenButton } from "../../../../style/elements/filter-buttons/filter-open-button.component";
import { HistogramInputComponent } from "../../../histogram-input/HistogramInput";
import rightArrow from "../../../../../assets/right-arrow.svg";
import {
  EffektCheckForm,
  EffektCheckChoice,
} from "../../../../style/elements/effekt-check/effekt-check-form.component";
import { thousandize } from "../../../../../util/formatting";
import { fetchAllCauseareasAction } from "../../../../../store/causeareas/causeareas.action";

export const FundraisersFilterComponent: React.FunctionComponent = () => {
  const dispatch = useDispatch();

  const filter = useSelector((state: AppState) => state.fundraisers.filter);
  const causeAreas = useSelector((state: AppState) => state.causeareas.all);
  const statistics = useSelector((state: AppState) => state.fundraisers.statistics);

  useEffect(() => {
    if (!causeAreas) dispatch(fetchAllCauseareasAction.started(undefined));
  }, [causeAreas, dispatch]);

  const selectedOrganizationIDs = useSelector(
    (state: AppState) => state.fundraisers.filter.organizationIDs,
  );

  const organizationChoices: Array<EffektCheckChoice> =
    causeAreas
      ?.flatMap((c) => c.organizations)
      ?.map((organization) => {
        return {
          label: organization.name || organization.abbreviation || "Unknown",
          value: organization.id,
          selected: selectedOrganizationIDs
            ? selectedOrganizationIDs.includes(organization.id)
            : true,
        };
      }) ?? [];

  const [filterIsOpen, setFilterIsOpen] = useState<boolean>(false);

  return (
    <FilterWrapper isOpen={filterIsOpen}>
      <FilterContent>
        <FilterOpenButton
          isOpen={filterIsOpen}
          onClick={() => setFilterIsOpen(!filterIsOpen)}
        ></FilterOpenButton>
        <FilterHeader>Filters</FilterHeader>

        <FilterGroup>
          <FilterGroupHeader>Registration date range</FilterGroupHeader>
          <FilterDateRangeWrapper>
            <FilterDateRange
              from={filter.registrationDate.from}
              to={filter.registrationDate.to}
              onChangeFrom={(date) => {
                dispatch(
                  setFundraiserFilterRegistrationDateRange({
                    from: date,
                    to: filter.registrationDate.to,
                  }),
                );
              }}
              onChangeTo={(date) => {
                dispatch(
                  setFundraiserFilterRegistrationDateRange({
                    from: filter.registrationDate.from,
                    to: date,
                  }),
                );
              }}
              onChangeRange={(to, from) => {
                dispatch(
                  setFundraiserFilterRegistrationDateRange({
                    from: to,
                    to: from,
                  }),
                );
              }}
              inverted
            ></FilterDateRange>
          </FilterDateRangeWrapper>
        </FilterGroup>

        <FilterGroup>
          <FilterGroupHeader>Donation count</FilterGroupHeader>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              color: "white",
            }}
          >
            <FilterInput
              placeholder="From"
              style={{ width: 80 }}
              value={filter.donationCount.from || ""}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                dispatch(
                  setFundraiserFilterDonationCountRange({
                    from: isNaN(val) ? 0 : val,
                    to: filter.donationCount.to,
                  }),
                );
              }}
            ></FilterInput>
            <img src={rightArrow} style={{ height: "20px" }} alt="arrow" />
            <FilterInput
              placeholder="To"
              style={{ width: 80 }}
              value={
                filter.donationCount.to === Number.MAX_SAFE_INTEGER
                  ? ""
                  : filter.donationCount.to || ""
              }
              onChange={(e) => {
                const val = parseInt(e.target.value);
                dispatch(
                  setFundraiserFilterDonationCountRange({
                    from: filter.donationCount.from,
                    to: isNaN(val) ? Number.MAX_SAFE_INTEGER : val,
                  }),
                );
              }}
            ></FilterInput>
          </div>
        </FilterGroup>

        <FilterGroup>
          <FilterGroupHeader>Donation sum</FilterGroupHeader>
          <HistogramInputComponent
            histogram={[]}
            range={[filter.donationSum.from, filter.donationSum.to]}
            onChange={(range) => {
              let minRange = range[0];
              let maxRange = range[1];
              if (isNaN(minRange)) minRange = 0;
              if (isNaN(maxRange)) maxRange = Number.MAX_SAFE_INTEGER;
              dispatch(
                setFundraiserFilterDonationSumRange({
                  from: minRange,
                  to: maxRange,
                }),
              );
            }}
          ></HistogramInputComponent>
        </FilterGroup>

        <FilterGroup>
          <FilterGroupHeader>Fundraiser ID</FilterGroupHeader>
          <FilterInput
            value={filter.fundraiserId}
            placeholder={"123"}
            style={{ width: "100%" }}
            onChange={(e) => {
              dispatch(setFundraiserFilterId(e.target.value));
            }}
          ></FilterInput>
        </FilterGroup>

        <FilterGroup>
          <FilterGroupHeader>Donor like</FilterGroupHeader>
          <FilterInput
            value={filter.donor}
            placeholder={"Fuzzy search"}
            style={{ width: "100%" }}
            onChange={(e) => {
              dispatch(setFundraiserFilterDonor(e.target.value));
            }}
          ></FilterInput>
        </FilterGroup>

        {causeAreas && (
          <FilterGroup>
            <FilterGroupHeader>Organizations</FilterGroupHeader>
            <EffektCheckForm
              inverted={true}
              choices={organizationChoices}
              onChange={(selected: Array<number>, allSelected: boolean) => {
                if (allSelected) {
                  dispatch(setFundraiserFilterOrganizationIDs(undefined));
                } else {
                  dispatch(setFundraiserFilterOrganizationIDs(selected));
                }
              }}
            ></EffektCheckForm>
          </FilterGroup>
        )}

        <FilterStatsTableContainer>
          <table>
            <tbody>
              <tr>
                <td>Count</td>
                <td>{thousandize(statistics.numFundraisers)}</td>
              </tr>
              <tr>
                <td>Sum</td>
                <td>kr {thousandize(statistics.sumDonations)}</td>
              </tr>
              <tr>
                <td>Average</td>
                <td>kr {thousandize(Math.round(statistics.avgDonation))}</td>
              </tr>
            </tbody>
          </table>
        </FilterStatsTableContainer>
      </FilterContent>
    </FilterWrapper>
  );
};

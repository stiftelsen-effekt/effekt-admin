import React, { useState } from "react";
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
import { FilterOpenButton } from "../../../../style/elements/filter-buttons/filter-open-button.component";
import {
  setDonorFilterName,
  setDonorFilterEmail,
  setDonorFilterDateRange,
  setDonorFilterDonationsSum,
  setDonorFilterLastDonationDate,
  setDonorFilterRecipientOrgIDs,
  setDonorFilterDonationsDateRange,
  setDonorFilterDonationsCount,
  setDonorFilterReferralTypeIDs,
} from "../../../../../store/donors/donor-filters.actions";
import { DateTime } from "luxon";
import {
  EffektCheckChoice,
  EffektCheckForm,
} from "../../../../style/elements/effekt-check/effekt-check-form.component";
import { thousandize } from "../../../../../util/formatting";
export const DonorsFilterComponent: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const [filterIsOpen, setFilterIsOpen] = useState<boolean>(false);

  const name = useSelector((state: AppState) => state.donors.filter.name);
  const email = useSelector((state: AppState) => state.donors.filter.email);
  const registeredDateRange = useSelector((state: AppState) => state.donors.filter.registeredDate);
  const donationsDateRange = useSelector(
    (state: AppState) => state.donors.filter.donationsDateRange,
  );
  const lastDonationDateRange = useSelector(
    (state: AppState) => state.donors.filter.lastDonationDate,
  );
  const donationsCountRange = useSelector((state: AppState) => state.donors.filter.donationsCount);
  const donationsSumRange = useSelector((state: AppState) => state.donors.filter.donationsSum);
  const referralTypeIDs = useSelector((state: AppState) => state.donors.filter.referralTypeIDs);
  const recipientOrgIDs = useSelector((state: AppState) => state.donors.filter.recipientOrgIDs);

  const causeAreas = useSelector((state: AppState) => state.causeareas.all);
  const referrals = useSelector((state: AppState) => state.referrals.all);

  const statistics = useSelector((state: AppState) => state.donors.statistics);

  const organizationChoices: Array<EffektCheckChoice> =
    causeAreas
      ?.flatMap((c) => c.organizations)
      ?.map((organization) => {
        return {
          label: organization.name || organization.abbreviation || "Unkown",
          value: organization.id,
          selected: recipientOrgIDs ? recipientOrgIDs.includes(organization.id) : true,
        };
      }) ?? [];

  const referralChoices: Array<EffektCheckChoice> =
    referrals?.map((referral) => {
      return {
        label: referral.name || "Unknown",
        value: referral.id,
        selected: referralTypeIDs ? referralTypeIDs.includes(referral.id) : true,
      };
    }) ?? [];

  return (
    <FilterWrapper isOpen={filterIsOpen}>
      <FilterContent>
        <FilterOpenButton
          isOpen={filterIsOpen}
          onClick={() => setFilterIsOpen(!filterIsOpen)}
        ></FilterOpenButton>
        <FilterHeader>Filters</FilterHeader>

        <FilterGroup>
          <FilterGroupHeader>Name</FilterGroupHeader>
          <FilterInput
            value={name}
            placeholder="Search by name"
            style={{ width: "100%" }}
            onChange={(e) => {
              dispatch(setDonorFilterName(e.target.value));
            }}
          ></FilterInput>
        </FilterGroup>

        <FilterGroup>
          <FilterGroupHeader>Email</FilterGroupHeader>
          <FilterInput
            value={email}
            placeholder="Search by email"
            style={{ width: "100%" }}
            onChange={(e) => {
              dispatch(setDonorFilterEmail(e.target.value));
            }}
          ></FilterInput>
        </FilterGroup>

        <FilterGroup>
          <FilterGroupHeader>Registered date</FilterGroupHeader>
          <FilterDateRangeWrapper>
            <FilterDateRange
              from={registeredDateRange.from?.toJSDate() || null}
              to={registeredDateRange.to?.toJSDate() || null}
              onChangeFrom={(date) => {
                dispatch(
                  setDonorFilterDateRange({
                    from: date ? DateTime.fromJSDate(date) : null,
                    to: registeredDateRange.to,
                  }),
                );
              }}
              onChangeTo={(date) => {
                dispatch(
                  setDonorFilterDateRange({
                    from: registeredDateRange.from,
                    to: date ? DateTime.fromJSDate(date) : null,
                  }),
                );
              }}
              onChangeRange={(from, to) => {
                dispatch(
                  setDonorFilterDateRange({
                    from: from ? DateTime.fromJSDate(from) : null,
                    to: to ? DateTime.fromJSDate(to) : null,
                  }),
                );
              }}
              inverted
            ></FilterDateRange>
          </FilterDateRangeWrapper>
        </FilterGroup>

        <FilterGroup>
          <FilterGroupHeader>Donations range</FilterGroupHeader>
          <FilterDateRangeWrapper>
            <FilterDateRange
              from={donationsDateRange.from?.toJSDate() || null}
              to={donationsDateRange.to?.toJSDate() || null}
              onChangeFrom={(date) => {
                dispatch(
                  setDonorFilterDonationsDateRange({
                    from: date ? DateTime.fromJSDate(date) : null,
                    to: donationsDateRange.to,
                  }),
                );
              }}
              onChangeTo={(date) => {
                dispatch(
                  setDonorFilterDonationsDateRange({
                    from: donationsDateRange.from,
                    to: date ? DateTime.fromJSDate(date) : null,
                  }),
                );
              }}
              onChangeRange={(from, to) => {
                dispatch(
                  setDonorFilterDonationsDateRange({
                    from: from ? DateTime.fromJSDate(from) : null,
                    to: to ? DateTime.fromJSDate(to) : null,
                  }),
                );
              }}
              inverted
            ></FilterDateRange>
          </FilterDateRangeWrapper>
        </FilterGroup>

        <FilterGroup>
          <FilterGroupHeader>Last donation date</FilterGroupHeader>
          <FilterDateRangeWrapper>
            <FilterDateRange
              from={lastDonationDateRange.from?.toJSDate() || null}
              to={lastDonationDateRange.to?.toJSDate() || null}
              onChangeFrom={(date) => {
                dispatch(
                  setDonorFilterLastDonationDate({
                    from: date ? DateTime.fromJSDate(date) : null,
                    to: lastDonationDateRange.to,
                  }),
                );
              }}
              onChangeTo={(date) => {
                dispatch(
                  setDonorFilterLastDonationDate({
                    from: lastDonationDateRange.from,
                    to: date ? DateTime.fromJSDate(date) : null,
                  }),
                );
              }}
              onChangeRange={(from, to) => {
                dispatch(
                  setDonorFilterLastDonationDate({
                    from: from ? DateTime.fromJSDate(from) : null,
                    to: to ? DateTime.fromJSDate(to) : null,
                  }),
                );
              }}
              inverted
            ></FilterDateRange>
          </FilterDateRangeWrapper>
        </FilterGroup>

        <FilterGroup>
          <FilterGroupHeader>Total donations</FilterGroupHeader>
          <FilterInput
            placeholder="From"
            style={{ width: "47%", marginRight: "5%" }}
            value={donationsSumRange.from?.toString() || ""}
            onChange={(e) => {
              dispatch(
                setDonorFilterDonationsSum({
                  from: e.target.value ? parseInt(e.target.value) : null,
                  to: donationsSumRange.to,
                }),
              );
            }}
          ></FilterInput>
          <FilterInput
            placeholder="To"
            style={{ width: "47%" }}
            value={donationsSumRange.to?.toString() || ""}
            onChange={(e) => {
              dispatch(
                setDonorFilterDonationsSum({
                  from: donationsSumRange.from,
                  to: e.target.value ? parseInt(e.target.value) : null,
                }),
              );
            }}
          ></FilterInput>
        </FilterGroup>

        <FilterGroup>
          <FilterGroupHeader>Donations count</FilterGroupHeader>
          <FilterInput
            placeholder="From"
            style={{ width: "47%", marginRight: "5%" }}
            value={donationsCountRange.from?.toString() || ""}
            onChange={(e) => {
              dispatch(
                setDonorFilterDonationsCount({
                  from: e.target.value ? parseInt(e.target.value) : null,
                  to: donationsCountRange.to,
                }),
              );
            }}
          ></FilterInput>
          <FilterInput
            placeholder="To"
            style={{ width: "47%" }}
            value={donationsCountRange.to?.toString() || ""}
            onChange={(e) => {
              dispatch(
                setDonorFilterDonationsCount({
                  from: donationsCountRange.from,
                  to: e.target.value ? parseInt(e.target.value) : null,
                }),
              );
            }}
          ></FilterInput>
        </FilterGroup>

        <FilterGroup>
          <FilterGroupHeader>Organizations</FilterGroupHeader>
          <EffektCheckForm
            inverted={true}
            choices={organizationChoices}
            onChange={(selected: Array<number>, allSelected: boolean) => {
              if (allSelected) {
                dispatch(setDonorFilterRecipientOrgIDs(undefined));
              } else {
                dispatch(setDonorFilterRecipientOrgIDs(selected));
              }
            }}
          ></EffektCheckForm>
        </FilterGroup>

        <FilterGroup>
          <FilterGroupHeader>Referral</FilterGroupHeader>
          <EffektCheckForm
            inverted={true}
            choices={referralChoices}
            onChange={(selected: Array<number>, allSelected: boolean) => {
              if (allSelected) {
                dispatch(setDonorFilterReferralTypeIDs(undefined));
              } else {
                dispatch(setDonorFilterReferralTypeIDs(selected));
              }
            }}
          ></EffektCheckForm>
        </FilterGroup>
      </FilterContent>

      <FilterStatsTableContainer>
        <table>
          <tbody>
            <tr>
              <td>Sum donations</td>
              <td>kr {thousandize(Math.round(statistics.totalDonationSum))}</td>
            </tr>
            <tr>
              <td>Count donations</td>
              <td>{thousandize(statistics.totalDonationCount)}</td>
            </tr>
            <tr>
              <td>Count donors</td>
              <td>{thousandize(statistics.totalDonors)}</td>
            </tr>
          </tbody>
        </table>
      </FilterStatsTableContainer>
    </FilterWrapper>
  );
};

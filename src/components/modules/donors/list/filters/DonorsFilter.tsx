import React, { useCallback, useState } from "react";
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
  setDonorFilterId,
  setDonorFilterNewsletter,
} from "../../../../../store/donors/donor-filters.actions";
import { DateTime } from "luxon";
import {
  EffektCheckChoice,
  EffektCheckForm,
} from "../../../../style/elements/effekt-check/effekt-check-form.component";
import { thousandize } from "../../../../../util/formatting";
import { EffektButton } from "../../../../style/elements/button.style";
import { Download } from "react-feather";
import { useAuth0 } from "@auth0/auth0-react";
import { exportDonorsAction } from "../../../../../store/donors/donors-list.actions";
import { Oval } from "react-loader-spinner";

export const DonorsFilterComponent: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const { getAccessTokenSilently } = useAuth0();
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
  const newsletter = useSelector((state: AppState) => state.donors.filter.newsletter);

  const causeAreas = useSelector((state: AppState) => state.causeareas.all);
  const referrals = useSelector((state: AppState) => state.referrals.all);

  const statistics = useSelector((state: AppState) => state.donors.statistics);

  const exportLoading = useSelector((state: AppState) => state.donors.exportLoading);

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

  const exportDonors = useCallback(() => {
    getAccessTokenSilently().then(async (token) => {
      const result = await dispatch(exportDonorsAction.started({ token }));
      if (result.error) {
        console.error("Error exporting donors:", result.error);
      }
    });
  }, [dispatch, getAccessTokenSilently]);

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
          <FilterGroupHeader>Donor ID</FilterGroupHeader>
          <FilterInput
            placeholder="Search by donor ID"
            style={{ width: "100%" }}
            onChange={(e) => {
              if (e.target.value === "") {
                dispatch(setDonorFilterId(null));
                return;
              }
              const donorId = parseInt(e.target.value);
              if (isNaN(donorId)) {
                dispatch(setDonorFilterId(null));
                return;
              }
              dispatch(setDonorFilterId(donorId));
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
          <FilterGroupHeader>Newsletter</FilterGroupHeader>
          <EffektCheckForm
            inverted={true}
            choices={[
              {
                label: "Yes",
                value: true,
                selected: newsletter === true || newsletter === undefined,
              },
              {
                label: "No",
                value: false,
                selected: newsletter === false || newsletter === undefined,
              },
            ]}
            onChange={(selected: Array<boolean>, allSelected: boolean) => {
              if (allSelected) {
                dispatch(setDonorFilterNewsletter(undefined));
              } else if (selected.length === 1 && selected[0]) {
                dispatch(setDonorFilterNewsletter(true));
              } else if (selected.length === 1 && !selected[0]) {
                dispatch(setDonorFilterNewsletter(false));
              } else if (selected.length === 0) {
                alert(
                  "Please select either Yes or No or both options, clearing would give no results.",
                );
              }
            }}
          ></EffektCheckForm>
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

          <EffektButton
            onClick={exportDonors}
            inverted
            style={{ marginTop: "10px", alignItems: "center", justifyContent: "center" }}
            disabled={exportLoading}
          >
            {exportLoading ? (
              <Oval color="white" secondaryColor="black" height={20} width={20} />
            ) : (
              <>
                Export CSV&nbsp;
                <Download size={16} />
              </>
            )}
          </EffektButton>
        </FilterStatsTableContainer>
      </FilterContent>
    </FilterWrapper>
  );
};

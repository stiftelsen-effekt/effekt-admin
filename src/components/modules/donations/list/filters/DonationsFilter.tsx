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
import { HistogramInputComponent } from "../../../histogram-input/HistogramInput";
import {
  EffektCheckForm,
  EffektCheckChoice,
} from "../../../../style/elements/effekt-check/effekt-check-form.component";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../../../../../models/state";
import { fetchPaymentMethodsAction } from "../../../../../store/single-donation/single-donation.actions";
import {
  setDonationFilterKid,
  setDonationFilterDonor,
  setDonationFilterDateRange,
  setDonationFilterSumRange,
  setDonationFilterPaymentMethodIDs,
  setDonationFilterDonationId,
  setDonationFilterOrganizationIDs,
  setDonationFilterTaxUnitTypes,
} from "../../../../../store/donations/donation-filters.actions";
import { fetchHistogramAction } from "../../../../../store/donations/donation.actions";
import { FilterOpenButton } from "../../../../style/elements/filter-buttons/filter-open-button.component";
import { useAuth0 } from "@auth0/auth0-react";
import { fetchAllCauseareasAction } from "../../../../../store/causeareas/causeareas.action";
import { thousandize } from "../../../../../util/formatting";

export const DonationsFilterComponent: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const { getAccessTokenSilently } = useAuth0();

  const statistics = useSelector((state: AppState) => state.donations.filter.statistics);
  const donationDateRange = useSelector((state: AppState) => state.donations.filter.date);
  const donationSumRange = useSelector((state: AppState) => state.donations.filter.sum);
  const kid = useSelector((state: AppState) => state.donations.filter.KID);
  const donor = useSelector((state: AppState) => state.donations.filter.donor);
  const causeAreas = useSelector((state: AppState) => state.causeareas.all);
  const taxUnitTypes = useSelector((state: AppState) => state.donations.filter.taxUnitTypes);

  useEffect(() => {
    if (!causeAreas) dispatch(fetchAllCauseareasAction.started(undefined));
  }, [causeAreas, dispatch]);

  const selectedOrganizationIDs = useSelector(
    (state: AppState) => state.donations.filter.organizationIDs,
  );

  const donationId = useSelector((state: AppState) => state.donations.filter.id);
  const selectedPaymentMethodIDs = useSelector(
    (state: AppState) => state.donations.filter.paymentMethodIDs,
  );

  const paymentMethods = useSelector((state: AppState) => state.singleDonation.paymentMethods);
  if (paymentMethods.length === 0) dispatch(fetchPaymentMethodsAction.started(undefined));

  const histogram = useSelector((state: AppState) => state.donations.histogram);
  if (!histogram)
    getAccessTokenSilently().then((token) => dispatch(fetchHistogramAction.started({ token })));

  let paymentMethodChoices: Array<EffektCheckChoice> = paymentMethods.map((method) => {
    let selected = true;
    if (selectedPaymentMethodIDs !== undefined) {
      selected = selectedPaymentMethodIDs.indexOf(method.id) !== -1;
    }
    return {
      label: method.abbriviation,
      value: method.id,
      selected: selected,
    };
  });

  const taxUnitTypeChoices: Array<EffektCheckChoice> = [
    {
      label: "Person",
      value: "person",
      selected: taxUnitTypes ? taxUnitTypes.includes("person") : true,
    },
    {
      label: "Organization",
      value: "organization",
      selected: taxUnitTypes ? taxUnitTypes.includes("organization") : true,
    },
    {
      label: "Unknown",
      value: null,
      selected: taxUnitTypes ? taxUnitTypes.includes(null) : true,
    },
  ];

  const organizationChoices: Array<EffektCheckChoice> =
    causeAreas
      ?.flatMap((c) => c.organizations)
      ?.map((organization) => {
        return {
          label: organization.name || organization.abbreviation || "Unkown",
          value: organization.id,
          selected: selectedOrganizationIDs
            ? selectedOrganizationIDs.includes(organization.id)
            : true,
        };
      }) ?? [];

  const [filterIsOpen, setFilterIsOpen] = useState<boolean>(false);

  if (!histogram || !paymentMethods)
    return <FilterWrapper isOpen={filterIsOpen}>Loading...</FilterWrapper>;
  return (
    <FilterWrapper isOpen={filterIsOpen}>
      <FilterContent>
        <FilterOpenButton
          isOpen={filterIsOpen}
          onClick={() => setFilterIsOpen(!filterIsOpen)}
        ></FilterOpenButton>
        <FilterHeader>Filters</FilterHeader>

        <FilterGroup>
          <FilterGroupHeader>Date range</FilterGroupHeader>
          <FilterDateRangeWrapper>
            <FilterDateRange
              from={donationDateRange.from}
              to={donationDateRange.to}
              onChangeFrom={(date) => {
                dispatch(setDonationFilterDateRange(date, donationDateRange.to));
              }}
              onChangeTo={(date) => {
                dispatch(setDonationFilterDateRange(donationDateRange.from, date));
              }}
              onChangeRange={(to, from) => {
                dispatch(setDonationFilterDateRange(to, from));
              }}
              inverted
            ></FilterDateRange>
          </FilterDateRangeWrapper>
        </FilterGroup>

        <FilterGroup>
          <FilterGroupHeader>Donation sum</FilterGroupHeader>
          <HistogramInputComponent
            range={[donationSumRange.from, donationSumRange.to]}
            histogram={histogram}
            onChange={(range) => {
              let minRange = range[0];
              let maxRange = range[1];
              if (isNaN(minRange)) minRange = 0;
              if (isNaN(maxRange)) maxRange = Number.MAX_SAFE_INTEGER;
              dispatch(setDonationFilterSumRange(minRange, maxRange));
            }}
          ></HistogramInputComponent>
        </FilterGroup>

        <FilterGroup>
          <FilterGroupHeader>ID like</FilterGroupHeader>
          <FilterInput
            value={donationId}
            placeholder={"123"}
            style={{ width: "100%" }}
            onChange={(e) => {
              dispatch(setDonationFilterDonationId(e.target.value));
            }}
          ></FilterInput>
        </FilterGroup>

        <FilterGroup>
          <FilterGroupHeader>Donor like</FilterGroupHeader>
          <FilterInput
            value={donor}
            placeholder={"Fuzzy search"}
            style={{ width: "100%" }}
            onChange={(e) => {
              dispatch(setDonationFilterDonor(e.target.value));
            }}
          ></FilterInput>
        </FilterGroup>

        <FilterGroup>
          <FilterGroupHeader>KID like</FilterGroupHeader>
          <FilterInput
            value={kid}
            placeholder={"Fuzzy search"}
            style={{ width: "100%" }}
            onChange={(e) => {
              dispatch(setDonationFilterKid(e.target.value));
            }}
          ></FilterInput>
        </FilterGroup>

        <FilterGroup>
          <FilterGroupHeader>Payment method</FilterGroupHeader>
          <EffektCheckForm
            inverted={true}
            choices={paymentMethodChoices}
            onChange={(selected: Array<number>, allSelected: boolean) => {
              if (!allSelected) {
                dispatch(setDonationFilterPaymentMethodIDs(selected));
              } else {
                dispatch(setDonationFilterPaymentMethodIDs(undefined));
              }
            }}
          ></EffektCheckForm>
        </FilterGroup>

        <FilterGroup>
          <FilterGroupHeader>Tax unit type</FilterGroupHeader>
          <EffektCheckForm
            inverted={true}
            choices={taxUnitTypeChoices}
            onChange={(selected: Array<string | null>, allSelected: boolean) => {
              if (allSelected) {
                dispatch(setDonationFilterTaxUnitTypes(undefined));
              } else {
                dispatch(setDonationFilterTaxUnitTypes(selected));
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
                dispatch(setDonationFilterOrganizationIDs(undefined));
              } else {
                dispatch(setDonationFilterOrganizationIDs(selected));
              }
            }}
          ></EffektCheckForm>
        </FilterGroup>

        <FilterStatsTableContainer>
          <table>
            <tbody>
              <tr>
                <td>Count</td>
                <td>{thousandize(statistics.numDonations)}</td>
              </tr>
              <tr>
                <td>Sum</td>
                <td>kr {thousandize(statistics.sumDonations)}</td>
              </tr>
              <tr>
                <td>Average</td>
                <td>kr {thousandize(statistics.avgDonation)}</td>
              </tr>
            </tbody>
          </table>
        </FilterStatsTableContainer>
      </FilterContent>
    </FilterWrapper>
  );
};

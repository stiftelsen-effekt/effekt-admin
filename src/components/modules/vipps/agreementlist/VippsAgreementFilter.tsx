import React, { useCallback, useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../../../../models/state";
import {
  fetchAgreementHistogramAction,
  setVippsAgreementsFilterAmount,
  setVippsAgreementsFilterDonor,
  setVippsAgreementsFilterKID,
  setVippsAgreementsFilterStatus,
  setVippsAgreementsFilterDraftDate,
  setVippsAgreementsFilterChargeDay,
  setVippsAgreementsFilterAgreementID,
  exportVippsAgreementsAction,
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
  FilterDateRangeWrapper,
  FilterDateRange,
  FilterStatsTableContainer,
} from "../../../style/elements/filters.component.style";
import { HistogramInputComponent } from "../../histogram-input/HistogramInput";
import EffektNumberRange from "../../../style/elements/effekt-range/effekt-range.component";
import { thousandize } from "../../../../util/formatting";
import { useAuth0 } from "@auth0/auth0-react";
import { EffektButton } from "../../../style/elements/button.style";
import { Oval } from "react-loader-spinner";
import { Download } from "react-feather";

const statusTypes = [
  { name: "PENDING", id: 0 },
  { name: "ACTIVE", id: 1 },
  { name: "STOPPED", id: 2 },
  { name: "EXPIRED", id: 3 },
];

export const VippsAgreementFilter: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const { getAccessTokenSilently } = useAuth0();

  const stats = useSelector((state: AppState) => state.vippsAgreements.filter.statistics);
  const amountRange = useSelector((state: AppState) => state.vippsAgreements.filter.amount);
  const KID = useSelector((state: AppState) => state.vippsAgreements.filter.KID);
  const donor = useSelector((state: AppState) => state.vippsAgreements.filter.donor);
  const statuses = useSelector((state: AppState) => state.vippsAgreements.filter.statuses);
  const agreementID = useSelector((state: AppState) => state.vippsAgreements.filter.agreementID);
  const draftDate = useSelector((state: AppState) => state.vippsAgreements.filter.created);
  const histogram = useSelector((state: AppState) => state.vippsAgreements.histogram);
  const exportLoading = useSelector((state: AppState) => state.vippsAgreements.exportLoading);
  const [filterIsOpen, setFilterIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!histogram) dispatch(fetchAgreementHistogramAction.started(undefined));
  }, [histogram, dispatch]);

  let statusChoices: Array<EffektCheckChoice> = statusTypes.map((status) => ({
    label: status.name,
    value: status.id,
    selected: statuses ? statuses.indexOf(status.name) !== -1 : true,
  }));

  const exportVippsAgreements = useCallback(() => {
    getAccessTokenSilently().then((token) => {
      dispatch(exportVippsAgreementsAction.started({ token }));
    });
  }, [dispatch, getAccessTokenSilently]);

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
              let minRange = range[0];
              let maxRange = range[1];
              if (isNaN(minRange)) minRange = 0;
              if (isNaN(maxRange)) maxRange = 0;
              dispatch(setVippsAgreementsFilterAmount({ from: minRange, to: maxRange }));
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
              dispatch(setVippsAgreementsFilterDonor(e.target.value));
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
              dispatch(setVippsAgreementsFilterKID(e.target.value));
            }}
          ></FilterInput>
        </FilterGroup>

        <FilterGroup>
          <FilterGroupHeader>Agreement ID like</FilterGroupHeader>
          <FilterInput
            value={agreementID}
            placeholder={"Fuzzy search"}
            style={{ width: "100%" }}
            onChange={(e: any) => {
              dispatch(setVippsAgreementsFilterAgreementID(e.target.value));
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
                dispatch(setVippsAgreementsFilterStatus(undefined));
              } else {
                let newChoices: string[] = [];
                choices.forEach((choiceID) => {
                  newChoices.push(statusTypes[choiceID].name);
                });
                dispatch(setVippsAgreementsFilterStatus(newChoices));
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
              dispatch(setVippsAgreementsFilterChargeDay({ from: from, to: to }));
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
                dispatch(setVippsAgreementsFilterDraftDate(date, draftDate ? draftDate.to : null));
              }}
              onChangeTo={(date) => {
                dispatch(
                  setVippsAgreementsFilterDraftDate(draftDate ? draftDate.from : null, date),
                );
              }}
              onChangeRange={(to, from) => {
                dispatch(setVippsAgreementsFilterDraftDate(to, from));
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
                <td>{thousandize(stats.numAgreements)}</td>
              </tr>
              <tr>
                <td>Sum</td>
                <td>kr {thousandize(stats.sumAgreements)}</td>
              </tr>
              <tr>
                <td>Average</td>
                <td>kr {thousandize(stats.avgAgreement)}</td>
              </tr>
            </tbody>
          </table>

          <EffektButton
            onClick={exportVippsAgreements}
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

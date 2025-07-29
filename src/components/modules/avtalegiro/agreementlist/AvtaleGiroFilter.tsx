import { useAuth0 } from "@auth0/auth0-react";
import React, { useCallback, useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../../../../models/state";
import {
  fetchAvtaleGiroHistogramAction,
  setAvtaleGiroFilterActive,
  setAvtalegiroFilterAmount,
  setAvtaleGiroFilterDonor,
  setAvtaleGiroFilterKID,
  setAvtaleGiroFilterPaymentDate,
  setAvtaleGiroFilterDraftDate,
  exportAvtaleGiroAgreementsAction,
} from "../../../../store/avtalegiro/avtalegiro.actions";
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
import { Oval } from "react-loader-spinner";
import { EffektButton } from "../../../style/elements/button.style";
import { Download } from "react-feather";

const statusTypes = [
  { name: "STOPPED", id: 0 },
  { name: "ACTIVE", id: 1 },
];

export const AvtaleGiroFilter: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const { getAccessTokenSilently } = useAuth0();

  const statistics = useSelector((state: AppState) => state.avtaleGiroAgreements.filter.statistics);
  const histogram = useSelector((state: AppState) => state.avtaleGiroAgreements.histogram);
  const [filterIsOpen, setFilterIsOpen] = useState<boolean>(false);
  const amountRange = useSelector((state: AppState) => state.avtaleGiroAgreements.filter.amount);
  const KID = useSelector((state: AppState) => state.avtaleGiroAgreements.filter.KID);
  const draftDate = useSelector((state: AppState) => state.avtaleGiroAgreements.filter.created);
  const donor = useSelector((state: AppState) => state.avtaleGiroAgreements.filter.donor);
  const statuses = useSelector((state: AppState) => state.avtaleGiroAgreements.filter.statuses);

  const exportLoading = useSelector((state: AppState) => state.avtaleGiroAgreements.exportLoading);

  useEffect(() => {
    if (!histogram) {
      getAccessTokenSilently().then((token) =>
        dispatch(fetchAvtaleGiroHistogramAction.started({ token })),
      );
    }
  }, [histogram, dispatch, getAccessTokenSilently]);

  const statusChoices: Array<EffektCheckChoice> = statusTypes.map((status) => ({
    label: status.name,
    value: status.id,
    // If status is not found, set box to unchecked
    selected: statuses ? statuses.indexOf(status.id) !== -1 : true,
  }));

  const exportAvtaleGiroAgreements = useCallback(() => {
    getAccessTokenSilently().then((token) => {
      dispatch(exportAvtaleGiroAgreementsAction.started({ token }));
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
          <FilterGroupHeader>AvtaleGiro sum</FilterGroupHeader>
          <HistogramInputComponent
            range={[amountRange.from, amountRange.to]}
            histogram={histogram}
            onChange={(range: any) => {
              let minRange = range[0];
              let maxRange = range[1];
              if (isNaN(minRange)) minRange = 0;
              if (isNaN(maxRange)) maxRange = 0;
              dispatch(setAvtalegiroFilterAmount({ from: minRange, to: maxRange }));
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
              dispatch(setAvtaleGiroFilterDonor(e.target.value));
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
              dispatch(setAvtaleGiroFilterKID(e.target.value));
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
                dispatch(setAvtaleGiroFilterActive(undefined));
              } else {
                let newChoices: number[] = [];
                choices.forEach((choiceID) => {
                  newChoices.push(statusTypes[choiceID].id);
                });
                dispatch(setAvtaleGiroFilterActive(newChoices));
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
              dispatch(setAvtaleGiroFilterPaymentDate({ from: from, to: to }));
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
                dispatch(setAvtaleGiroFilterDraftDate(date, draftDate ? draftDate.to : null));
              }}
              onChangeTo={(date) => {
                dispatch(setAvtaleGiroFilterDraftDate(draftDate ? draftDate.from : null, date));
              }}
              onChangeRange={(to, from) => {
                dispatch(setAvtaleGiroFilterDraftDate(to, from));
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

          <EffektButton
            onClick={exportAvtaleGiroAgreements}
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

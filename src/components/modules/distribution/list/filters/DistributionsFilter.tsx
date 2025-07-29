import React, { useCallback, useEffect, useState } from "react";
import {
  FilterHeader,
  FilterWrapper,
  FilterGroup,
  FilterGroupHeader,
  FilterInput,
  FilterStatsTableContainer,
} from "../../../../style/elements/filters.component.style";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../../../models/state";
import {
  setDistributionFilterKid,
  setDistributionFilterDonor,
  fetchDistributionsAction,
  exportDistributionsAction,
} from "../../../../../store/distributions/distribution.actions";
import { FilterOpenButton } from "../../../../style/elements/filter-buttons/filter-open-button.component";
import { useAuth0 } from "@auth0/auth0-react";
import { EffektButton } from "../../../../style/elements/button.style";
import { Oval } from "react-loader-spinner";
import { Download } from "react-feather";

export const DistributionsFiltersComponent: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const { getAccessTokenSilently } = useAuth0();

  const KID = useSelector((state: AppState) => state.distributions.filter.KID);
  const donor = useSelector((state: AppState) => state.distributions.filter.donor);
  const exportLoading = useSelector((state: AppState) => state.distributions.exportLoading);

  const [filterIsOpen, setFilterIsOpen] = useState<boolean>(false);

  useEffect(() => {
    getAccessTokenSilently().then((token) => dispatch(fetchDistributionsAction.started({ token })));
  }, [KID, dispatch, donor, getAccessTokenSilently]);

  const exportDistributions = useCallback(() => {
    getAccessTokenSilently().then((token) =>
      dispatch(exportDistributionsAction.started({ token })),
    );
  }, [dispatch, getAccessTokenSilently]);

  return (
    <FilterWrapper isOpen={filterIsOpen}>
      <FilterOpenButton
        isOpen={filterIsOpen}
        onClick={() => setFilterIsOpen(!filterIsOpen)}
      ></FilterOpenButton>
      <FilterHeader>Filters</FilterHeader>

      <FilterGroup>
        <FilterGroupHeader>KID</FilterGroupHeader>
        <FilterInput
          placeholder="Fuzzysearch"
          style={{ width: "100%" }}
          value={KID}
          onChange={(e) => {
            dispatch(setDistributionFilterKid(e.target.value));
          }}
        ></FilterInput>
      </FilterGroup>

      <FilterGroup>
        <FilterGroupHeader>Donor</FilterGroupHeader>
        <FilterInput
          placeholder="Fuzzysearch"
          style={{ width: "100%" }}
          value={donor}
          onChange={(e) => {
            dispatch(setDistributionFilterDonor(e.target.value));
          }}
        ></FilterInput>
      </FilterGroup>

      <FilterStatsTableContainer>
        <EffektButton
          onClick={exportDistributions}
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
    </FilterWrapper>
  );
};

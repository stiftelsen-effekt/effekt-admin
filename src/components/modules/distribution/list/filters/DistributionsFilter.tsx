import React, { useEffect, useState } from "react";
import {
  FilterHeader,
  FilterWrapper,
  FilterGroup,
  FilterGroupHeader,
  FilterInput,
} from "../../../../style/elements/filters.component.style";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../../../models/state";
import {
  setDistributionFilterKid,
  setDistributionFilterDonor,
  fetchDistributionsAction,
} from "../../../../../store/distributions/distribution.actions";
import { FilterOpenButton } from "../../../../style/elements/filter-buttons/filter-open-button.component";
import { useAuth0 } from "@auth0/auth0-react";

export const DistributionsFiltersComponent: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const { getAccessTokenSilently } = useAuth0();

  const KID = useSelector((state: AppState) => state.distributions.filter.KID);
  const donor = useSelector((state: AppState) => state.distributions.filter.donor);

  const [filterIsOpen, setFilterIsOpen] = useState<boolean>(false);

  useEffect(() => {
    getAccessTokenSilently().then((token) => dispatch(fetchDistributionsAction.started({ token })));
  }, [KID, dispatch, donor, getAccessTokenSilently]);

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
    </FilterWrapper>
  );
};

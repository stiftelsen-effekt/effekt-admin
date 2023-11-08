import React, { useState } from "react";

import {
  FilterWrapper,
  FilterGroupHeader,
  FilterInput,
  FilterGroup,
  FilterHeader,
  FilterContent,
} from "../../../../style/elements/filters.component.style";
import { useSelector, useDispatch } from "react-redux";
import { FilterOpenButton } from "../../../../style/elements/filter-buttons/filter-open-button.component";
import { AppState } from "../../../../../models/state";
import { setLogFilterFilesearchAction } from "../../../../../store/logs/logs-filter.actions";

export const LogsFilter: React.FunctionComponent = () => {
  const dispatch = useDispatch();

  const filesearch = useSelector((state: AppState) => state.logs.filter.filesearch);

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
          <FilterGroupHeader>File content search</FilterGroupHeader>
          <FilterInput
            value={filesearch ? filesearch : ""}
            placeholder={"Fuzzy search"}
            style={{ width: "100%" }}
            onChange={(e) => {
              dispatch(setLogFilterFilesearchAction(e.target.value));
            }}
          ></FilterInput>
        </FilterGroup>
      </FilterContent>
    </FilterWrapper>
  );
};

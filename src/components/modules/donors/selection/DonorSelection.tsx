import { AppState } from "../../../../models/state";
import React, { ChangeEvent, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { DateTime } from "luxon";
import "../../../style/elements/react-table/table.css";
import ReactTable from "react-table";
import {
  searchDonorAction,
  setSelectedDonor,
  IFetchSearchDonorsActionParams,
  setDonorSelectionQuery,
} from "../../../../store/donors/donor-selection.actions";
import { IDonor } from "../../../../models/types";
import { EffektInput } from "../../../style/elements/input.style";
import { shortDate } from "../../../../util/formatting";
import { HelpCircle, PlusSquare } from "react-feather";
import { EffektButton } from "../../../style/elements/button.style";
import { EffektModal } from "../../../style/elements/effekt-modal/effekt-modal.component.style";
import { CreateDonor } from "../create/CreateDonor";
import { useHistory } from "react-router";
import { useAuth0 } from "@auth0/auth0-react";
import {
  FilterWrapper,
  FilterContent,
  FilterHeader,
  FilterGroup,
  FilterGroupHeader,
  FilterDateRangeWrapper,
  FilterDateRange,
  FilterInput,
} from "../../../style/elements/filters.component.style";
import { FilterOpenButton } from "../../../style/elements/filter-buttons/filter-open-button.component";
import { DonationListWrapper } from "../../donations/list/DonationsList.style";

interface IDonorTableState {
  sorted: Array<any>;
  page: number;
  pageSize: number;
  expanded: any;
  resized: any;
  filtered: any;
  selected: any;
}

export const DonorSelectionComponent: React.FunctionComponent<{ pageSize?: number }> = ({
  pageSize,
}) => {
  const history = useHistory();
  const { getAccessTokenSilently } = useAuth0();

  const getDefaultState = (): IDonorTableState => {
    return {
      sorted: [],
      page: 0,
      pageSize: pageSize || 25,
      expanded: {},
      resized: [],
      filtered: [],
      selected: null,
    };
  };

  const [state, setState] = useState<IDonorTableState>(getDefaultState());
  const [searchHelp, setSearchHelp] = useState<boolean>(false);

  const dispatch = useDispatch();
  const searchResult = useSelector((state: AppState) => state.donorSelector.searchResult);
  const searchQuery = useSelector((state: AppState) => state.donorSelector.query);

  const [filter, setFilter] = useState<IFetchSearchDonorsActionParams>({});
  const performSearch = (update: IFetchSearchDonorsActionParams) => {
    var updated = { ...filter, ...update };
    setFilter(updated);
    getAccessTokenSilently().then((token) => {
      dispatch(searchDonorAction.started({ ...updated, token }));
    });
  };
  const [loaded, setLoaded] = useState(false);
  if (!loaded && searchQuery === "") {
    setLoaded(true);
    performSearch({});
  }

  const queryUpdated = (event: ChangeEvent<HTMLInputElement>) => {
    event.persist();
    setState({
      ...state,
      selected: null,
    });
    dispatch(setDonorSelectionQuery(event.target.value));
    performSearch({ query: event.target.value });
  };

  const columnDefinitions = [
    {
      Header: "ID",
      accessor: "id",
      width: 100,
    },
    {
      Header: "name",
      accessor: "name",
      width: 300,
    },
    {
      Header: "email",
      accessor: "email",
      width: 500,
    },
    {
      id: "registered",
      Header: "registered",
      accessor: (donor: IDonor) => shortDate(donor.registered),
      sortMethod: (a: any, b: any) => {
        return DateTime.fromFormat(a, "dd.MM.yyyy") > DateTime.fromFormat(b, "dd.MM.yyyy") ? -1 : 1;
      },
      width: 150,
    },
  ];

  const rowClick = (rowInfo: any) => {
    setState({
      ...state,
      selected: rowInfo.index,
    });
    dispatch(setSelectedDonor(rowInfo.original));
  };

  const rowDoubleClick = (donorID: number) => {
    history.push(`donors/${donorID}`);
  };

  const rowStyle = (rowIndex: number, selectedIndex: number) => {
    return {
      background: rowIndex === selectedIndex ? "black" : "",
      color: rowIndex === selectedIndex ? "white" : "",
    };
  };

  const trProps = (tableState: any, rowInfo: any) => {
    if (rowInfo && rowInfo.row) {
      return {
        onClick: (e: React.MouseEvent) => rowClick(rowInfo),
        onDoubleClick: (e: any) => rowDoubleClick(rowInfo.original.id),
        style: rowStyle(rowInfo.index, state.selected),
      };
    } else {
      return {};
    }
  };

  const [showCreate, setShowCreate] = useState<boolean>(false);
  const [filterIsOpen, setFilterIsOpen] = useState<boolean>(false);

  return (
    <div>
      <FilterWrapper isOpen={filterIsOpen}>
        <FilterContent>
          <FilterOpenButton
            isOpen={filterIsOpen}
            onClick={() => setFilterIsOpen(!filterIsOpen)}
          ></FilterOpenButton>
          <FilterHeader>Filters</FilterHeader>

          <FilterGroup>
            <FilterGroupHeader>Total donated</FilterGroupHeader>
            <FilterInput
              placeholder="From"
              style={{ width: "47%", marginRight: "5%" }}
              value={undefined}
              onChange={(e) => {
                performSearch({
                  totalDonations: {
                    to: filter.totalDonations ? filter.totalDonations.to : null,
                    from: parseInt(e.target.value),
                  },
                });
              }}
            ></FilterInput>
            <FilterInput
              placeholder="To"
              style={{ width: "47%" }}
              value={undefined}
              onChange={(e) => {
                performSearch({
                  totalDonations: {
                    from: filter.totalDonations ? filter.totalDonations.from : null,
                    to: parseInt(e.target.value),
                  },
                });
              }}
            ></FilterInput>
          </FilterGroup>

          <FilterGroup>
            <FilterGroupHeader>Registered</FilterGroupHeader>
            <FilterDateRangeWrapper>
              <FilterDateRange
                from={filter.registered ? filter.registered.from : null}
                to={filter.registered ? filter.registered.to : null}
                onChangeFrom={(date) => {
                  performSearch({
                    registered: { to: filter.registered ? filter.registered.to : null, from: date },
                  });
                }}
                onChangeTo={(date) => {
                  performSearch({
                    registered: {
                      from: filter.registered ? filter.registered.from : null,
                      to: date,
                    },
                  });
                }}
                onChangeRange={(from, to) => {
                  performSearch({ registered: { from: from, to: to } });
                }}
                inverted
              ></FilterDateRange>
            </FilterDateRangeWrapper>
          </FilterGroup>
        </FilterContent>
      </FilterWrapper>
      <DonationListWrapper>
        {" "}
        {/* XXX TODO move to generic FilteredListWrapper? */}
        <div
          style={{ display: "flex", marginBottom: "16px", columnGap: "10px", alignItems: "center" }}
        >
          <EffektInput
            type="text"
            value={searchQuery}
            onChange={queryUpdated}
            placeholder="søk"
            style={{ flexGrow: 1 }}
          ></EffektInput>
          <HelpCircle
            size={22}
            onClick={() => setSearchHelp((help) => !help)}
            style={{ userSelect: "none", cursor: "pointer" }}
          ></HelpCircle>
          <EffektButton onClick={() => setShowCreate(true)}>
            <span>Create &nbsp;</span>{" "}
            <PlusSquare color={"white"} size={18} style={{ verticalAlign: "middle" }} />
          </EffektButton>
          <div
            style={{
              display: searchHelp ? "flex" : "none",
              marginBottom: "10px",
              columnGap: "20px",
              fontSize: "12px",
            }}
          >
            <p>
              <strong>+</strong> means AND
              <br />
              <strong>-</strong> means NOT
              <br />
              <strong>[no operator]</strong> means OR
              <br />
            </p>
            <p>
              For example, <i>+Håkon -gmail</i> will match Håkon in either name or email, where
              gmail is not in name or email
              <br />
              <i>Jørgen Ljønes</i> will match either Jørgen or Ljønes in either name or email
              <br />
              Results are limited to 100 matches
            </p>
          </div>

          <EffektModal
            visible={showCreate}
            effect="fadeInUp"
            onClickAway={() => setShowCreate(false)}
          >
            <CreateDonor onSubmit={() => setShowCreate(false)}></CreateDonor>
          </EffektModal>
        </div>
        <ReactTable
          data={searchResult}
          columns={columnDefinitions}
          defaultPageSize={state.pageSize}
          onSortedChange={(sorted) => setState({ ...state, sorted })}
          onPageChange={(page) => setState({ ...state, page })}
          onPageSizeChange={(pageSize, page) => setState({ ...state, page, pageSize })}
          onExpandedChange={(expanded) => setState({ ...state, expanded })}
          onResizedChange={(resized) => setState({ ...state, resized })}
          onFilteredChange={(filtered) => setState({ ...state, filtered })}
          getTrProps={trProps}
        ></ReactTable>
      </DonationListWrapper>
    </div>
  );
};

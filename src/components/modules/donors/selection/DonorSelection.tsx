import { AppState, DonorFiltersState } from "../../../../models/state";
import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { ColumnDef, Row, SortingState } from "@tanstack/react-table";
import { useDispatch, useSelector } from "react-redux";
import { DateTime } from "luxon";
import "../../../style/elements/react-table/table.css";
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
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { EffektTable } from "../../../style/elements/react-table/EffektTable";

interface IDonorTableState {
  sorted: SortingState;
  page: number;
  pageSize: number;
  selected: number | null;
}

export const DonorSelectionComponent: React.FunctionComponent<{ pageSize?: number }> = ({
  pageSize,
}) => {
  const navigate = useNavigate();
  const { getAccessTokenSilently } = useAuth0();

  const getDefaultState = (): IDonorTableState => {
    return {
      sorted: [],
      page: 0,
      pageSize: pageSize || 25,
      selected: null,
    };
  };

  const [state, setState] = useState<IDonorTableState>(getDefaultState());
  const [searchHelp, setSearchHelp] = useState<boolean>(false);

  const dispatch = useDispatch();
  const searchResult = useSelector((state: AppState) => state.donorSelector.searchResult);
  const searchQuery = useSelector((state: AppState) => state.donorSelector.query);
  const loading = useSelector((state: AppState) => state.donorSelector.loading);

  const performSearch = useCallback(
    (update: IFetchSearchDonorsActionParams) => {
      var updated = { ...update };
      getAccessTokenSilently().then((token) => {
        dispatch(searchDonorAction.started({ ...updated, token }));
      });
    },
    [getAccessTokenSilently, dispatch],
  );

  useEffect(() => {
    performSearch({
      page: state.page,
      limit: state.pageSize,
      sort: state.sorted.length > 0 ? state.sorted[0] : undefined,
      filter: getFilterFromQuery(searchQuery),
    });
  }, [searchQuery, state.pageSize, state.sorted, state.page, performSearch]);

  const queryUpdated = (event: ChangeEvent<HTMLInputElement>) => {
    event.persist();
    setState({
      ...state,
      page: 0,
      selected: null,
    });
    dispatch(setDonorSelectionQuery(event.target.value));
  };

  const columnDefinitions: ColumnDef<IDonor>[] = [
    {
      header: "ID",
      accessorKey: "id",
      size: 100,
    },
    {
      header: "name",
      accessorKey: "name",
      size: 300,
    },
    {
      header: "email",
      accessorKey: "email",
      size: 500,
    },
    {
      id: "registered",
      header: "registered",
      accessorFn: (donor: IDonor) => donor.registered,
      cell: ({ getValue }) => shortDate(DateTime.fromISO(getValue<string>())),
      size: 150,
    },
  ];

  const rowClick = (row: Row<IDonor>) => {
    setState({
      ...state,
      selected: row.index,
    });
    dispatch(setSelectedDonor(row.original));
  };

  const rowDoubleClick = (donorID: number) => {
    navigate(`/donors/${donorID}`);
  };

  const rowStyle = (rowIndex: number, selectedIndex: number | null) => {
    return {
      background: rowIndex === selectedIndex ? "black" : "",
      color: rowIndex === selectedIndex ? "white" : "",
    };
  };

  const getRowProps = (row: Row<IDonor>) => ({
    onClick: () => rowClick(row),
    onDoubleClick: () => rowDoubleClick(row.original.id),
    style: rowStyle(row.index, state.selected),
  });

  const [showCreate, setShowCreate] = useState<boolean>(false);

  return (
    <div>
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
            For example, <i>+Håkon -gmail</i> will match Håkon in either name or email, where gmail
            is not in name or email
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
      <EffektTable
        data={searchResult?.rows || []}
        columns={columnDefinitions}
        defaultPageSize={state.pageSize}
        manualPagination
        manualSorting
        pageCount={searchResult?.pages || 0}
        pagination={{ pageIndex: state.page, pageSize: state.pageSize }}
        sorting={state.sorted}
        onSortingChange={(sorted) => setState({ ...state, sorted })}
        onPaginationChange={(pagination) =>
          setState({ ...state, page: pagination.pageIndex, pageSize: pagination.pageSize })
        }
        getRowProps={getRowProps}
        loading={loading}
      />
    </div>
  );
};

const getFilterFromQuery = (query: string): DonorFiltersState => {
  return {
    name: "",
    email: "",
    query: query,
    donorId: null,
    registeredDate: {
      from: null,
      to: null,
    },
    donationsDateRange: {
      from: null,
      to: null,
    },
    lastDonationDate: {
      from: null,
      to: null,
    },
    donationsCount: {
      from: null,
      to: null,
    },
    donationsSum: {
      from: null,
      to: null,
    },
    referralTypeIDs: undefined,
    recipientOrgIDs: undefined,
  };
};

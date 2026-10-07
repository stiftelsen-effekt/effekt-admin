import React, { useEffect } from "react";
import { ColumnDef, Row, SortingState } from "@tanstack/react-table";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../../models/state";
import { useNavigate } from "react-router-dom";
import { IAutoGiroMandate } from "../../../../models/types";
import { useAuth0 } from "@auth0/auth0-react";
import {
  fetchAutoGiroMandatesAction,
  setAutoGiroMandatePagination,
} from "../../../../store/autogiro/autogiromedgivande.actions";
import {
  EffektTable,
  paginationFromApiState,
  sortingFromApiState,
  sortingToApiState,
} from "../../../style/elements/react-table/EffektTable";

export const AutoGiroMandateList: React.FunctionComponent<{
  mandates: Array<IAutoGiroMandate> | undefined;
  manual?: boolean;
  defaultPageSize?: number;
}> = ({ mandates, manual, defaultPageSize }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { getAccessTokenSilently } = useAuth0();

  const loading = useSelector((state: AppState) => state.autoGiroMandates.loading);
  const pages = useSelector((state: AppState) => state.autoGiroMandates.pages);
  const pagination = useSelector((state: AppState) => state.autoGiroMandates.pagination);

  useEffect(() => {
    if (manual) {
      getAccessTokenSilently().then((token) =>
        dispatch(fetchAutoGiroMandatesAction.started({ token })),
      );
    }
  }, [pagination, manual, dispatch, getAccessTokenSilently]);

  const columnDefinitions: ColumnDef<IAutoGiroMandate>[] = [
    {
      header: "Mandate ID",
      accessorKey: "ID",
      id: "ID",
      size: 120,
    },
    {
      header: "Donor",
      accessorKey: "full_name",
    },
    {
      header: "Status",
      accessorKey: "status",
      id: "status",
      size: 90,
    },
    {
      header: "KID",
      accessorKey: "KID",
      id: "kid",
      size: 160,
    },
  ];

  const defaultSorting: SortingState = sortingFromApiState(pagination.sort);

  const getRowProps = (row: Row<IAutoGiroMandate>) => ({
    onDoubleClick: () => {
      navigate(`/autogiro/mandates/${row.original.ID}`);
    },
  });

  if (manual) {
    return (
      <EffektTable
        data={mandates}
        manualPagination
        manualSorting
        pageCount={pages}
        pagination={paginationFromApiState(pagination)}
        sorting={defaultSorting}
        loading={loading}
        columns={columnDefinitions}
        initialSorting={defaultSorting}
        onPaginationChange={(nextPagination) =>
          dispatch(
            setAutoGiroMandatePagination({
              ...pagination,
              page: nextPagination.pageIndex,
              limit: nextPagination.pageSize,
            }),
          )
        }
        onSortingChange={(nextSorting) =>
          dispatch(
            setAutoGiroMandatePagination({
              ...pagination,
              sort: sortingToApiState(nextSorting, pagination.sort),
            }),
          )
        }
        getRowProps={getRowProps}
      />
    );
  } else {
    return (
      <EffektTable
        data={mandates}
        loading={loading}
        columns={columnDefinitions}
        defaultPageSize={defaultPageSize}
        initialSorting={defaultSorting}
        getRowProps={getRowProps}
      />
    );
  }
};

import React, { useEffect, useState } from "react";
import { ColumnDef, Row, SortingState } from "@tanstack/react-table";
import { useDispatch, useSelector } from "react-redux";
import { fetchLogsAction, setLogsPaginationAction } from "../../../../store/logs/logs-list.actions";
import { AppState } from "../../../../models/state";
import { longDateTime } from "../../../../util/formatting";
import { DateTime } from "luxon";
import { Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import {
  EffektTable,
  paginationFromApiState,
  sortingFromApiState,
  sortingToApiState,
} from "../../../style/elements/react-table/EffektTable";
import { ILogEntry } from "../../../../models/types";

interface LogsListProps {
  showPagination?: boolean;
  showMeta?: boolean;
}
export const LogsList: React.FC<LogsListProps> = ({ showPagination = true, showMeta = true }) => {
  const data = useSelector((state: AppState) => state.logs.entries);
  const pages = useSelector((state: AppState) => state.logs.pages);
  const loading = useSelector((state: AppState) => state.logs.loading);
  const pagination = useSelector((state: AppState) => state.logs.pagination);

  const dispatch = useDispatch();
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    getAccessTokenSilently().then((token) => dispatch(fetchLogsAction.started({ token })));
  }, [pagination, dispatch, getAccessTokenSilently]);

  const columnDefinitions: ColumnDef<ILogEntry>[] = [
    {
      header: "ID",
      accessorKey: "ID",
      size: 80,
    },
    {
      header: "Label",
      accessorKey: "label",
      size: 180,
    },
    {
      header: "Timestamp",
      id: "timestamp",
      accessorFn: (entry) => entry.timestamp,
      cell: ({ getValue }) => longDateTime(DateTime.fromISO(getValue<string>())),
      size: showMeta ? 150 : undefined,
    },
  ];

  if (showMeta) {
    columnDefinitions.push({
      header: "Meta",
      accessorKey: "meta",
    });
  }

  const defaultSorting: SortingState = sortingFromApiState(pagination.sort);

  let [entry, setEntry] = useState<number | null>(null);
  const getRowProps = (row: Row<ILogEntry>) => ({
    onDoubleClick: () => {
      setEntry(row.original.ID);
    },
  });

  if (entry !== null) return <Navigate to={`/logs/${entry}`} replace />;
  return (
    <EffektTable
      data={data}
      manualPagination
      manualSorting
      pageCount={pages}
      pagination={paginationFromApiState(pagination)}
      sorting={defaultSorting}
      loading={loading}
      columns={columnDefinitions}
      initialSorting={defaultSorting}
      showPagination={showPagination}
      onPaginationChange={(nextPagination) =>
        dispatch(
          setLogsPaginationAction({
            ...pagination,
            page: nextPagination.pageIndex,
            limit: nextPagination.pageSize,
          }),
        )
      }
      onSortingChange={(nextSorting) =>
        dispatch(
          setLogsPaginationAction({
            ...pagination,
            sort: sortingToApiState(nextSorting, pagination.sort),
          }),
        )
      }
      getRowProps={getRowProps}
    />
  );
};

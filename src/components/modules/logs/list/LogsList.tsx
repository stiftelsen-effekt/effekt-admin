import React, { useEffect, useState } from "react";
import ReactTable from "react-table";
import { useDispatch, useSelector } from "react-redux";
import { fetchLogsAction, setLogsPaginationAction } from "../../../../store/logs/logs-list.actions";
import { AppState } from "../../../../models/state";
import { longDateTime } from "../../../../util/formatting";
import { DateTime } from "luxon";
import { Redirect } from "react-router";
import { useAuth0 } from "@auth0/auth0-react";

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

  const columnDefinitions: any = [
    {
      Header: "ID",
      accessor: "ID",
      width: 80,
    },
    {
      Header: "Label",
      accessor: "label",
      width: 180,
    },
    {
      Header: "Timestamp",
      id: "timestamp",
      accessor: (res: any) => longDateTime(DateTime.fromISO(res.timestamp)),
      width: showMeta ? 150 : undefined,
    },
  ];

  if (showMeta) {
    columnDefinitions.push({
      Header: "Meta",
      accessor: "meta",
    });
  }

  const defaultSorting = [{ id: "timestamp", desc: true }];

  let [entry, setEntry] = useState<number | null>(null);
  const trProps = (tableState: any, rowInfo: any) => {
    if (rowInfo && rowInfo.row) {
      return {
        onDoubleClick: (e: any) => {
          setEntry(rowInfo.original.ID);
        },
      };
    }
    return {};
  };

  if (entry !== null) return <Redirect to={`/logs/${entry}`}></Redirect>;
  return (
    <ReactTable
      manual
      data={data}
      page={pagination.page}
      pages={pages}
      pageSize={pagination.limit}
      loading={loading}
      columns={columnDefinitions}
      defaultSorted={defaultSorting}
      showPagination={showPagination}
      onPageChange={(page) => dispatch(setLogsPaginationAction({ ...pagination, page }))}
      onSortedChange={(sorted) =>
        dispatch(setLogsPaginationAction({ ...pagination, sort: sorted[0] }))
      }
      onPageSizeChange={(pagesize) =>
        dispatch(setLogsPaginationAction({ ...pagination, limit: pagesize }))
      }
      getTrProps={trProps}
    />
  );
};

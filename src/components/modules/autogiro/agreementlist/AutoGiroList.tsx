import React, { useEffect } from "react";
import ReactTable from "react-table";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../../models/state";
import { longDateTime, shortDate, thousandize } from "../../../../util/formatting";
import { DateTime } from "luxon";
import { useHistory } from "react-router";
import {
  fetchAutoGiroAgreementsAction,
  setAutoGiroPagination,
} from "../../../../store/autogiro/autogiro.actions";
import { IAutoGiro } from "../../../../models/types";
import { useAuth0 } from "@auth0/auth0-react";

export const AutoGiroList: React.FunctionComponent<{
  agreements: Array<IAutoGiro> | undefined;
  manual?: boolean;
  defaultPageSize?: number;
}> = ({ agreements, manual, defaultPageSize }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { getAccessTokenSilently } = useAuth0();

  const loading = useSelector((state: AppState) => state.autoGiroAgreements.loading);
  const pages = useSelector((state: AppState) => state.autoGiroAgreements.pages);
  const pagination = useSelector((state: AppState) => state.autoGiroAgreements.pagination);

  useEffect(() => {
    if (manual) {
      getAccessTokenSilently().then((token) =>
        dispatch(fetchAutoGiroAgreementsAction.started({ token })),
      );
    }
  }, [pagination, manual, dispatch, getAccessTokenSilently]);

  const columnDefinitions = [
    {
      Header: "Agreement ID",
      accessor: "ID",
      id: "id",
      width: 120,
    },
    {
      Header: "Donor",
      accessor: "full_name",
    },
    {
      Header: "Status",
      id: "active",
      accessor: (res: IAutoGiro) => {
        console.log(res.active, res.cancelled);
        if (res.active) return "ACTIVE";
        if (!res.active && res.cancelled) return "STOPPED";
        return "INACTIVE";
      },
      width: 90,
    },
    {
      Header: "Sum",
      id: "amount",
      accessor: (res: IAutoGiro) => thousandize(res.amount),
      sortMethod: (a: any, b: any) => {
        return parseFloat(a.replace(" ", "")) > parseFloat(b.replace(" ", "")) ? -1 : 1;
      },
      width: 85,
    },
    {
      Header: "Day",
      accessor: "payment_date",
      id: "payment_date",
      width: 60,
    },
    {
      Header: "KID",
      accessor: "KID",
      id: "kid",
      width: 160,
    },
    {
      Header: "Draft date",
      id: "created",
      accessor: (res: any) => shortDate(DateTime.fromISO(res.created, { setZone: true })),
      width: 110,
    },
    {
      Header: "Last updated",
      id: "last_updated",
      accessor: (res: any) => longDateTime(DateTime.fromISO(res.last_updated)),
      width: 150,
    },
    {
      Header: "Cancellation date",
      id: "cancelled",
      accessor: (res: any) =>
        res.cancelled && shortDate(DateTime.fromISO(res.cancelled, { setZone: true })),
      width: 115,
    },
    {
      Header: "Notify",
      id: "notice",
      accessor: (res: any) => (res.notice ? "YES" : "NO"),
      width: 60,
    },
  ];

  const defaultSorting = [{ id: "created", desc: true }];

  const trProps = (tableState: any, rowInfo: any) => {
    if (rowInfo && rowInfo.row) {
      return {
        onDoubleClick: (e: any) => {
          history.push(`/autogiro/${rowInfo.original.ID}`);
        },
      };
    }
    return {};
  };

  if (manual) {
    return (
      <ReactTable
        manual
        data={agreements}
        page={pagination.page}
        pages={pages}
        pageSize={pagination.limit}
        loading={loading}
        columns={columnDefinitions}
        defaultSorted={defaultSorting}
        onPageChange={(page) => dispatch(setAutoGiroPagination({ ...pagination, page }))}
        onSortedChange={(sorted) =>
          dispatch(setAutoGiroPagination({ ...pagination, sort: sorted[0] }))
        }
        onPageSizeChange={(pagesize) =>
          dispatch(setAutoGiroPagination({ ...pagination, limit: pagesize }))
        }
        getTrProps={trProps}
      />
    );
  } else {
    return (
      <ReactTable
        data={agreements}
        loading={loading}
        columns={columnDefinitions}
        defaultPageSize={defaultPageSize}
        defaultSorted={defaultSorting}
        getTrProps={trProps}
      />
    );
  }
};

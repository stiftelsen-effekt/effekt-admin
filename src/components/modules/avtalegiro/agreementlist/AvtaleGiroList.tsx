import React, { useEffect } from "react";
import { ColumnDef, Row, SortingState } from "@tanstack/react-table";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../../models/state";
import { longDateTime, shortDate, thousandize } from "../../../../util/formatting";
import { DateTime } from "luxon";
import { useNavigate } from "react-router-dom";
import {
  fetchAvtaleGiroAgreementsAction,
  setAvtaleGiroPagination,
} from "../../../../store/avtalegiro/avtalegiro.actions";
import { IAvtaleGiro } from "../../../../models/types";
import { useAuth0 } from "@auth0/auth0-react";
import {
  EffektTable,
  paginationFromApiState,
  sortingFromApiState,
  sortingToApiState,
} from "../../../style/elements/react-table/EffektTable";

type AvtaleGiroTableRow = IAvtaleGiro & {
  ID?: string;
  notice?: number;
};

export const AvtaleGiroList: React.FunctionComponent<{
  agreements: Array<AvtaleGiroTableRow> | undefined;
  manual?: boolean;
  defaultPageSize?: number;
}> = ({ agreements, manual, defaultPageSize }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { getAccessTokenSilently } = useAuth0();

  const loading = useSelector((state: AppState) => state.avtaleGiroAgreements.loading);
  const pages = useSelector((state: AppState) => state.avtaleGiroAgreements.pages);
  const pagination = useSelector((state: AppState) => state.avtaleGiroAgreements.pagination);

  useEffect(() => {
    if (manual) {
      getAccessTokenSilently().then((token) =>
        dispatch(fetchAvtaleGiroAgreementsAction.started({ token })),
      );
    }
  }, [pagination, manual, dispatch, getAccessTokenSilently]);

  const columnDefinitions: ColumnDef<AvtaleGiroTableRow>[] = [
    {
      header: "Agreement ID",
      id: "id",
      accessorFn: (agreement) => agreement.ID ?? agreement.id,
      size: 120,
    },
    {
      header: "Donor",
      accessorFn: (agreement) => agreement.full_name || agreement.donor,
      id: "full_name",
    },
    {
      header: "Status",
      id: "active",
      accessorFn: (agreement) => {
        if (agreement.active === 1) return "ACTIVE";
        if (agreement.active === 0 && agreement.cancelled) return "STOPPED";
        return "INACTIVE";
      },
      size: 90,
    },
    {
      header: "Sum",
      id: "amount",
      accessorFn: (agreement) => agreement.amount,
      cell: ({ getValue }) => thousandize(getValue<number>()),
      size: 85,
    },
    {
      header: "Day",
      accessorKey: "payment_date",
      id: "paymentDate",
      size: 60,
    },
    {
      header: "KID",
      accessorKey: "KID",
      id: "kid",
      size: 160,
    },
    {
      header: "Draft date",
      id: "created",
      accessorFn: (agreement) => agreement.created,
      cell: ({ getValue }) => shortDate(DateTime.fromISO(getValue<string>(), { setZone: true })),
      size: 110,
    },
    {
      header: "Last updated",
      id: "lastUpdated",
      accessorFn: (agreement) => agreement.last_updated,
      cell: ({ getValue }) => longDateTime(DateTime.fromISO(getValue<string>())),
      size: 150,
    },
    {
      header: "Cancellation date",
      id: "cancelled",
      accessorFn: (agreement) => agreement.cancelled ?? "",
      cell: ({ getValue }) => {
        const cancelled = getValue<string>();
        return cancelled ? shortDate(DateTime.fromISO(cancelled, { setZone: true })) : "";
      },
      size: 115,
    },
    {
      header: "Notify",
      id: "notice",
      accessorFn: (agreement) => (agreement.notice === 1 ? "YES" : "NO"),
      size: 60,
    },
  ];

  const defaultSorting: SortingState = manual
    ? sortingFromApiState(pagination.sort)
    : [{ id: "created", desc: true }];

  const getRowProps = (row: Row<AvtaleGiroTableRow>) => ({
    onDoubleClick: () => {
      navigate(`/avtalegiro/${row.original.ID ?? row.original.id}`);
    },
  });

  if (manual) {
    return (
      <EffektTable
        data={agreements}
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
            setAvtaleGiroPagination({
              ...pagination,
              page: nextPagination.pageIndex,
              limit: nextPagination.pageSize,
            }),
          )
        }
        onSortingChange={(nextSorting) =>
          dispatch(
            setAvtaleGiroPagination({
              ...pagination,
              sort: sortingToApiState(nextSorting, pagination.sort),
            }),
          )
        }
        getRowProps={getRowProps}
      />
    );
  }

  return (
    <EffektTable
      data={agreements}
      loading={loading}
      columns={columnDefinitions}
      defaultPageSize={defaultPageSize}
      initialSorting={defaultSorting}
      getRowProps={getRowProps}
    />
  );
};

import React, { useEffect } from "react";
import { ColumnDef, Row, SortingState } from "@tanstack/react-table";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../../models/state";
import { shortDate, thousandize } from "../../../../util/formatting";
import { DateTime } from "luxon";
import { useNavigate } from "react-router-dom";
import {
  fetchVippsAgreementsAction,
  setVippsAgreementsPagination,
  setVippsAgreementsFilterAgreementID,
  setVippsAgreementsFilterDonor,
  setVippsAgreementsFilterKID,
  setVippsAgreementsFilterStatus,
  setVippsAgreementsFilterAmount,
  setVippsAgreementsFilterChargeDay,
  setVippsAgreementsFilterDraftDate,
} from "../../../../store/vipps/vipps.actions";
import { IVippsAgreement } from "../../../../models/types";
import { useAuth0 } from "@auth0/auth0-react";
import { FilterHeader, FilterIcon } from "./VippsAgreementList.style";
import {
  EffektTable,
  paginationFromApiState,
  sortingFromApiState,
  sortingToApiState,
} from "../../../style/elements/react-table/EffektTable";

type VippsAgreementTableRow = IVippsAgreement & {
  ID?: string;
  full_name?: string;
};

export const VippsAgreementList: React.FunctionComponent<{
  agreements: Array<VippsAgreementTableRow> | undefined;
  manual?: boolean;
  defaultPageSize?: number;
}> = ({ agreements, manual, defaultPageSize }) => {
  const pages = useSelector((state: AppState) => state.vippsAgreements.pages);
  const loading = useSelector((state: AppState) => state.vippsAgreements.loading);
  const pagination = useSelector((state: AppState) => state.vippsAgreements.pagination);
  const filter = useSelector((state: AppState) => state.vippsAgreements.filter);

  const dispatch = useDispatch();
  const { getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (manual) {
      getAccessTokenSilently().then((token) =>
        dispatch(fetchVippsAgreementsAction.started({ token })),
      );
    }
  }, [pagination, manual, dispatch, getAccessTokenSilently]);

  const columnDefinitions: ColumnDef<VippsAgreementTableRow>[] = [
    {
      header: () => {
        if (!manual) return "Agreement ID";

        return filter.agreementID && filter.agreementID.length > 0 ? (
          <FilterHeader>
            <span>Agreement ID</span>
            <FilterIcon
              onClick={(event) => {
                event.stopPropagation();
                dispatch(setVippsAgreementsFilterAgreementID(""));
              }}
            />
          </FilterHeader>
        ) : (
          "Agreement ID"
        );
      },
      accessorFn: (agreement) => agreement.ID ?? agreement.id,
      id: "id",
      size: 140,
    },
    {
      header: () => {
        if (!manual) return "Donor";

        return filter.donor && filter.donor.length > 0 ? (
          <FilterHeader>
            <span>Donor</span>
            <FilterIcon
              onClick={(event) => {
                event.stopPropagation();
                dispatch(setVippsAgreementsFilterDonor(""));
              }}
            />
          </FilterHeader>
        ) : (
          "Donor"
        );
      },
      accessorFn: (agreement) => agreement.full_name ?? String(agreement.donorID),
      id: "full_name",
    },
    {
      header: () => {
        if (!manual) return "Status";

        return filter.statuses && filter.statuses.length > 0 ? (
          <FilterHeader>
            <span>Status</span>
            <FilterIcon
              onClick={(event) => {
                event.stopPropagation();
                dispatch(setVippsAgreementsFilterStatus(undefined));
              }}
            />
          </FilterHeader>
        ) : (
          "Status"
        );
      },
      accessorKey: "status",
      size: 110,
    },
    {
      header: () => {
        if (!manual) return "Sum";

        return filter.amount.from > 0 || filter.amount.to !== Number.MAX_SAFE_INTEGER ? (
          <FilterHeader>
            <span>Sum</span>
            <FilterIcon
              onClick={(event) => {
                event.stopPropagation();
                dispatch(setVippsAgreementsFilterAmount({ from: 0, to: Number.MAX_SAFE_INTEGER }));
              }}
            />
          </FilterHeader>
        ) : (
          "Sum"
        );
      },
      id: "amount",
      size: 110,
      accessorFn: (agreement) => agreement.amount,
      cell: ({ getValue }) => thousandize(getValue<number>()),
    },
    {
      header: () => {
        if (!manual) return "Charge day";

        return filter.chargeDay && (filter.chargeDay.from > 0 || filter.chargeDay.to < 28) ? (
          <FilterHeader>
            <span>Charge day</span>
            <FilterIcon
              onClick={(event) => {
                event.stopPropagation();
                dispatch(setVippsAgreementsFilterChargeDay({ from: 0, to: 28 }));
              }}
            />
          </FilterHeader>
        ) : (
          "Charge day"
        );
      },
      accessorKey: "monthly_charge_day",
      id: "chargeDay",
      size: 80,
    },
    {
      header: () => {
        if (!manual) return "KID";

        return filter.KID && filter.KID.length > 0 ? (
          <FilterHeader>
            <span>KID</span>
            <FilterIcon
              onClick={(event) => {
                event.stopPropagation();
                dispatch(setVippsAgreementsFilterKID(""));
              }}
            />
          </FilterHeader>
        ) : (
          "KID"
        );
      },
      accessorKey: "KID",
      id: "kid",
      size: 120,
    },
    {
      header: () => {
        if (!manual) return "Draft date";

        return filter.created && (filter.created.from || filter.created.to) ? (
          <FilterHeader>
            <span>Draft date</span>
            <FilterIcon
              onClick={(event) => {
                event.stopPropagation();
                dispatch(setVippsAgreementsFilterDraftDate(null, null));
              }}
            />
          </FilterHeader>
        ) : (
          "Draft date"
        );
      },
      id: "created",
      accessorFn: (agreement) => agreement.timestamp_created,
      cell: ({ getValue }) => shortDate(DateTime.fromISO(getValue<string>())),
      size: 120,
    },
  ];

  const defaultSorting: SortingState = manual
    ? sortingFromApiState(pagination.sort)
    : [{ id: "created", desc: true }];

  const getRowProps = (row: Row<VippsAgreementTableRow>) => ({
    onDoubleClick: () => {
      navigate(`/vipps/agreement/${row.original.ID ?? row.original.id}`);
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
            setVippsAgreementsPagination({
              ...pagination,
              page: nextPagination.pageIndex,
              limit: nextPagination.pageSize,
            }),
          )
        }
        onSortingChange={(nextSorting) =>
          dispatch(
            setVippsAgreementsPagination({
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
      defaultPageSize={defaultPageSize}
      columns={columnDefinitions}
      initialSorting={defaultSorting}
      getRowProps={getRowProps}
    />
  );
};

import React, { useEffect } from "react";
import { ColumnDef, Row, SortingState } from "@tanstack/react-table";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDonationsAction,
  setDonationsPagination,
} from "../../../../store/donations/donations-list.actions";
import { AppState } from "../../../../models/state";
import { shortDate, thousandize } from "../../../../util/formatting";
import { DateTime } from "luxon";
import { useNavigate } from "react-router-dom";
import { IDonation } from "../../../../models/types";
import { useAuth0 } from "@auth0/auth0-react";
import { FilterHeader, FilterIcon } from "./DonationsList.style";
import {
  setDonationFilterDateRange,
  setDonationFilterDonationId,
  setDonationFilterDonor,
  setDonationFilterKid,
  setDonationFilterPaymentMethodIDs,
  setDonationFilterSumRange,
  setDonationFilterTaxUnitTypes,
} from "../../../../store/donations/donation-filters.actions";
import { Briefcase, User } from "react-feather";
import {
  EffektTable,
  paginationFromApiState,
  sortingFromApiState,
  sortingToApiState,
} from "../../../style/elements/react-table/EffektTable";

type DonationTableRow = IDonation & {
  donor?: string;
  kid?: string;
  taxUnitType?: string | null;
  timestamp: Date | string;
};

interface Props {
  donations: Array<IDonation> | undefined;
  manual?: boolean;
  defaultPageSize?: number;
  hideDonorName?: boolean;
  hideKID?: boolean;
}

export const DonationsList: React.FunctionComponent<Props> = ({
  donations,
  manual,
  defaultPageSize,
  hideDonorName,
  hideKID,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { getAccessTokenSilently } = useAuth0();

  const pages = useSelector((state: AppState) => state.donations.pages);
  const loading = useSelector((state: AppState) => state.donations.loading);
  const pagination = useSelector((state: AppState) => state.donations.pagination);
  const filter = useSelector((state: AppState) => state.donations.filter);
  const paymentMethods = useSelector((state: AppState) => state.singleDonation.paymentMethods);

  useEffect(() => {
    if (manual) {
      getAccessTokenSilently().then((token) => dispatch(fetchDonationsAction.started({ token })));
    }
  }, [pagination, manual, dispatch, getAccessTokenSilently]);

  const columnDefinitions: ColumnDef<DonationTableRow>[] = [
    {
      header: () => {
        if (!manual) return "ID";
        return filter.id ? (
          <FilterHeader>
            <span>ID</span>
            <FilterIcon
              onClick={(event) => {
                event.stopPropagation();
                dispatch(setDonationFilterDonationId(""));
              }}
            />
          </FilterHeader>
        ) : (
          "ID"
        );
      },
      accessorKey: "id",
      size: 80,
    },
    {
      header: () => {
        if (!manual) return "Method";
        return filter.paymentMethodIDs &&
          filter.paymentMethodIDs.length !== paymentMethods.length ? (
          <FilterHeader>
            <span>Method</span>
            <FilterIcon
              onClick={(event) => {
                event.stopPropagation();
                dispatch(setDonationFilterPaymentMethodIDs(undefined));
              }}
            />
          </FilterHeader>
        ) : (
          "Method"
        );
      },
      accessorKey: "paymentMethod",
      size: 150,
    },
    {
      header: () => {
        if (!manual) return "Amount";
        return filter.sum.from > 0 || filter.sum.to !== Number.MAX_SAFE_INTEGER ? (
          <FilterHeader>
            <span>Amount</span>
            <FilterIcon
              onClick={(event) => {
                event.stopPropagation();
                dispatch(setDonationFilterSumRange(0, Number.MAX_SAFE_INTEGER));
              }}
            />
          </FilterHeader>
        ) : (
          "Amount"
        );
      },
      id: "sum",
      accessorFn: (donation) => donation.sum,
      cell: ({ getValue }) => (
        <span style={{ textAlign: "right", width: "100%" }}>
          {thousandize(getValue<number>())} kr
        </span>
      ),
      size: 140,
    },
    {
      header: () => {
        if (!manual) return "Tax";
        return filter.taxUnitTypes ? (
          <FilterHeader>
            <span>Tax</span>
            <FilterIcon
              onClick={(event) => {
                event.stopPropagation();
                dispatch(setDonationFilterTaxUnitTypes(undefined));
              }}
            />
          </FilterHeader>
        ) : (
          "Tax"
        );
      },
      accessorFn: (donation) => donation.taxUnitType ?? null,
      id: "taxUnitType",
      cell: ({ getValue }) => {
        const value = getValue<string | null>();
        return (
          <span style={{ textAlign: "center", width: "100%" }}>
            {value ? value === "organization" ? <Briefcase size={16} /> : <User size={16} /> : null}
          </span>
        );
      },
      size: 80,
    },
    {
      header: () => {
        if (!manual) return "Date";
        return filter.date.from || filter.date.to ? (
          <FilterHeader>
            <span>Date</span>
            <FilterIcon
              onClick={(event) => {
                event.stopPropagation();
                dispatch(setDonationFilterDateRange(null, null));
              }}
            />
          </FilterHeader>
        ) : (
          "Date"
        );
      },
      id: "timestamp",
      accessorFn: (donation) => donation.timestamp,
      cell: ({ getValue }) => {
        const value = getValue<Date | string>();
        return shortDate(
          value instanceof Date ? DateTime.fromJSDate(value) : DateTime.fromISO(String(value)),
        );
      },
      size: 100,
    },
  ];

  if (!hideDonorName) {
    columnDefinitions.splice(1, 0, {
      header: () => {
        if (!manual) return "Donor";
        return filter.donor ? (
          <FilterHeader>
            <span>Donor</span>
            <FilterIcon
              onClick={(event) => {
                event.stopPropagation();
                dispatch(setDonationFilterDonor(""));
              }}
            />
          </FilterHeader>
        ) : (
          "Donor"
        );
      },
      accessorKey: "donor",
    });
  }

  if (!hideKID) {
    columnDefinitions.splice(4, 0, {
      header: () => {
        if (!manual) return "KID";
        return filter.KID ? (
          <FilterHeader>
            <span>KID</span>
            <FilterIcon
              onClick={(event) => {
                event.stopPropagation();
                dispatch(setDonationFilterKid(""));
              }}
            />
          </FilterHeader>
        ) : (
          "KID"
        );
      },
      id: "kid",
      accessorFn: (donation) => donation.kid || donation.KID || "",
      cell: ({ getValue }) => (
        <span style={{ textAlign: "right", width: "100%" }}>{getValue<string>()}</span>
      ),
      size: 180,
    });
  }

  const defaultSorting: SortingState = manual
    ? sortingFromApiState(pagination.sort)
    : [{ id: "timestamp", desc: true }];

  const getRowProps = (row: Row<DonationTableRow>) => ({
    onDoubleClick: () => {
      navigate(`/donations/${row.original.id}`);
    },
  });

  if (manual) {
    return (
      <EffektTable
        data={donations}
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
            setDonationsPagination({
              ...pagination,
              page: nextPagination.pageIndex,
              limit: nextPagination.pageSize,
            }),
          )
        }
        onSortingChange={(nextSorting) =>
          dispatch(
            setDonationsPagination({
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
      data={donations}
      defaultPageSize={defaultPageSize}
      loading={loading}
      columns={columnDefinitions}
      initialSorting={defaultSorting}
      getRowProps={getRowProps}
    />
  );
};

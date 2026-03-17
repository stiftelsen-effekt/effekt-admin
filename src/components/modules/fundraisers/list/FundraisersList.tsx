import React, { useEffect } from "react";
import { ColumnDef, Row, SortingState } from "@tanstack/react-table";
import { useDispatch, useSelector } from "react-redux";
import { DateTime } from "luxon";
import {
  fetchFundraisersAction,
  setFundraisersPagination,
} from "../../../../store/fundraisers/fundraisers-list.actions";
import { AppState } from "../../../../models/state";
import { shortDate, thousandize } from "../../../../util/formatting";
import { useNavigate } from "react-router-dom";
import { IFundraiser } from "../../../../models/types";
import { useAuth0 } from "@auth0/auth0-react";
import { FilterHeader, FilterIcon } from "./FundraisersList.style";
import {
  setFundraiserFilterRegistrationDateRange,
  setFundraiserFilterDonor,
  setFundraiserFilterId,
  setFundraiserFilterDonationCountRange,
  setFundraiserFilterDonationSumRange,
} from "../../../../store/fundraisers/fundraiser-filters.actions";
import { API_URL } from "../../../../config/config";
import {
  EffektTable,
  paginationFromApiState,
  sortingFromApiState,
  sortingToApiState,
} from "../../../style/elements/react-table/EffektTable";

interface Props {
  fundraisers: Array<IFundraiser> | undefined;
  manual?: boolean;
  defaultPageSize?: number;
}

export const FundraisersList: React.FunctionComponent<Props> = ({
  fundraisers,
  manual,
  defaultPageSize,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { getAccessTokenSilently } = useAuth0();

  const pages = useSelector((state: AppState) => state.fundraisers.pages);
  const loading = useSelector((state: AppState) => state.fundraisers.loading);
  const pagination = useSelector((state: AppState) => state.fundraisers.pagination);
  const filter = useSelector((state: AppState) => state.fundraisers.filter);

  useEffect(() => {
    if (manual) {
      getAccessTokenSilently().then((token) => dispatch(fetchFundraisersAction.started({ token })));
    }
  }, [pagination, manual, dispatch, getAccessTokenSilently]);

  const columnDefinitions: ColumnDef<IFundraiser>[] = [
    {
      header: () => {
        if (!manual) return "ID";
        return filter.fundraiserId ? (
          <FilterHeader>
            <span>ID</span>
            <FilterIcon
              onClick={(event) => {
                event.stopPropagation();
                dispatch(setFundraiserFilterId(""));
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
        if (!manual) return "Donor";
        return filter.donor ? (
          <FilterHeader>
            <span>Donor</span>
            <FilterIcon
              onClick={(event) => {
                event.stopPropagation();
                dispatch(setFundraiserFilterDonor(""));
              }}
            />
          </FilterHeader>
        ) : (
          "Donor"
        );
      },
      accessorFn: (fundraiser) => fundraiser.donor.name,
      id: "donor",
    },
    {
      header: () => {
        if (!manual) return "Sum";
        return filter.donationSum.from > 0 || filter.donationSum.to !== Number.MAX_SAFE_INTEGER ? (
          <FilterHeader>
            <span>Sum</span>
            <FilterIcon
              onClick={(event) => {
                event.stopPropagation();
                dispatch(
                  setFundraiserFilterDonationSumRange({ from: 0, to: Number.MAX_SAFE_INTEGER }),
                );
              }}
            />
          </FilterHeader>
        ) : (
          "Sum"
        );
      },
      id: "totalSum",
      accessorFn: (fundraiser) => fundraiser.statistics.totalSum,
      cell: ({ getValue }) => (
        <span style={{ textAlign: "right", width: "100%" }}>
          {thousandize(getValue<number>())} kr
        </span>
      ),
      size: 140,
    },
    {
      header: () => {
        if (!manual) return "Donations";
        return filter.donationCount.from > 0 ||
          filter.donationCount.to !== Number.MAX_SAFE_INTEGER ? (
          <FilterHeader>
            <span>Donations</span>
            <FilterIcon
              onClick={(event) => {
                event.stopPropagation();
                dispatch(
                  setFundraiserFilterDonationCountRange({ from: 0, to: Number.MAX_SAFE_INTEGER }),
                );
              }}
            />
          </FilterHeader>
        ) : (
          "Donations"
        );
      },
      id: "donationCount",
      accessorFn: (fundraiser) => fundraiser.statistics.donationCount,
      cell: ({ getValue }) => (
        <span style={{ textAlign: "right", width: "100%" }}>{thousandize(getValue<number>())}</span>
      ),
      size: 140,
    },
    {
      header: "Average",
      id: "averageDonation",
      accessorFn: (fundraiser) => Math.round(fundraiser.statistics.averageDonation),
      cell: ({ getValue }) => (
        <span style={{ textAlign: "right", width: "100%" }}>
          {thousandize(getValue<number>())} kr
        </span>
      ),
      size: 140,
    },
    {
      header: () => {
        if (!manual) return "Registered";
        return filter.registrationDate.from || filter.registrationDate.to ? (
          <FilterHeader>
            <span>Registered</span>
            <FilterIcon
              onClick={(event) => {
                event.stopPropagation();
                dispatch(setFundraiserFilterRegistrationDateRange({ from: null, to: null }));
              }}
            />
          </FilterHeader>
        ) : (
          "Registered"
        );
      },
      id: "registered",
      accessorFn: (fundraiser) => fundraiser.registered,
      cell: ({ getValue }) => shortDate(DateTime.fromISO(getValue<string>())),
      size: 140,
    },
    {
      header: "Dashboard",
      id: "dashboard",
      accessorFn: (fundraiser) => fundraiser.secret,
      cell: ({ getValue }) => {
        const secret = getValue<string | null | undefined>();
        return secret ? (
          <a
            href={`${API_URL}/fundraisers/dashboard/${secret}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(event) => event.stopPropagation()}
            style={{ color: "black" }}
          >
            Dashboard ↗
          </a>
        ) : null;
      },
      size: 140,
    },
  ];

  const defaultSorting: SortingState = manual
    ? sortingFromApiState(pagination.sort)
    : [{ id: "registered", desc: true }];

  const getRowProps = (row: Row<IFundraiser>) => ({
    onDoubleClick: () => {
      navigate(`/fundraisers/${row.original.id}`);
    },
  });

  if (manual) {
    return (
      <EffektTable
        data={fundraisers}
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
            setFundraisersPagination({
              ...pagination,
              page: nextPagination.pageIndex,
              limit: nextPagination.pageSize,
            }),
          )
        }
        onSortingChange={(nextSorting) =>
          dispatch(
            setFundraisersPagination({
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
      data={fundraisers}
      defaultPageSize={defaultPageSize}
      loading={loading}
      columns={columnDefinitions}
      initialSorting={defaultSorting}
      getRowProps={getRowProps}
    />
  );
};

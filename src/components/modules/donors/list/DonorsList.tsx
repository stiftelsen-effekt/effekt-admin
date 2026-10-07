import React, { useEffect } from "react";
import { ColumnDef, Row, SortingState } from "@tanstack/react-table";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../../models/state";
import { shortDate, thousandize } from "../../../../util/formatting";
import { useNavigate } from "react-router-dom";
import { IDonor } from "../../../../models/types";
import { useAuth0 } from "@auth0/auth0-react";
import {
  fetchDonorsAction,
  setDonorsPagination,
} from "../../../../store/donors/donors-list.actions";
import {
  setDonorFilterDateRange,
  setDonorFilterDonationsCount,
  setDonorFilterDonationsSum,
  setDonorFilterEmail,
  setDonorFilterId,
  setDonorFilterLastDonationDate,
  setDonorFilterName,
  setDonorFilterNewsletter,
} from "../../../../store/donors/donor-filters.actions";
import { FilterHeader, FilterIcon } from "./DonorsList.style";
import {
  EffektTable,
  paginationFromApiState,
  sortingFromApiState,
  sortingToApiState,
} from "../../../style/elements/react-table/EffektTable";

interface Props {
  donors: Array<IDonor> | undefined;
  manual?: boolean;
  defaultPageSize?: number;
}

export const DonorsList: React.FunctionComponent<Props> = ({ donors, manual, defaultPageSize }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { getAccessTokenSilently } = useAuth0();

  const pages = useSelector((state: AppState) => state.donors.pages);
  const loading = useSelector((state: AppState) => state.donors.loading);
  const pagination = useSelector((state: AppState) => state.donors.pagination);
  const filter = useSelector((state: AppState) => state.donors.filter);
  const currentSort = pagination.sort ?? { id: "lastDonationDate", desc: true };

  useEffect(() => {
    if (manual) {
      getAccessTokenSilently().then((token) => dispatch(fetchDonorsAction.started({ token })));
    }
  }, [pagination, manual, dispatch, getAccessTokenSilently]);

  const columnDefinitions: ColumnDef<IDonor>[] = [
    {
      header: () => {
        if (!manual) return "ID";
        return filter.donorId !== null ? (
          <FilterHeader>
            <span>ID</span>
            <FilterIcon
              onClick={(event) => {
                event.stopPropagation();
                dispatch(setDonorFilterId(null));
              }}
            />
          </FilterHeader>
        ) : (
          "ID"
        );
      },
      accessorKey: "id",
      size: 60,
    },
    {
      header: () => {
        if (!manual) return "Name";
        return filter.name ? (
          <FilterHeader>
            <span>Name</span>
            <FilterIcon
              onClick={(event) => {
                event.stopPropagation();
                dispatch(setDonorFilterName(""));
              }}
            />
          </FilterHeader>
        ) : (
          "Name"
        );
      },
      accessorKey: "name",
      size: 250,
    },
    {
      header: () => {
        if (!manual) return "Email";
        return filter.email ? (
          <FilterHeader>
            <span>Email</span>
            <FilterIcon
              onClick={(event) => {
                event.stopPropagation();
                dispatch(setDonorFilterEmail(""));
              }}
            />
          </FilterHeader>
        ) : (
          "Email"
        );
      },
      accessorKey: "email",
      size: 300,
    },
    {
      id: "registered",
      header: () => {
        if (!manual) return "Registered";
        return filter.registeredDate.from || filter.registeredDate.to ? (
          <FilterHeader>
            <span>Registered</span>
            <FilterIcon
              onClick={(event) => {
                event.stopPropagation();
                dispatch(setDonorFilterDateRange({ from: null, to: null }));
              }}
            />
          </FilterHeader>
        ) : (
          "Registered"
        );
      },
      accessorFn: (donor) => donor.registered,
      cell: ({ getValue }) => shortDate(getValue<IDonor["registered"]>()),
      size: 140,
    },
    {
      id: "donationsSum",
      header: () => {
        if (!manual) return "Sum";
        return filter.donationsSum.from !== null || filter.donationsSum.to !== null ? (
          <FilterHeader>
            <span>Sum</span>
            <FilterIcon
              onClick={(event) => {
                event.stopPropagation();
                dispatch(setDonorFilterDonationsSum({ from: null, to: null }));
              }}
            />
          </FilterHeader>
        ) : (
          "Sum"
        );
      },
      accessorFn: (donor) => Math.round(donor.donationsSum ?? 0),
      cell: ({ getValue }) => (
        <span style={{ textAlign: "right", width: "100%" }}>
          {thousandize(getValue<number>())} kr
        </span>
      ),
      size: 120,
    },
    {
      id: "donationsCount",
      header: () => {
        if (!manual) return "Count";
        return filter.donationsCount.from !== null || filter.donationsCount.to !== null ? (
          <FilterHeader>
            <span>Count</span>
            <FilterIcon
              onClick={(event) => {
                event.stopPropagation();
                dispatch(setDonorFilterDonationsCount({ from: null, to: null }));
              }}
            />
          </FilterHeader>
        ) : (
          "Count"
        );
      },
      accessorFn: (donor) => donor.donationsCount ?? 0,
      cell: ({ getValue }) => (
        <span style={{ textAlign: "right", width: "100%" }}>{getValue<number>()}</span>
      ),
      size: 70,
    },
    {
      id: "lastDonationDate",
      header: () => {
        if (!manual) return "Last don.";
        return filter.lastDonationDate.from || filter.lastDonationDate.to ? (
          <FilterHeader>
            <span>Last don.</span>
            <FilterIcon
              onClick={(event) => {
                event.stopPropagation();
                dispatch(setDonorFilterLastDonationDate({ from: null, to: null }));
              }}
            />
          </FilterHeader>
        ) : (
          "Last don."
        );
      },
      accessorFn: (donor) => donor.lastDonation ?? null,
      cell: ({ getValue }) => {
        const value = getValue<IDonor["lastDonation"]>();
        return value ? shortDate(value) : "-";
      },
      size: 100,
    },
    {
      id: "newsletter",
      header: () => {
        if (!manual) return "Newsletter";
        return filter.newsletter !== undefined ? (
          <FilterHeader>
            <span>Newsletter</span>
            <FilterIcon
              onClick={(event) => {
                event.stopPropagation();
                dispatch(setDonorFilterNewsletter(undefined));
              }}
            />
          </FilterHeader>
        ) : (
          "Newsletter"
        );
      },
      accessorFn: (donor) => donor.newsletter,
      cell: ({ getValue }) => (getValue<boolean>() ? "Yes" : "No"),
      size: 100,
    },
  ];

  const defaultSorting: SortingState = manual
    ? sortingFromApiState(currentSort)
    : [{ id: "lastDonationDate", desc: true }];

  const getRowProps = (row: Row<IDonor>) => ({
    onDoubleClick: () => {
      navigate(`/donors/${row.original.id}`);
    },
  });

  if (manual) {
    return (
      <EffektTable
        data={donors}
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
            setDonorsPagination({
              page: nextPagination.pageIndex,
              limit: nextPagination.pageSize,
              sort: currentSort,
            }),
          )
        }
        onSortingChange={(nextSorting) =>
          dispatch(
            setDonorsPagination({
              page: pagination.page,
              limit: pagination.limit,
              sort: sortingToApiState(nextSorting, currentSort),
            }),
          )
        }
        getRowProps={getRowProps}
      />
    );
  }

  return (
    <EffektTable
      data={donors}
      defaultPageSize={defaultPageSize}
      loading={loading}
      columns={columnDefinitions}
      initialSorting={defaultSorting}
      getRowProps={getRowProps}
    />
  );
};

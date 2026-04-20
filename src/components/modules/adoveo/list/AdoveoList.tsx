import React, { useEffect } from "react";
import { ColumnDef, SortingState } from "@tanstack/react-table";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAdoveoAction,
  setAdoveoPagination,
} from "../../../../store/adoveo/adoveo-list.actions";
import { AppState } from "../../../../models/state";
import { shortDate, thousandize } from "../../../../util/formatting";
import { IAdoveo } from "../../../../models/types";
import { useAuth0 } from "@auth0/auth0-react";
import { FilterHeader, FilterIcon } from "./AdoveoList.style";
import { DateTime } from "luxon";
import {
  setAdoveoFilterName,
  setAdoveoFilterFundraiserId,
  setAdoveoFilterAdoveoId,
  setAdoveoFilterDonorName,
  setAdoveoFilterDonationCountRange,
  setAdoveoFilterDonationSumRange,
  setAdoveoFilterCreatedDateRange,
} from "../../../../store/adoveo/adoveo-filters.actions";
import {
  EffektTable,
  paginationFromApiState,
  sortingFromApiState,
  sortingToApiState,
} from "../../../style/elements/react-table/EffektTable";

export const AdoveoList: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const { getAccessTokenSilently } = useAuth0();

  const fundraisers = useSelector((state: AppState) => state.adoveo.fundraisers);
  const pages = useSelector((state: AppState) => state.adoveo.pages);
  const loading = useSelector((state: AppState) => state.adoveo.loading);
  const pagination = useSelector((state: AppState) => state.adoveo.pagination);
  const filter = useSelector((state: AppState) => state.adoveo.filter);

  useEffect(() => {
    getAccessTokenSilently().then((token) => dispatch(fetchAdoveoAction.started({ token })));
  }, [pagination, dispatch, getAccessTokenSilently]);

  const columnDefinitions: ColumnDef<IAdoveo>[] = [
    {
      header: () =>
        filter.fundraiserId ? (
          <FilterHeader>
            <span>ID</span>
            <FilterIcon
              onClick={(event) => {
                event.stopPropagation();
                dispatch(setAdoveoFilterFundraiserId(""));
              }}
            />
          </FilterHeader>
        ) : (
          "ID"
        ),
      accessorKey: "id",
      size: 80,
    },
    {
      header: () =>
        filter.name ? (
          <FilterHeader>
            <span>Name</span>
            <FilterIcon
              onClick={(event) => {
                event.stopPropagation();
                dispatch(setAdoveoFilterName(""));
              }}
            />
          </FilterHeader>
        ) : (
          "Name"
        ),
      accessorKey: "name",
      id: "name",
    },
    {
      header: () =>
        filter.adoveoId ? (
          <FilterHeader>
            <span>Adoveo ID</span>
            <FilterIcon
              onClick={(event) => {
                event.stopPropagation();
                dispatch(setAdoveoFilterAdoveoId(""));
              }}
            />
          </FilterHeader>
        ) : (
          "Adoveo ID"
        ),
      accessorKey: "adoveoId",
      id: "adoveoId",
      cell: ({ getValue }) => <span>{getValue<number | null>() ?? "-"}</span>,
      size: 100,
    },
    {
      header: () =>
        filter.donorName ? (
          <FilterHeader>
            <span>Donor</span>
            <FilterIcon
              onClick={(event) => {
                event.stopPropagation();
                dispatch(setAdoveoFilterDonorName(""));
              }}
            />
          </FilterHeader>
        ) : (
          "Donor"
        ),
      id: "donor",
      accessorFn: (fundraiser) => fundraiser.donor?.name ?? "-",
    },
    {
      header: () =>
        filter.donationSum.from > 0 || filter.donationSum.to !== Number.MAX_SAFE_INTEGER ? (
          <FilterHeader>
            <span>Sum</span>
            <FilterIcon
              onClick={(event) => {
                event.stopPropagation();
                dispatch(setAdoveoFilterDonationSumRange({ from: 0, to: Number.MAX_SAFE_INTEGER }));
              }}
            />
          </FilterHeader>
        ) : (
          "Sum"
        ),
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
      header: () =>
        filter.donationCount.from > 0 || filter.donationCount.to !== Number.MAX_SAFE_INTEGER ? (
          <FilterHeader>
            <span>Donations</span>
            <FilterIcon
              onClick={(event) => {
                event.stopPropagation();
                dispatch(
                  setAdoveoFilterDonationCountRange({ from: 0, to: Number.MAX_SAFE_INTEGER }),
                );
              }}
            />
          </FilterHeader>
        ) : (
          "Donations"
        ),
      id: "donationCount",
      accessorFn: (fundraiser) => fundraiser.statistics.donationCount,
      cell: ({ getValue }) => (
        <span style={{ textAlign: "right", width: "100%" }}>{thousandize(getValue<number>())}</span>
      ),
      size: 140,
    },
    {
      header: () =>
        filter.createdDate.from || filter.createdDate.to ? (
          <FilterHeader>
            <span>Created</span>
            <FilterIcon
              onClick={(event) => {
                event.stopPropagation();
                dispatch(setAdoveoFilterCreatedDateRange({ from: null, to: null }));
              }}
            />
          </FilterHeader>
        ) : (
          "Created"
        ),
      id: "created",
      accessorFn: (fundraiser) => fundraiser.created,
      cell: ({ getValue }) => shortDate(DateTime.fromISO(getValue<string>())),
      size: 140,
    },
  ];

  const defaultSorting: SortingState = sortingFromApiState(pagination.sort);

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
          setAdoveoPagination({
            ...pagination,
            page: nextPagination.pageIndex,
            limit: nextPagination.pageSize,
          }),
        )
      }
      onSortingChange={(nextSorting) =>
        dispatch(
          setAdoveoPagination({
            ...pagination,
            sort: sortingToApiState(nextSorting, pagination.sort),
          }),
        )
      }
    />
  );
};

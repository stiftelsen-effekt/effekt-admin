import React, { useEffect } from "react";
import ReactTable from "react-table";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAdoveoAction,
  setAdoveoPagination,
} from "../../../../store/adoveo/adoveo-list.actions";
import { AppState } from "../../../../models/state";
import { shortDate, thousandize } from "../../../../util/formatting";
import { DateTime } from "luxon";
import { IAdoveo } from "../../../../models/types";
import { useAuth0 } from "@auth0/auth0-react";
import { FilterHeader, FilterIcon } from "./AdoveoList.style";
import {
  setAdoveoFilterName,
  setAdoveoFilterFundraiserId,
  setAdoveoFilterAdoveoId,
  setAdoveoFilterDonorName,
  setAdoveoFilterDonationCountRange,
  setAdoveoFilterDonationSumRange,
  setAdoveoFilterCreatedDateRange,
} from "../../../../store/adoveo/adoveo-filters.actions";

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

  const columnDefinitions: any[] = [
    {
      Header: () =>
        filter.fundraiserId ? (
          <FilterHeader>
            <span>ID</span>
            <FilterIcon
              onClick={(e) => {
                e.stopPropagation();
                dispatch(setAdoveoFilterFundraiserId(""));
              }}
            ></FilterIcon>
          </FilterHeader>
        ) : (
          "ID"
        ),
      accessor: "id",
      width: 80,
    },
    {
      Header: () =>
        filter.name ? (
          <FilterHeader>
            <span>Name</span>
            <FilterIcon
              onClick={(e) => {
                e.stopPropagation();
                dispatch(setAdoveoFilterName(""));
              }}
            ></FilterIcon>
          </FilterHeader>
        ) : (
          "Name"
        ),
      accessor: "name",
      id: "name",
    },
    {
      Header: () =>
        filter.adoveoId ? (
          <FilterHeader>
            <span>Adoveo ID</span>
            <FilterIcon
              onClick={(e) => {
                e.stopPropagation();
                dispatch(setAdoveoFilterAdoveoId(""));
              }}
            ></FilterIcon>
          </FilterHeader>
        ) : (
          "Adoveo ID"
        ),
      accessor: "adoveoId",
      id: "adoveoId",
      Cell: (row: any) => <span>{row.value ?? "-"}</span>,
      width: 100,
    },
    {
      Header: () =>
        filter.donorName ? (
          <FilterHeader>
            <span>Donor</span>
            <FilterIcon
              onClick={(e) => {
                e.stopPropagation();
                dispatch(setAdoveoFilterDonorName(""));
              }}
            ></FilterIcon>
          </FilterHeader>
        ) : (
          "Donor"
        ),
      id: "donor",
      accessor: (res: IAdoveo) => res.donor?.name ?? "-",
    },
    {
      Header: () =>
        filter.donationSum.from > 0 || filter.donationSum.to !== Number.MAX_SAFE_INTEGER ? (
          <FilterHeader>
            <span>Sum</span>
            <FilterIcon
              onClick={(e) => {
                e.stopPropagation();
                dispatch(setAdoveoFilterDonationSumRange({ from: 0, to: Number.MAX_SAFE_INTEGER }));
              }}
            ></FilterIcon>
          </FilterHeader>
        ) : (
          "Sum"
        ),
      id: "totalSum",
      accessor: (res: IAdoveo) => thousandize(res.statistics.totalSum) + " kr",
      Cell: (row: any) => <span style={{ textAlign: "right", width: "100%" }}>{row.value}</span>,
      width: 140,
    },
    {
      Header: () =>
        filter.donationCount.from > 0 || filter.donationCount.to !== Number.MAX_SAFE_INTEGER ? (
          <FilterHeader>
            <span>Donations</span>
            <FilterIcon
              onClick={(e) => {
                e.stopPropagation();
                dispatch(
                  setAdoveoFilterDonationCountRange({ from: 0, to: Number.MAX_SAFE_INTEGER }),
                );
              }}
            ></FilterIcon>
          </FilterHeader>
        ) : (
          "Donations"
        ),
      id: "donationCount",
      accessor: (res: IAdoveo) => thousandize(res.statistics.donationCount),
      Cell: (row: any) => <span style={{ textAlign: "right", width: "100%" }}>{row.value}</span>,
      width: 140,
    },
    {
      Header: () =>
        filter.createdDate.from || filter.createdDate.to ? (
          <FilterHeader>
            <span>Created</span>
            <FilterIcon
              onClick={(e) => {
                e.stopPropagation();
                dispatch(setAdoveoFilterCreatedDateRange({ from: null, to: null }));
              }}
            ></FilterIcon>
          </FilterHeader>
        ) : (
          "Created"
        ),
      id: "created",
      accessor: (res: IAdoveo) => shortDate(DateTime.fromISO(res.created)),
      sortMethod: (a: any, b: any) => {
        return DateTime.fromFormat(a, "dd.MM.yyyy") < DateTime.fromFormat(b, "dd.MM.yyyy") ? -1 : 1;
      },
      width: 140,
    },
  ];

  const defaultSorting = [{ id: "created", desc: true }];

  return (
    <ReactTable
      manual
      data={fundraisers}
      page={pagination.page}
      pages={pages}
      pageSize={pagination.limit}
      loading={loading}
      columns={columnDefinitions}
      defaultSorted={defaultSorting}
      onPageChange={(page) => {
        dispatch(setAdoveoPagination({ ...pagination, page }));
      }}
      onSortedChange={(sorted) => {
        dispatch(setAdoveoPagination({ ...pagination, sort: sorted[0] }));
      }}
      onPageSizeChange={(pagesize) => {
        dispatch(setAdoveoPagination({ ...pagination, limit: pagesize }));
      }}
      style={{ width: "100%" }}
    />
  );
};

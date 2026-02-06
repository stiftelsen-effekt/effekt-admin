import React, { useEffect } from "react";
import ReactTable from "react-table";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFundraisersAction,
  setFundraisersPagination,
} from "../../../../store/fundraisers/fundraisers-list.actions";
import { AppState } from "../../../../models/state";
import { shortDate, thousandize } from "../../../../util/formatting";
import { DateTime } from "luxon";
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

  const columnDefinitions: any[] = [
    {
      Header: () => {
        if (manual) {
          return filter.fundraiserId ? (
            <FilterHeader>
              <span>ID</span>
              <FilterIcon
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(setFundraiserFilterId(""));
                }}
              ></FilterIcon>
            </FilterHeader>
          ) : (
            "ID"
          );
        } else {
          return "ID";
        }
      },
      accessor: "id",
      width: 80,
    },
    {
      Header: () => {
        if (manual) {
          return filter.donor ? (
            <FilterHeader>
              <span>Donor</span>
              <FilterIcon
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(setFundraiserFilterDonor(""));
                }}
              ></FilterIcon>
            </FilterHeader>
          ) : (
            "Donor"
          );
        } else {
          return "Donor";
        }
      },
      accessor: (res: IFundraiser) => res.donor.name,
      id: "donor",
    },
    {
      Header: () => {
        if (manual) {
          return filter.donationSum.from > 0 ||
            filter.donationSum.to !== Number.MAX_SAFE_INTEGER ? (
            <FilterHeader>
              <span>Sum</span>
              <FilterIcon
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(
                    setFundraiserFilterDonationSumRange({ from: 0, to: Number.MAX_SAFE_INTEGER }),
                  );
                }}
              ></FilterIcon>
            </FilterHeader>
          ) : (
            "Sum"
          );
        } else {
          return "Sum";
        }
      },
      id: "totalSum",
      accessor: (res: IFundraiser) => thousandize(res.statistics.totalSum) + " kr",
      Cell: (row) => <span style={{ textAlign: "right", width: "100%" }}>{row.value}</span>,
      width: 140,
    },
    {
      Header: () => {
        if (manual) {
          return filter.donationCount.from > 0 ||
            filter.donationCount.to !== Number.MAX_SAFE_INTEGER ? (
            <FilterHeader>
              <span>Donations</span>
              <FilterIcon
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(
                    setFundraiserFilterDonationCountRange({ from: 0, to: Number.MAX_SAFE_INTEGER }),
                  );
                }}
              ></FilterIcon>
            </FilterHeader>
          ) : (
            "Donations"
          );
        } else {
          return "Donations";
        }
      },
      id: "donationCount",
      accessor: (res: IFundraiser) => thousandize(res.statistics.donationCount),
      Cell: (row) => <span style={{ textAlign: "right", width: "100%" }}>{row.value}</span>,
      width: 140,
    },
    {
      Header: "Average",
      id: "averageDonation",
      accessor: (res: IFundraiser) =>
        thousandize(Math.round(res.statistics.averageDonation)) + " kr",
      Cell: (row) => <span style={{ textAlign: "right", width: "100%" }}>{row.value}</span>,
      width: 140,
    },
    {
      Header: () => {
        if (manual) {
          return filter.registrationDate.from || filter.registrationDate.to ? (
            <FilterHeader>
              <span>Registered</span>
              <FilterIcon
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(setFundraiserFilterRegistrationDateRange({ from: null, to: null }));
                }}
              ></FilterIcon>
            </FilterHeader>
          ) : (
            "Registered"
          );
        } else {
          return "Registered";
        }
      },
      id: "registered",
      accessor: (res: IFundraiser) => shortDate(DateTime.fromISO(res.registered)),
      sortMethod: (a: any, b: any) => {
        return DateTime.fromFormat(a, "dd.MM.yyyy") < DateTime.fromFormat(b, "dd.MM.yyyy") ? -1 : 1;
      },
      width: 140,
    },
    {
      Header: "Dashboard",
      id: "dashboard",
      accessor: (res: IFundraiser) => res.secret,
      Cell: (row) =>
        row.value ? (
          <a
            href={`${API_URL}/fundraisers/dashboard/${row.value}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            style={{ color: "black" }}
          >
            Dashboard ↗
          </a>
        ) : null,
      width: 140,
    },
  ];

  const defaultSorting = [{ id: "registered", desc: true }];

  const trProps = (tableState: any, rowInfo: any) => {
    if (rowInfo && rowInfo.row) {
      return {
        onDoubleClick: (e: any) => {
          navigate(`/fundraisers/${rowInfo.original.id}`);
        },
      };
    }
    return {};
  };

  if (manual) {
    return (
      <>
        <ReactTable
          manual
          data={fundraisers}
          page={pagination.page}
          pages={pages}
          pageSize={defaultPageSize ? defaultPageSize : pagination.limit}
          loading={loading}
          columns={columnDefinitions}
          defaultSorted={defaultSorting}
          onPageChange={(page) => {
            dispatch(setFundraisersPagination({ ...pagination, page }));
            getAccessTokenSilently().then((token) =>
              dispatch(fetchFundraisersAction.started({ token })),
            );
          }}
          onSortedChange={(sorted) => {
            dispatch(setFundraisersPagination({ ...pagination, sort: sorted[0] }));
            getAccessTokenSilently().then((token) =>
              dispatch(fetchFundraisersAction.started({ token })),
            );
          }}
          onPageSizeChange={(pagesize) => {
            dispatch(setFundraisersPagination({ ...pagination, limit: pagesize }));
            getAccessTokenSilently().then((token) =>
              dispatch(fetchFundraisersAction.started({ token })),
            );
          }}
          getTrProps={trProps}
          style={{
            width: "100%",
          }}
        />
      </>
    );
  } else {
    return (
      <ReactTable
        data={fundraisers}
        defaultPageSize={defaultPageSize}
        loading={loading}
        columns={columnDefinitions}
        defaultSorted={defaultSorting}
        getTrProps={trProps}
      />
    );
  }
};

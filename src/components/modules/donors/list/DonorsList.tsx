import React, { useEffect } from "react";
import ReactTable from "react-table";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../../models/state";
import { shortDate, thousandize } from "../../../../util/formatting";
import { DateTime } from "luxon";
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

  useEffect(() => {
    if (manual) {
      getAccessTokenSilently().then((token) => dispatch(fetchDonorsAction.started({ token })));
    }
  }, [pagination, manual, dispatch, getAccessTokenSilently]);

  const columnDefinitions: any[] = [
    {
      Header: () => {
        if (!manual) return "ID";
        return filter.donorId !== null ? (
          <FilterHeader>
            <span>ID</span>
            <FilterIcon
              onClick={(e) => {
                e.stopPropagation();
                dispatch(setDonorFilterId(null));
              }}
            ></FilterIcon>
          </FilterHeader>
        ) : (
          "ID"
        );
      },
      accessor: "id",
      width: 60,
    },
    {
      Header: () => {
        if (!manual) return "Name";
        return filter.name ? (
          <FilterHeader>
            <span>Name</span>
            <FilterIcon
              onClick={(e) => {
                e.stopPropagation();
                dispatch(setDonorFilterName(""));
              }}
            ></FilterIcon>
          </FilterHeader>
        ) : (
          "Name"
        );
      },
      accessor: "name",
      width: 250,
    },
    {
      Header: () => {
        if (!manual) return "Email";
        return filter.email ? (
          <FilterHeader>
            <span>Email</span>
            <FilterIcon
              onClick={(e) => {
                e.stopPropagation();
                dispatch(setDonorFilterEmail(""));
              }}
            ></FilterIcon>
          </FilterHeader>
        ) : (
          "Email"
        );
      },
      accessor: "email",
      width: 300,
    },
    {
      id: "registered",
      Header: () => {
        if (!manual) return "Registered";
        return filter.registeredDate.from || filter.registeredDate.to ? (
          <FilterHeader>
            <span>Registered</span>
            <FilterIcon
              onClick={(e) => {
                e.stopPropagation();
                dispatch(setDonorFilterDateRange({ from: null, to: null }));
              }}
            ></FilterIcon>
          </FilterHeader>
        ) : (
          "Registered"
        );
      },
      accessor: (donor: IDonor) => shortDate(donor.registered),
      sortMethod: (a: any, b: any) => {
        return DateTime.fromFormat(a, "dd.MM.yyyy") > DateTime.fromFormat(b, "dd.MM.yyyy") ? -1 : 1;
      },
      width: 140,
    },
    {
      id: "donationsSum",
      Header: () => {
        if (!manual) return "Sum";
        return filter.donationsSum.from !== null || filter.donationsSum.to !== null ? (
          <FilterHeader>
            <span>Sum</span>
            <FilterIcon
              onClick={(e) => {
                e.stopPropagation();
                dispatch(setDonorFilterDonationsSum({ from: null, to: null }));
              }}
            ></FilterIcon>
          </FilterHeader>
        ) : (
          "Sum"
        );
      },
      accessor: (donor: IDonor) => thousandize(Math.round(donor.donationsSum ?? 0)) + " kr",
      Cell: (row) => <span style={{ textAlign: "right", width: "100%" }}>{row.value}</span>,
      sortMethod: (a: string, b: string) => {
        return Number(a.replaceAll(" ", "")) - Number(b.replace(" ", ""));
      },
      width: 120,
    },
    {
      id: "donationsCount",
      Header: () => {
        if (!manual) return "Count";
        return filter.donationsCount.from !== null || filter.donationsCount.to !== null ? (
          <FilterHeader>
            <span>Count</span>
            <FilterIcon
              onClick={(e) => {
                e.stopPropagation();
                dispatch(setDonorFilterDonationsCount({ from: null, to: null }));
              }}
            ></FilterIcon>
          </FilterHeader>
        ) : (
          "Count"
        );
      },
      accessor: (donor: IDonor) => donor.donationsCount,
      Cell: (row) => <span style={{ textAlign: "right", width: "100%" }}>{row.value}</span>,
      sortMethod: (a: string, b: string) => {
        return Number(a.replaceAll(" ", "")) - Number(b.replace(" ", ""));
      },
      width: 70,
    },
    {
      id: "lastDonationDate",
      Header: () => {
        if (!manual) return "Last don.";
        return filter.lastDonationDate.from || filter.lastDonationDate.to ? (
          <FilterHeader>
            <span>Last don.</span>
            <FilterIcon
              onClick={(e) => {
                e.stopPropagation();
                dispatch(setDonorFilterLastDonationDate({ from: null, to: null }));
              }}
            ></FilterIcon>
          </FilterHeader>
        ) : (
          "Last don."
        );
      },
      accessor: (donor: IDonor) => (donor.lastDonation ? shortDate(donor.lastDonation) : "-"),
      width: 100,
    },
    {
      id: "newsletter",
      Header: () => {
        if (!manual) return "Newsletter";
        return filter.newsletter !== undefined ? (
          <FilterHeader>
            <span>Newsletter</span>
            <FilterIcon
              onClick={(e) => {
                e.stopPropagation();
                dispatch(setDonorFilterNewsletter(undefined));
              }}
            ></FilterIcon>
          </FilterHeader>
        ) : (
          "Newsletter"
        );
      },
      accessor: (donor: IDonor) => (donor.newsletter ? "Yes" : "No"),
      width: 100,
    },
  ];

  const defaultSorting = [{ id: "lastDonationDate", desc: true }];

  const trProps = (tableState: any, rowInfo: any) => {
    if (rowInfo && rowInfo.row) {
      return {
        onDoubleClick: (e: any) => {
          navigate(`/donors/${rowInfo.original.id}`);
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
          data={donors}
          page={pagination.page}
          pages={pages}
          pageSize={defaultPageSize ? defaultPageSize : pagination.limit}
          loading={loading}
          columns={columnDefinitions}
          defaultSorted={defaultSorting}
          onPageChange={(page) => dispatch(setDonorsPagination({ ...pagination, page }))}
          onSortedChange={(sorted) =>
            dispatch(setDonorsPagination({ ...pagination, sort: sorted[0] }))
          }
          onPageSizeChange={(pagesize) =>
            dispatch(setDonorsPagination({ ...pagination, limit: pagesize }))
          }
          getTrProps={trProps}
        />
      </>
    );
  } else {
    return (
      <ReactTable
        data={donors}
        defaultPageSize={defaultPageSize}
        loading={loading}
        columns={columnDefinitions}
        defaultSorted={defaultSorting}
        getTrProps={trProps}
      />
    );
  }
};

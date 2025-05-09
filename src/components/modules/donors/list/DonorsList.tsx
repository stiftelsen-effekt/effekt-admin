import React, { useEffect } from "react";
import ReactTable from "react-table";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../../models/state";
import { shortDate, thousandize } from "../../../../util/formatting";
import { DateTime } from "luxon";
import { useHistory } from "react-router";
import { IDonor } from "../../../../models/types";
import { useAuth0 } from "@auth0/auth0-react";
import {
  fetchDonorsAction,
  setDonorsPagination,
} from "../../../../store/donors/donors-list.actions";

interface Props {
  donors: Array<IDonor> | undefined;
  manual?: boolean;
  defaultPageSize?: number;
}

export const DonorsList: React.FunctionComponent<Props> = ({ donors, manual, defaultPageSize }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { getAccessTokenSilently } = useAuth0();

  const pages = useSelector((state: AppState) => state.donors.pages);
  const loading = useSelector((state: AppState) => state.donors.loading);
  const pagination = useSelector((state: AppState) => state.donors.pagination);

  useEffect(() => {
    if (manual) {
      getAccessTokenSilently().then((token) => dispatch(fetchDonorsAction.started({ token })));
    }
  }, [pagination, manual, dispatch, getAccessTokenSilently]);

  const columnDefinitions = [
    {
      Header: "ID",
      accessor: "id",
      width: 60,
    },
    {
      Header: "Name",
      accessor: "name",
      width: 250,
    },
    {
      Header: "Email",
      accessor: "email",
      width: 300,
    },
    {
      id: "registered",
      Header: "Registered",
      accessor: (donor: IDonor) => shortDate(donor.registered),
      sortMethod: (a: any, b: any) => {
        return DateTime.fromFormat(a, "dd.MM.yyyy") > DateTime.fromFormat(b, "dd.MM.yyyy") ? -1 : 1;
      },
      width: 100,
    },
    {
      id: "donationsSum",
      Header: "Sum",
      accessor: (donor: IDonor) => thousandize(Math.round(donor.donationsSum ?? 0)) + " kr",
      Cell: (row) => <span style={{ textAlign: "right", width: "100%" }}>{row.value}</span>,
      sortMethod: (a: string, b: string) => {
        return Number(a.replaceAll(" ", "")) - Number(b.replace(" ", ""));
      },
      width: 120,
    },
    {
      id: "donationsCount",
      Header: "Count",
      accessor: (donor: IDonor) => donor.donationsCount,
      Cell: (row) => <span style={{ textAlign: "right", width: "100%" }}>{row.value}</span>,
      sortMethod: (a: string, b: string) => {
        return Number(a.replaceAll(" ", "")) - Number(b.replace(" ", ""));
      },
      width: 70,
    },
    {
      id: "lastDonationDate",
      Header: "Last don.",
      accessor: (donor: IDonor) => (donor.lastDonation ? shortDate(donor.lastDonation) : "-"),
      width: 100,
    },
  ];

  const defaultSorting = [{ id: "lastDonationDate", desc: true }];

  const trProps = (tableState: any, rowInfo: any) => {
    if (rowInfo && rowInfo.row) {
      return {
        onDoubleClick: (e: any) => {
          history.push(`/donors/${rowInfo.original.id}`);
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

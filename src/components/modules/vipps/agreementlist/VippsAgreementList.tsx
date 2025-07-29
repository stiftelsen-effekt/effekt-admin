import React, { useEffect } from "react";
import ReactTable from "react-table";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../../models/state";
import { shortDate, thousandize } from "../../../../util/formatting";
import { DateTime } from "luxon";
import { useHistory } from "react-router";
import {
  fetchVippsAgreementsAction,
  setVippsAgreementsPagination,
} from "../../../../store/vipps/vipps.actions";
import { IVippsAgreement } from "../../../../models/types";
import { useAuth0 } from "@auth0/auth0-react";

export const VippsAgreementList: React.FunctionComponent<{
  agreements: Array<IVippsAgreement> | undefined;
  manual?: boolean;
  defaultPageSize?: number;
}> = ({ agreements, manual, defaultPageSize }) => {
  const pages = useSelector((state: AppState) => state.vippsAgreements.pages);
  const loading = useSelector((state: AppState) => state.vippsAgreements.loading);
  const pagination = useSelector((state: AppState) => state.vippsAgreements.pagination);

  const dispatch = useDispatch();
  const { getAccessTokenSilently } = useAuth0();
  const history = useHistory();

  useEffect(() => {
    getAccessTokenSilently().then((token) =>
      dispatch(fetchVippsAgreementsAction.started({ token })),
    );
  }, [pagination, dispatch, getAccessTokenSilently]);

  const columnDefinitions = [
    {
      Header: "Agreement ID",
      accessor: "ID",
      id: "id",
      width: 140,
    },
    {
      Header: "Donor",
      accessor: "full_name",
    },
    {
      Header: "Status",
      accessor: "status",
      width: 110,
    },
    {
      Header: "Sum",
      id: "amount",
      width: 110,
      accessor: (res: any) => thousandize(res.amount),
    },
    {
      Header: "Charge day",
      accessor: "monthly_charge_day",
      id: "chargeDay",
      width: 80,
    },
    {
      Header: "KID",
      accessor: "KID",
      id: "kid",
      width: 120,
    },
    {
      Header: "Draft date",
      id: "created",
      accessor: (res: any) => shortDate(DateTime.fromISO(res.timestamp_created)),
      width: 120,
    },
  ];

  const defaultSorting = [{ id: "created", desc: true }];

  const trProps = (tableState: any, rowInfo: any) => {
    if (rowInfo && rowInfo.row) {
      return {
        onDoubleClick: (e: any) => {
          history.push(`/vipps/agreement/${rowInfo.original.ID}`);
        },
      };
    }
    return {};
  };

  if (manual) {
    return (
      <ReactTable
        manual
        data={agreements}
        page={pagination.page}
        pages={pages}
        pageSize={pagination.limit}
        loading={loading}
        columns={columnDefinitions}
        defaultSorted={defaultSorting}
        onPageChange={(page) => dispatch(setVippsAgreementsPagination({ ...pagination, page }))}
        onSortedChange={(sorted) =>
          dispatch(setVippsAgreementsPagination({ ...pagination, sort: sorted[0] }))
        }
        onPageSizeChange={(pagesize) =>
          dispatch(setVippsAgreementsPagination({ ...pagination, limit: pagesize }))
        }
        getTrProps={trProps}
      />
    );
  } else {
    return (
      <ReactTable
        data={agreements}
        defaultPageSize={defaultPageSize}
        columns={columnDefinitions}
        defaultSorted={defaultSorting}
        getTrProps={trProps}
      />
    );
  }
};

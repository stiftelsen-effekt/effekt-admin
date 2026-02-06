import React, { useEffect } from "react";
import ReactTable from "react-table";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../../models/state";
import { useNavigate } from "react-router-dom";
import { IAutoGiroMandate } from "../../../../models/types";
import { useAuth0 } from "@auth0/auth0-react";
import {
  fetchAutoGiroMandatesAction,
  setAutoGiroMandatePagination,
} from "../../../../store/autogiro/autogiromedgivande.actions";

export const AutoGiroMandateList: React.FunctionComponent<{
  mandates: Array<IAutoGiroMandate> | undefined;
  manual?: boolean;
  defaultPageSize?: number;
}> = ({ mandates, manual, defaultPageSize }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { getAccessTokenSilently } = useAuth0();

  const loading = useSelector((state: AppState) => state.autoGiroMandates.loading);
  const pages = useSelector((state: AppState) => state.autoGiroMandates.pages);
  const pagination = useSelector((state: AppState) => state.autoGiroMandates.pagination);

  useEffect(() => {
    if (manual) {
      getAccessTokenSilently().then((token) =>
        dispatch(fetchAutoGiroMandatesAction.started({ token })),
      );
    }
  }, [pagination, manual, dispatch, getAccessTokenSilently]);

  const columnDefinitions = [
    {
      Header: "Mandate ID",
      accessor: "ID",
      id: "ID",
      width: 120,
    },
    {
      Header: "Donor",
      accessor: "full_name",
    },
    {
      Header: "Status",
      accessor: "status",
      id: "status",
      width: 90,
    },
    {
      Header: "KID",
      accessor: "KID",
      id: "kid",
      width: 160,
    },
  ];

  const defaultSorting = [{ id: "created", desc: true }];

  const trProps = (tableState: any, rowInfo: any) => {
    if (rowInfo && rowInfo.row) {
      return {
        onDoubleClick: (e: any) => {
          navigate(`/autogiro/mandates/${rowInfo.original.ID}`);
        },
      };
    }
    return {};
  };

  if (manual) {
    return (
      <ReactTable
        manual
        data={mandates}
        page={pagination.page}
        pages={pages}
        pageSize={pagination.limit}
        loading={loading}
        columns={columnDefinitions}
        defaultSorted={defaultSorting}
        onPageChange={(page) => dispatch(setAutoGiroMandatePagination({ ...pagination, page }))}
        onSortedChange={(sorted) =>
          dispatch(setAutoGiroMandatePagination({ ...pagination, sort: sorted[0] }))
        }
        onPageSizeChange={(pagesize) =>
          dispatch(setAutoGiroMandatePagination({ ...pagination, limit: pagesize }))
        }
        getTrProps={trProps}
      />
    );
  } else {
    return (
      <ReactTable
        data={mandates}
        loading={loading}
        columns={columnDefinitions}
        defaultPageSize={defaultPageSize}
        defaultSorted={defaultSorting}
        getTrProps={trProps}
      />
    );
  }
};

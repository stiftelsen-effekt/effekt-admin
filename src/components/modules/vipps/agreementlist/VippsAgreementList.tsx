import React, { useEffect } from "react";
import ReactTable from "react-table";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../../models/state";
import { shortDate, thousandize } from "../../../../util/formatting";
import { DateTime } from "luxon";
import { useNavigate } from "react-router-dom";
import {
  fetchVippsAgreementsAction,
  setVippsAgreementsPagination,
  setVippsAgreementsFilterAgreementID,
  setVippsAgreementsFilterDonor,
  setVippsAgreementsFilterKID,
  setVippsAgreementsFilterStatus,
  setVippsAgreementsFilterAmount,
  setVippsAgreementsFilterChargeDay,
  setVippsAgreementsFilterDraftDate,
} from "../../../../store/vipps/vipps.actions";
import { IVippsAgreement } from "../../../../models/types";
import { useAuth0 } from "@auth0/auth0-react";
import { FilterHeader, FilterIcon } from "./VippsAgreementList.style";

export const VippsAgreementList: React.FunctionComponent<{
  agreements: Array<IVippsAgreement> | undefined;
  manual?: boolean;
  defaultPageSize?: number;
}> = ({ agreements, manual, defaultPageSize }) => {
  const pages = useSelector((state: AppState) => state.vippsAgreements.pages);
  const loading = useSelector((state: AppState) => state.vippsAgreements.loading);
  const pagination = useSelector((state: AppState) => state.vippsAgreements.pagination);
  const filter = useSelector((state: AppState) => state.vippsAgreements.filter);

  const dispatch = useDispatch();
  const { getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (manual) {
      getAccessTokenSilently().then((token) =>
        dispatch(fetchVippsAgreementsAction.started({ token })),
      );
    }
  }, [pagination, manual, dispatch, getAccessTokenSilently]);

  const columnDefinitions = [
    {
      Header: () => {
        if (manual) {
          return filter.agreementID && filter.agreementID.length > 0 ? (
            <FilterHeader>
              <span>Agreement ID</span>
              <FilterIcon
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(setVippsAgreementsFilterAgreementID(""));
                }}
              ></FilterIcon>
            </FilterHeader>
          ) : (
            "Agreement ID"
          );
        } else {
          return "Agreement ID";
        }
      },
      accessor: "ID",
      id: "id",
      width: 140,
    },
    {
      Header: () => {
        if (manual) {
          return filter.donor && filter.donor.length > 0 ? (
            <FilterHeader>
              <span>Donor</span>
              <FilterIcon
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(setVippsAgreementsFilterDonor(""));
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
      accessor: "full_name",
    },
    {
      Header: () => {
        if (manual) {
          return filter.statuses && filter.statuses.length > 0 ? (
            <FilterHeader>
              <span>Status</span>
              <FilterIcon
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(setVippsAgreementsFilterStatus(undefined));
                }}
              ></FilterIcon>
            </FilterHeader>
          ) : (
            "Status"
          );
        } else {
          return "Status";
        }
      },
      accessor: "status",
      width: 110,
    },
    {
      Header: () => {
        if (manual) {
          return filter.amount.from > 0 || filter.amount.to !== Number.MAX_SAFE_INTEGER ? (
            <FilterHeader>
              <span>Sum</span>
              <FilterIcon
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(
                    setVippsAgreementsFilterAmount({ from: 0, to: Number.MAX_SAFE_INTEGER }),
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
      id: "amount",
      width: 110,
      accessor: (res: any) => thousandize(res.amount),
    },
    {
      Header: () => {
        if (manual) {
          return filter.chargeDay && (filter.chargeDay.from > 0 || filter.chargeDay.to < 28) ? (
            <FilterHeader>
              <span>Charge day</span>
              <FilterIcon
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(setVippsAgreementsFilterChargeDay({ from: 0, to: 28 }));
                }}
              ></FilterIcon>
            </FilterHeader>
          ) : (
            "Charge day"
          );
        } else {
          return "Charge day";
        }
      },
      accessor: "monthly_charge_day",
      id: "chargeDay",
      width: 80,
    },
    {
      Header: () => {
        if (manual) {
          return filter.KID && filter.KID.length > 0 ? (
            <FilterHeader>
              <span>KID</span>
              <FilterIcon
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(setVippsAgreementsFilterKID(""));
                }}
              ></FilterIcon>
            </FilterHeader>
          ) : (
            "KID"
          );
        } else {
          return "KID";
        }
      },
      accessor: "KID",
      id: "kid",
      width: 120,
    },
    {
      Header: () => {
        if (manual) {
          return filter.created && (filter.created.from || filter.created.to) ? (
            <FilterHeader>
              <span>Draft date</span>
              <FilterIcon
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(setVippsAgreementsFilterDraftDate(null, null));
                }}
              ></FilterIcon>
            </FilterHeader>
          ) : (
            "Draft date"
          );
        } else {
          return "Draft date";
        }
      },
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
          navigate(`/vipps/agreement/${rowInfo.original.ID}`);
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

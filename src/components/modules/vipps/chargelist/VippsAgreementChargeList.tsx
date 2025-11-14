import React, { useEffect } from "react";
import ReactTable from "react-table";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../../models/state";
import { shortDate } from "../../../../util/formatting";
import { DateTime } from "luxon";
import {
  fetchVippsAgreementChargesAction,
  refundVippsAgreementChargeAction,
  setVippsChargesPagination,
  setVippsChargesFilterAgreementID,
  setVippsChargesFilterChargeID,
  setVippsChargesFilterDonor,
  setVippsChargesFilterKID,
  setVippsChargesFilterStatus,
  setVippsChargesFilterAmount,
  setVippsChargesFilterDueDate,
} from "../../../../store/vipps/vipps.actions";
import { ChargeListWrapper, FilterHeader, FilterIcon } from "./VippsAgreementChargeList.style";
import { VippsChargeFilter } from "./VippsAgreementChargeFilter";
import { useAuth0 } from "@auth0/auth0-react";
import { EffektButton } from "../../../style/elements/button.style";
import { useHistory } from "react-router";
import { ArrowLeft } from "react-feather";

export const VippsAgreementChargeList: React.FunctionComponent = () => {
  const data = useSelector((state: AppState) => state.vippsAgreementCharges.charges);
  const pages = useSelector((state: AppState) => state.vippsAgreementCharges.pages);
  const loading = useSelector((state: AppState) => state.vippsAgreementCharges.loading);
  const pagination = useSelector((state: AppState) => state.vippsAgreementCharges.pagination);
  const filter = useSelector((state: AppState) => state.vippsAgreementCharges.filter);

  const history = useHistory();
  const dispatch = useDispatch();
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    getAccessTokenSilently().then((token) =>
      dispatch(fetchVippsAgreementChargesAction.started({ token })),
    );
  }, [pagination, filter, dispatch, getAccessTokenSilently]);

  const columnDefinitions = [
    {
      Header: () => {
        return filter.dueDate && (filter.dueDate.from || filter.dueDate.to) ? (
          <FilterHeader>
            <span>Due date</span>
            <FilterIcon
              onClick={(e) => {
                e.stopPropagation();
                dispatch(setVippsChargesFilterDueDate(null, null));
              }}
            ></FilterIcon>
          </FilterHeader>
        ) : (
          "Due date"
        );
      },
      id: "dueDate",
      accessor: (res: any) => shortDate(DateTime.fromISO(res.dueDate)),
      width: 93,
    },
    {
      Header: () => {
        return filter.agreementID && filter.agreementID.length > 0 ? (
          <FilterHeader>
            <span>Agreement ID</span>
            <FilterIcon
              onClick={(e) => {
                e.stopPropagation();
                dispatch(setVippsChargesFilterAgreementID(""));
              }}
            ></FilterIcon>
          </FilterHeader>
        ) : (
          "Agreement ID"
        );
      },
      accessor: "agreementID",
      width: 129,
    },
    {
      Header: () => {
        return filter.chargeID && filter.chargeID.length > 0 ? (
          <FilterHeader>
            <span>Charge ID</span>
            <FilterIcon
              onClick={(e) => {
                e.stopPropagation();
                dispatch(setVippsChargesFilterChargeID(""));
              }}
            ></FilterIcon>
          </FilterHeader>
        ) : (
          "Charge ID"
        );
      },
      accessor: "chargeID",
      width: 130,
    },
    {
      Header: () => {
        return filter.donor && filter.donor.length > 0 ? (
          <FilterHeader>
            <span>Donor</span>
            <FilterIcon
              onClick={(e) => {
                e.stopPropagation();
                dispatch(setVippsChargesFilterDonor(""));
              }}
            ></FilterIcon>
          </FilterHeader>
        ) : (
          "Donor"
        );
      },
      accessor: "full_name",
    },
    {
      Header: () => {
        return filter.statuses && filter.statuses.length > 0 ? (
          <FilterHeader>
            <span>Status</span>
            <FilterIcon
              onClick={(e) => {
                e.stopPropagation();
                dispatch(setVippsChargesFilterStatus(undefined));
              }}
            ></FilterIcon>
          </FilterHeader>
        ) : (
          "Status"
        );
      },
      accessor: "status",
      width: 114,
    },
    {
      Header: () => {
        return filter.amountNOK.from > 0 || filter.amountNOK.to !== Number.MAX_SAFE_INTEGER ? (
          <FilterHeader>
            <span>Sum</span>
            <FilterIcon
              onClick={(e) => {
                e.stopPropagation();
                dispatch(setVippsChargesFilterAmount({ from: 0, to: Number.MAX_SAFE_INTEGER }));
              }}
            ></FilterIcon>
          </FilterHeader>
        ) : (
          "Sum"
        );
      },
      accessor: "amountNOK",
      width: 83,
    },
    {
      Header: () => {
        return filter.KID && filter.KID.length > 0 ? (
          <FilterHeader>
            <span>KID</span>
            <FilterIcon
              onClick={(e) => {
                e.stopPropagation();
                dispatch(setVippsChargesFilterKID(""));
              }}
            ></FilterIcon>
          </FilterHeader>
        ) : (
          "KID"
        );
      },
      accessor: "KID",
      id: "kid",
      width: 150,
    },
    {
      Header: "Created",
      id: "created",
      accessor: (res: any) => shortDate(DateTime.fromISO(res.timestamp_created)),
      width: 98,
    },
    {
      Header: "Refund",
      id: "refund",
      accessor: (res: any) => (
        <RefundButton
          agreementId={res.agreementID}
          chargeId={res.chargeID}
          amount={res.amountNOK}
          disabled={res.status !== "CHARGED"}
        />
      ),
      width: 75,
    },
  ];

  const defaultSorting = [{ id: "dueDate", desc: true }];

  return (
    <ChargeListWrapper>
      <EffektButton onClick={() => history.push("/vipps/agreements")}>
        <ArrowLeft size={18} style={{ marginRight: "5px" }} /> Back to agreements
      </EffektButton>
      <br />
      <br />
      <ReactTable
        manual
        data={data}
        page={pagination.page}
        pages={pages}
        pageSize={pagination.limit}
        loading={loading}
        columns={columnDefinitions}
        defaultSorted={defaultSorting}
        onPageChange={(page) => dispatch(setVippsChargesPagination({ ...pagination, page }))}
        onSortedChange={(sorted) =>
          dispatch(setVippsChargesPagination({ ...pagination, sort: sorted[0] }))
        }
        onPageSizeChange={(pagesize) =>
          dispatch(setVippsChargesPagination({ ...pagination, limit: pagesize }))
        }
      />
      <VippsChargeFilter />
    </ChargeListWrapper>
  );
};

const RefundButton: React.FC<{
  agreementId: string;
  chargeId: string;
  amount: number;
  disabled: boolean;
}> = ({ agreementId, chargeId, amount, disabled }) => {
  const dispatch = useDispatch();
  const { getAccessTokenSilently } = useAuth0();

  return (
    <button
      disabled={disabled}
      onClick={() => {
        let sure = window.confirm(
          `Do you really want to refund the charge with ID ${chargeId} and sum ${amount} kr?`,
        );
        if (sure) {
          getAccessTokenSilently().then((token) => {
            dispatch(refundVippsAgreementChargeAction.started({ agreementId, chargeId, token }));
            window.location.reload();
          });
        }
      }}
    >
      Refund
    </button>
  );
};

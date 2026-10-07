import React, { useEffect } from "react";
import { ColumnDef, SortingState } from "@tanstack/react-table";
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
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "react-feather";
import { IVippsAgreementCharge } from "../../../../models/types";
import {
  EffektTable,
  paginationFromApiState,
  sortingFromApiState,
  sortingToApiState,
} from "../../../style/elements/react-table/EffektTable";

type VippsChargeRow = IVippsAgreementCharge & {
  full_name?: string;
  timestamp_created?: string;
};

export const VippsAgreementChargeList: React.FunctionComponent = () => {
  const data = useSelector((state: AppState) => state.vippsAgreementCharges.charges);
  const pages = useSelector((state: AppState) => state.vippsAgreementCharges.pages);
  const loading = useSelector((state: AppState) => state.vippsAgreementCharges.loading);
  const pagination = useSelector((state: AppState) => state.vippsAgreementCharges.pagination);
  const filter = useSelector((state: AppState) => state.vippsAgreementCharges.filter);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    getAccessTokenSilently().then((token) =>
      dispatch(fetchVippsAgreementChargesAction.started({ token })),
    );
  }, [pagination, dispatch, getAccessTokenSilently]);

  const columnDefinitions: ColumnDef<VippsChargeRow>[] = [
    {
      header: () =>
        filter.dueDate && (filter.dueDate.from || filter.dueDate.to) ? (
          <FilterHeader>
            <span>Due date</span>
            <FilterIcon
              onClick={(event) => {
                event.stopPropagation();
                dispatch(setVippsChargesFilterDueDate(null, null));
              }}
            />
          </FilterHeader>
        ) : (
          "Due date"
        ),
      id: "dueDate",
      accessorFn: (charge) => charge.dueDate,
      cell: ({ getValue }) => shortDate(DateTime.fromISO(getValue<string>())),
      size: 93,
    },
    {
      header: () =>
        filter.agreementID && filter.agreementID.length > 0 ? (
          <FilterHeader>
            <span>Agreement ID</span>
            <FilterIcon
              onClick={(event) => {
                event.stopPropagation();
                dispatch(setVippsChargesFilterAgreementID(""));
              }}
            />
          </FilterHeader>
        ) : (
          "Agreement ID"
        ),
      accessorKey: "agreementID",
      size: 129,
    },
    {
      header: () =>
        filter.chargeID && filter.chargeID.length > 0 ? (
          <FilterHeader>
            <span>Charge ID</span>
            <FilterIcon
              onClick={(event) => {
                event.stopPropagation();
                dispatch(setVippsChargesFilterChargeID(""));
              }}
            />
          </FilterHeader>
        ) : (
          "Charge ID"
        ),
      accessorKey: "chargeID",
      size: 130,
    },
    {
      header: () =>
        filter.donor && filter.donor.length > 0 ? (
          <FilterHeader>
            <span>Donor</span>
            <FilterIcon
              onClick={(event) => {
                event.stopPropagation();
                dispatch(setVippsChargesFilterDonor(""));
              }}
            />
          </FilterHeader>
        ) : (
          "Donor"
        ),
      accessorFn: (charge) => charge.full_name ?? "",
      id: "full_name",
    },
    {
      header: () =>
        filter.statuses && filter.statuses.length > 0 ? (
          <FilterHeader>
            <span>Status</span>
            <FilterIcon
              onClick={(event) => {
                event.stopPropagation();
                dispatch(setVippsChargesFilterStatus(undefined));
              }}
            />
          </FilterHeader>
        ) : (
          "Status"
        ),
      accessorKey: "status",
      size: 114,
    },
    {
      header: () =>
        filter.amountNOK.from > 0 || filter.amountNOK.to !== Number.MAX_SAFE_INTEGER ? (
          <FilterHeader>
            <span>Sum</span>
            <FilterIcon
              onClick={(event) => {
                event.stopPropagation();
                dispatch(setVippsChargesFilterAmount({ from: 0, to: Number.MAX_SAFE_INTEGER }));
              }}
            />
          </FilterHeader>
        ) : (
          "Sum"
        ),
      accessorKey: "amountNOK",
      size: 83,
    },
    {
      header: () =>
        filter.KID && filter.KID.length > 0 ? (
          <FilterHeader>
            <span>KID</span>
            <FilterIcon
              onClick={(event) => {
                event.stopPropagation();
                dispatch(setVippsChargesFilterKID(""));
              }}
            />
          </FilterHeader>
        ) : (
          "KID"
        ),
      accessorKey: "KID",
      id: "kid",
      size: 150,
    },
    {
      header: "Created",
      id: "created",
      accessorFn: (charge) => charge.timestamp_created ?? charge.timestamp,
      cell: ({ getValue }) => shortDate(DateTime.fromISO(getValue<string>())),
      size: 98,
    },
    {
      header: "Refund",
      id: "refund",
      accessorFn: (charge) => charge,
      enableSorting: false,
      cell: ({ row }) => (
        <RefundButton
          agreementId={row.original.agreementID}
          chargeId={row.original.chargeID}
          amount={row.original.amountNOK}
          disabled={row.original.status !== "CHARGED"}
        />
      ),
      size: 75,
    },
  ];

  const defaultSorting: SortingState = sortingFromApiState(pagination.sort);

  return (
    <ChargeListWrapper>
      <EffektButton onClick={() => navigate("/vipps/agreements")}>
        <ArrowLeft size={18} style={{ marginRight: "5px" }} /> Back to agreements
      </EffektButton>
      <br />
      <br />
      <EffektTable
        data={data}
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
            setVippsChargesPagination({
              ...pagination,
              page: nextPagination.pageIndex,
              limit: nextPagination.pageSize,
            }),
          )
        }
        onSortingChange={(nextSorting) =>
          dispatch(
            setVippsChargesPagination({
              ...pagination,
              sort: sortingToApiState(nextSorting, pagination.sort),
            }),
          )
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
        const sure = window.confirm(
          `Do you really want to refund the charge with ID ${chargeId} and sum ${amount} kr?`,
        );
        if (sure) {
          getAccessTokenSilently().then((token) => {
            dispatch(refundVippsAgreementChargeAction.started({ agreementId, chargeId, token }));
            window.location.reload();
          });
        }
      }}
      type="button"
    >
      Refund
    </button>
  );
};

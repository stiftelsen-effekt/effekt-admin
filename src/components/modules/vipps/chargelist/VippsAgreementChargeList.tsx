import React, { useEffect } from 'react';
import ReactTable from 'react-table';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../../models/state';
import { shortDate } from '../../../../util/formatting';
import { DateTime } from 'luxon';
import {
  fetchVippsAgreementChargesAction,
  refundVippsAgreementChargeAction,
  setVippsChargesPagination,
} from '../../../../store/vipps/vipps.actions';
import { ChargeListWrapper } from './VippsAgreementChargeList.style';
import { VippsChargeFilter } from './VippsAgreementChargeFilter';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

export const VippsAgreementChargeList: React.FunctionComponent = () => {
  const data = useSelector((state: AppState) => state.vippsAgreementCharges.charges);
  const pages = useSelector((state: AppState) => state.vippsAgreementCharges.pages);
  const loading = useSelector((state: AppState) => state.vippsAgreementCharges.loading);
  const pagination = useSelector((state: AppState) => state.vippsAgreementCharges.pagination);
  const filter = useSelector((state: AppState) => state.vippsAgreementCharges.filter);

  const dispatch = useDispatch();
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    getAccessTokenSilently().then((token) =>
      dispatch(fetchVippsAgreementChargesAction.started({ token }))
    );
  }, [pagination, filter, dispatch, getAccessTokenSilently]);

  const columnDefinitions = [
    {
      Header: 'Due date',
      id: 'dueDate',
      accessor: (res: any) => shortDate(DateTime.fromISO(res.dueDate)),
      width: 93,
    },
    {
      Header: 'Agreement ID',
      accessor: 'agreementID',
      width: 129,
    },
    {
      Header: 'Charge ID',
      accessor: 'chargeID',
      width: 130,
    },
    {
      Header: 'Donor',
      accessor: 'full_name',
    },
    {
      Header: 'Status',
      accessor: 'status',
      width: 114,
    },
    {
      Header: 'Sum',
      accessor: 'amountNOK',
      width: 83,
    },
    {
      Header: 'KID',
      accessor: 'KID',
      id: 'kid',
      width: 150,
    },
    {
      Header: 'Created',
      id: 'created',
      accessor: (res: any) => shortDate(DateTime.fromISO(res.timestamp_created)),
      width: 98,
    },
    {
      Header: 'Refund',
      id: 'refund',
      accessor: (res: any) => (
        <RefundButton
          agreementId={res.agreementID}
          chargeId={res.chargeID}
          amount={res.amountNOK}
          disabled={res.status !== 'CHARGED'}
        />
      ),
      width: 75,
    },
  ];

  const defaultSorting = [{ id: 'timestamp', desc: true }];

  return (
    <ChargeListWrapper>
      <Link to="/vipps/agreements">See all agreements</Link>
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
          `Do you really want to refund the charge with ID ${chargeId} and sum ${amount} kr?`
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

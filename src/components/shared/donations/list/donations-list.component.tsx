import React, { useEffect, useState } from 'react';
import ReactTable from 'react-table';
import { useDispatch, useSelector } from 'react-redux';
import { DateTime } from 'luxon';
import { Redirect } from 'react-router';
import {
  fetchDonationsAction,
  setDonationsPagination,
} from '../../../../store/donations/list/donations-list.actions';
import { AppState } from '../../../../store/state';
import { shortDate } from '../../../../util/formatting';
import { DonationsFilterComponent } from './filters/filters.component';
import { DonationListWrapper } from './donations-list.component.style';
import { DeleteButton } from './delete-button/delete-button';
import { IDonation } from '../../../../types';

export const DonationsList: React.FunctionComponent = () => {
  const data = useSelector((state: AppState) => state.donations.donations);
  const pages = useSelector((state: AppState) => state.donations.pages);
  const loading = useSelector((state: AppState) => state.donations.loading);
  const pagination = useSelector(
    (state: AppState) => state.donations.pagination,
  );
  const filter = useSelector((state: AppState) => state.donations.filter);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDonationsAction.started(undefined));
  }, [pagination, filter, dispatch]);

  const columnDefinitions = [
    {
      Header: 'ID',
      accessor: 'id',
    },
    {
      Header: 'Donor',
      accessor: 'donor',
    },
    {
      Header: 'Method',
      accessor: 'paymentMethod',
    },
    {
      Header: 'Sum',
      id: 'sum',
      accessor: (res: IDonation) =>
        res.sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' '),
    },
    {
      Header: 'Transaction cost',
      accessor: 'transactionCost',
    },
    {
      Header: 'KID',
      accessor: 'kid',
    },
    {
      Header: 'Timestamp',
      id: 'timestamp',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      accessor: (res: any) => shortDate(DateTime.fromISO(res.timestamp)),
    },
    {
      Header: 'Slett',
      id: 'delete',
      accessor: (res: IDonation) => (
        <DeleteButton id={res.id} sum={res.sum} donor={res.donor} />
      ),
    },
  ];

  const defaultSorting = [{ id: 'timestamp', desc: true }];

  const [donation, setDonation] = useState<number | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const trProps = (tableState: any, rowInfo: any) => {
    if (rowInfo && rowInfo.row) {
      return {
        onDoubleClick: () => {
          setDonation(rowInfo.original.id);
        },
      };
    }
    return {};
  };

  if (donation !== null) return <Redirect to={`/donations/${donation}`} />;
  return (
    <DonationListWrapper>
      <ReactTable
        manual
        data={data}
        page={pagination.page}
        pages={pages}
        pageSize={pagination.limit}
        loading={loading}
        columns={columnDefinitions}
        defaultSorted={defaultSorting}
        onPageChange={(page) =>
          dispatch(setDonationsPagination({ ...pagination, page }))}
        onSortedChange={(sorted) =>
          dispatch(setDonationsPagination({ ...pagination, sort: sorted[0] }))}
        onPageSizeChange={(pagesize) =>
          dispatch(setDonationsPagination({ ...pagination, limit: pagesize }))}
        getTrProps={trProps}
      />

      <DonationsFilterComponent />
    </DonationListWrapper>
  );
};

import React, { useEffect } from 'react';
import ReactTable from 'react-table';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchDonationsAction,
  setDonationsPagination,
} from '../../../../store/donations/donations-list.actions';
import { AppState } from '../../../../models/state';
import { shortDate, thousandize } from '../../../../util/formatting';
import { DateTime } from 'luxon';
import { useHistory } from 'react-router';
import { IDonation } from '../../../../models/types';
import { useAuth0 } from '@auth0/auth0-react';

interface Props {
  donations: Array<IDonation> | undefined;
  manual?: boolean;
  defaultPageSize?: number;
  hideDonorName?: boolean;
  hideKID?: boolean;
}

export const DonationsList: React.FunctionComponent<Props> = ({
  donations,
  manual,
  defaultPageSize,
  hideDonorName,
  hideKID,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { getAccessTokenSilently } = useAuth0();

  const pages = useSelector((state: AppState) => state.donations.pages);
  const loading = useSelector((state: AppState) => state.donations.loading);
  const pagination = useSelector((state: AppState) => state.donations.pagination);

  useEffect(() => {
    if (manual) {
      getAccessTokenSilently().then((token) => dispatch(fetchDonationsAction.started({ token })));
    }
  }, [pagination, manual, dispatch, getAccessTokenSilently]);

  const columnDefinitions: any[] = [
    {
      Header: 'ID',
      accessor: 'id',
      width: 100,
    },
    {
      Header: 'Method',
      accessor: 'paymentMethod',
    },
    {
      Header: 'Sum',
      id: 'sum',
      accessor: (res: any) => thousandize(res.sum),
      sortMethod: (a: any, b: any) => {
        return parseFloat(a.replace(' ', '')) > parseFloat(b.replace(' ', '')) ? -1 : 1;
      },
    },
    {
      Header: 'Transaction cost',
      id: 'transactionCost',
      accessor: (res: any) => thousandize(res.transactionCost),
      sortMethod: (a: any, b: any) => {
        return parseFloat(a.replace(' ', '')) > parseFloat(b.replace(' ', '')) ? -1 : 1;
      },
    },
    {
      Header: 'Timestamp',
      id: 'timestamp',
      accessor: (res: any) => shortDate(DateTime.fromISO(res.timestamp, { setZone: true })),
      sortMethod: (a: any, b: any) => {
        return DateTime.fromFormat(a, 'dd.MM.yyyy') > DateTime.fromFormat(b, 'dd.MM.yyyy') ? -1 : 1;
      },
    },
  ];

  if (!hideDonorName) {
    columnDefinitions.splice(1, 0, {
      Header: 'Donor',
      accessor: 'donor',
    });
  }

  if (!hideKID) {
    columnDefinitions.splice(4, 0, {
      Header: 'KID',
      accessor: 'kid',
    });
  }

  const defaultSorting = [{ id: 'timestamp', desc: true }];

  const trProps = (tableState: any, rowInfo: any) => {
    if (rowInfo && rowInfo.row) {
      return {
        onDoubleClick: (e: any) => {
          history.push(`/donations/${rowInfo.original.id}`);
        },
      };
    }
    return {};
  };

  if (manual) {
    return (
      <ReactTable
        manual
        data={donations}
        page={pagination.page}
        pages={pages}
        pageSize={pagination.limit}
        loading={loading}
        columns={columnDefinitions}
        defaultSorted={defaultSorting}
        onPageChange={(page) => dispatch(setDonationsPagination({ ...pagination, page }))}
        onSortedChange={(sorted) =>
          dispatch(setDonationsPagination({ ...pagination, sort: sorted[0] }))
        }
        onPageSizeChange={(pagesize) =>
          dispatch(setDonationsPagination({ ...pagination, limit: pagesize }))
        }
        getTrProps={trProps}
      />
    );
  } else {
    return (
      <ReactTable
        data={donations}
        defaultPageSize={defaultPageSize}
        loading={loading}
        columns={columnDefinitions}
        defaultSorted={defaultSorting}
        getTrProps={trProps}
      />
    );
  }
};

import React, { useEffect } from 'react';
import ReactTable from 'react-table';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../../models/state';
import { longDateTime, shortDate, thousandize } from '../../../../util/formatting';
import { DateTime } from 'luxon';
import { useHistory } from 'react-router';
import {
  fetchAvtaleGiroAgreementsAction,
  setAvtaleGiroPagination,
} from '../../../../store/avtalegiro/avtalegiro.actions';
import { IAvtaleGiro } from '../../../../models/types';
import { useAuth0 } from '@auth0/auth0-react';

export const AvtaleGiroList: React.FunctionComponent<{
  agreements: Array<IAvtaleGiro> | undefined;
  manual?: boolean;
  defaultPageSize?: number;
}> = ({ agreements, manual, defaultPageSize }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { getAccessTokenSilently } = useAuth0();

  const loading = useSelector((state: AppState) => state.avtaleGiroAgreements.loading);
  const pages = useSelector((state: AppState) => state.avtaleGiroAgreements.pages);
  const pagination = useSelector((state: AppState) => state.avtaleGiroAgreements.pagination);

  useEffect(() => {
    if (manual) {
      getAccessTokenSilently().then((token) =>
        dispatch(fetchAvtaleGiroAgreementsAction.started({ token }))
      );
    }
  }, [pagination, manual, dispatch, getAccessTokenSilently]);

  const columnDefinitions = [
    {
      Header: 'ID',
      accessor: 'ID',
      id: 'id',
      width: 60,
    },
    {
      Header: 'Donor',
      accessor: 'full_name',
    },
    {
      Header: 'Status',
      id: 'active',
      accessor: (res: any) => {
        if (res.active === 1) return 'ACTIVE';
        if (res.active === 0 && res.cancelled) return 'STOPPED';
        return 'INACTIVE';
      },
      width: 80,
    },
    {
      Header: 'Sum',
      id: 'amount',
      accessor: (res: any) => thousandize(res.amount),
      sortMethod: (a: any, b: any) => {
        return parseFloat(a.replace(' ', '')) > parseFloat(b.replace(' ', '')) ? -1 : 1;
      },
    },
    {
      Header: 'Day',
      accessor: 'payment_date',
      id: 'paymentDate',
      width: 60,
    },
    {
      Header: 'KID',
      accessor: 'KID',
      id: 'kid',
    },
    {
      Header: 'Draft date',
      id: 'created',
      accessor: (res: any) => shortDate(DateTime.fromISO(res.created, { setZone: true })),
      sortMethod: (a: any, b: any) => {
        return DateTime.fromFormat(a, 'dd.MM.yyyy') > DateTime.fromFormat(b, 'dd.MM.yyyy') ? -1 : 1;
      },
    },
    {
      Header: 'Last updated',
      id: 'lastUpdated',
      accessor: (res: any) => longDateTime(DateTime.fromISO(res.last_updated, { setZone: true })),
      sortMethod: (a: any, b: any) => {
        return DateTime.fromFormat(a, 'dd.MM.yyyy') > DateTime.fromFormat(b, 'dd.MM.yyyy') ? -1 : 1;
      },
    },
    {
      Header: 'Cancellation date',
      id: 'cancelled',
      accessor: (res: any) =>
        res.cancelled && shortDate(DateTime.fromISO(res.cancelled, { setZone: true })),
    },
    {
      Header: 'Notify',
      id: 'notice',
      accessor: (res: any) => (res.notice === 1 ? 'YES' : 'NO'),
      width: 60,
    },
  ];

  const defaultSorting = [{ id: 'created', desc: true }];

  const trProps = (tableState: any, rowInfo: any) => {
    if (rowInfo && rowInfo.row) {
      return {
        onDoubleClick: (e: any) => {
          history.push(`/avtalegiro/${rowInfo.original.ID}`);
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
        onPageChange={(page) => dispatch(setAvtaleGiroPagination({ ...pagination, page }))}
        onSortedChange={(sorted) =>
          dispatch(setAvtaleGiroPagination({ ...pagination, sort: sorted[0] }))
        }
        onPageSizeChange={(pagesize) =>
          dispatch(setAvtaleGiroPagination({ ...pagination, limit: pagesize }))
        }
        getTrProps={trProps}
      />
    );
  } else {
    return (
      <ReactTable
        data={agreements}
        loading={loading}
        columns={columnDefinitions}
        defaultPageSize={defaultPageSize}
        defaultSorted={defaultSorting}
        getTrProps={trProps}
      />
    );
  }
};

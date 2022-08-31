import React, { useEffect, useState } from 'react';
import ReactTable from 'react-table';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../../models/state';
import { shortDate, thousandize } from '../../../../util/formatting';
import { DateTime } from 'luxon';
import { ITaxUnit } from '../../../../models/types';
import { useAuth0 } from '@auth0/auth0-react';
import { EffektModal } from '../../../style/elements/effekt-modal/effekt-modal.component.style';
import { TaxUnitModal } from '../modal/TaxUnitModal';
import { Edit } from 'react-feather';

interface Props {
  taxUnits: Array<ITaxUnit> | undefined;
  manual?: boolean;
  defaultPageSize?: number;
}

export const TaxUnitList: React.FunctionComponent<Props> = ({
  taxUnits,
  manual,
  defaultPageSize,
}) => {
  const dispatch = useDispatch();
  const { getAccessTokenSilently } = useAuth0();

  const pages = useSelector((state: AppState) => state.taxUnits.pages);
  const loading = useSelector((state: AppState) => state.taxUnits.loading);
  const pagination = useSelector((state: AppState) => state.taxUnits.pagination);

  const [editTaxunit, setEditTaxunit] = useState<ITaxUnit | null>(null);

  useEffect(() => {
    if (manual) {
      // TODO: Implement
      // getAccessTokenSilently().then((token) => dispatch(fetchDonationsAction.started({ token })));
    }
  }, [pagination, manual, dispatch, getAccessTokenSilently]);

  const columnDefinitions: any[] = [
    {
      Header: 'ID',
      accessor: 'id',
      width: 100,
    },
    {
      Header: 'SSN',
      accessor: 'ssn',
      width: 170,
    },
    {
      Header: 'Name',
      accessor: 'name',
    },
    {
      Header: 'Donations',
      id: 'donations',
      accessor: (res: ITaxUnit) => thousandize(res.numDonations),
      Cell: (row) => <span style={{ textAlign: 'right', width: '100%' }}>{row.value}</span>,
      width: 170,
    },
    {
      Header: 'Sum donations',
      id: 'sumdonations',
      textAlign: 'right',
      accessor: (res: ITaxUnit) => thousandize(res.sumDonations) + ' kr',
      Cell: (row) => <span style={{ textAlign: 'right', width: '100%' }}>{row.value}</span>,
      width: 170,
    },
    {
      Header: 'Registered',
      id: 'registered',
      accessor: (res: any) => shortDate(DateTime.fromISO(res.registered, { setZone: true })),
      sortMethod: (a: any, b: any) => {
        return DateTime.fromFormat(a, 'dd.MM.yyyy') > DateTime.fromFormat(b, 'dd.MM.yyyy') ? -1 : 1;
      },
      width: 100,
    },
    {
      Header: 'Edit',
      id: 'edit',
      accessor: (res: any) => (
        <div
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}
        >
          <button onClick={() => setEditTaxunit(res)}>
            <Edit size={14} />
          </button>
        </div>
      ),
      width: 100,
    },
  ];

  const defaultSorting = [{ id: 'registered', desc: true }];

  const trProps = (tableState: any, rowInfo: any) => {
    if (rowInfo && rowInfo.row) {
      return {
        onDoubleClick: (e: any) => {
          alert('Not implemented');
          // history.push(`/taxunits/${rowInfo.original.id}`);
        },
      };
    }
    return {};
  };

  if (manual) {
    return (
      <div>
        <ReactTable
          manual
          data={taxUnits}
          page={pagination.page}
          pages={pages}
          pageSize={defaultPageSize ? defaultPageSize : pagination.limit}
          loading={loading || !taxUnits}
          columns={columnDefinitions}
          defaultSorted={defaultSorting}
          onPageChange={
            (page) => null // dispatch(setDonationsPagination({ ...pagination, page }))
          }
          onSortedChange={
            (sorted) => null
            // dispatch(setDonationsPagination({ ...pagination, sort: sorted[0] }))
          }
          onPageSizeChange={
            (pagesize) => null
            // dispatch(setDonationsPagination({ ...pagination, limit: pagesize }))
          }
          getTrProps={trProps}
        />
        <EffektModal
          visible={editTaxunit !== null}
          effect="fadeInUp"
          onClickAway={() => setEditTaxunit(null)}
        >
          {editTaxunit && (
            <TaxUnitModal
              taxUnit={editTaxunit}
              onSubmit={() => setEditTaxunit(null)}
            ></TaxUnitModal>
          )}
        </EffektModal>
      </div>
    );
  } else {
    return (
      <div>
        <ReactTable
          data={taxUnits}
          defaultPageSize={defaultPageSize}
          loading={loading}
          columns={columnDefinitions}
          defaultSorted={defaultSorting}
          getTrProps={trProps}
        />
        <EffektModal
          visible={editTaxunit !== null}
          effect="fadeInUp"
          onClickAway={() => setEditTaxunit(null)}
        >
          {editTaxunit && (
            <TaxUnitModal
              taxUnit={editTaxunit}
              onSubmit={() => setEditTaxunit(null)}
            ></TaxUnitModal>
          )}
        </EffektModal>
      </div>
    );
  }
};

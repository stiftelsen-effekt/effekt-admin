import React from 'react';
import ReactTable from 'react-table';
import {
  setDistributionPagination,
  fetchDistributionsAction,
} from '../../../../store/distributions/distribution-list.actions';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../../../models/state';
import { IDistributionSearchResultItem } from '../../../../models/types';
import { thousandize } from '../../../../util/formatting';

export const DistributionsList: React.FunctionComponent<{ distributions: Array<IDistributionSearchResultItem> | undefined, manual?: boolean, defaultPageSize?: number }> = ({ distributions, manual, defaultPageSize }) => {
  const pages = useSelector((state: AppState) => state.distributions.pages)
  const loading = useSelector((state: AppState) => state.distributions.loading)

  const dispatch = useDispatch()

  const columnDefinitions = [
    {
      Header: 'KID',
      accessor: 'KID',
      width: 150,
    },
    {
      Header: 'Name',
      accessor: 'full_name',
    },
    {
      Header: 'Email',
      accessor: 'email',
    },
    {
      Header: 'Total sum',
      id: 'sum',
      accessor: (res: any) => {
        if (res.sum) return thousandize(res.sum)
        else return '0'
      },
      sortMethod: (a: any, b: any) => {
        return parseFloat(a.replace(" ", "")) > parseFloat(b.replace(" ", "")) ? -1 : 1
      }
    },
    {
      Header: 'Antall donasjoner',
      id: 'count',
      accessor: (res: any) => {
        if (res.count) return thousandize(res.count)
        else return '0'
      },
      sortMethod: (a: any, b: any) => {
        return parseFloat(a.replace(" ", "")) > parseFloat(b.replace(" ", "")) ? -1 : 1
      }
    },
  ];

  const defaultSorting = [{ id: 'KID', desc: true }];

  if (manual) {
    return (
      <ReactTable
        manual
        data={distributions}
        pages={pages}
        loading={loading}
        columns={columnDefinitions}
        defaultSorted={defaultSorting}
        onFetchData={(state, instance) => {
          dispatch(
            setDistributionPagination({
              sort: state.sorted[0],
              page: state.page,
              limit: state.pageSize,
            })
          );
          dispatch(fetchDistributionsAction.started(undefined));
        }}
      />
    )
  } else {
    return (
      <ReactTable
        data={distributions}
        columns={columnDefinitions}
        defaultSorted={defaultSorting}
        defaultPageSize={defaultPageSize}
      />
    )
  }
};

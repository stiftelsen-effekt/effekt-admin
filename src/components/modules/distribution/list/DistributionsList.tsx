import React, { useState } from 'react';
import ReactTable from 'react-table';
import {
  setDistributionPagination,
  fetchDistributionsAction,
} from '../../../../store/distributions/distribution.actions';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../../../models/state';
import { IDistributionSearchResultItem } from '../../../../models/types';
import { thousandize } from '../../../../util/formatting';
import { PlusSquare } from 'react-feather';
import { EffektButton } from '../../../style/elements/button.style';
import { EffektModal } from '../../../style/elements/effekt-modal/effekt-modal.component.style';
import { CreateDistribution } from '../create/CreateDistribution';
import { useHistory } from 'react-router';
import { useAuth0 } from '@auth0/auth0-react';

export const DistributionsList: React.FunctionComponent<{
  distributions: Array<IDistributionSearchResultItem> | undefined;
  manual?: boolean;
  defaultPageSize?: number;
  hideName?: boolean;
  hideEmail?: boolean;
}> = ({ distributions, manual, defaultPageSize, hideName, hideEmail }) => {
  const pages = useSelector((state: AppState) => state.distributions.pages);
  const loading = useSelector((state: AppState) => state.distributions.loading);
  const history = useHistory();
  const dispatch = useDispatch();
  const { getAccessTokenSilently } = useAuth0();

  const [showCreate, setShowCreate] = useState<boolean>(false);

  let columnDefinitions: any[] = [
    {
      Header: 'KID',
      accessor: 'KID',
      width: 170,
    },
    {
      Header: 'Total sum',
      id: 'sum',
      accessor: (res: any) => {
        if (res.sum) return thousandize(res.sum);
        else return '0';
      },
      sortMethod: (a: any, b: any) => {
        return parseFloat(a.replace(' ', '')) > parseFloat(b.replace(' ', '')) ? -1 : 1;
      },
      width: 125,
    },
    {
      Header: 'Number of donations',
      id: 'count',
      accessor: (res: any) => {
        if (res.count) return thousandize(res.count);
        else return '0';
      },
      sortMethod: (a: any, b: any) => {
        return parseFloat(a.replace(' ', '')) > parseFloat(b.replace(' ', '')) ? -1 : 1;
      },
      width: 100,
    },
  ];

  if (!hideName) {
    columnDefinitions.splice(1, 0, {
      Header: 'Name',
      accessor: 'full_name',
    });
  }

  if (!hideEmail) {
    columnDefinitions.splice(2, 0, {
      Header: 'Email',
      accessor: 'email',
      width: 350,
    })
  }

  const defaultSorting = [{ id: 'KID', desc: true }];

  const trProps = (tableState: any, rowInfo: any) => {
    if (rowInfo && rowInfo.row) {
      return {
        onDoubleClick: (e: any) => {
          history.push(`/distributions/${rowInfo.original.KID}`);
        },
      };
    }
    return {};
  };

  if (manual) {
    return (
      <div>
        <div style={{ display: 'flex', marginBottom: '20px' }}>
          <EffektButton onClick={() => setShowCreate(true)}>
            <span>Create &nbsp;</span>{' '}
            <PlusSquare color={'white'} size={18} style={{ verticalAlign: 'middle' }} />
          </EffektButton>
        </div>

        <EffektModal
          visible={showCreate}
          effect="fadeInUp"
          onClickAway={() => setShowCreate(false)}
        >
          <CreateDistribution onSubmit={() => setShowCreate(false)} />
        </EffektModal>
        <ReactTable
          manual
          data={distributions}
          pages={pages}
          loading={loading}
          columns={columnDefinitions}
          defaultSorted={defaultSorting}
          defaultPageSize={defaultPageSize}
          getTrProps={trProps}
          onFetchData={(state) => {
            dispatch(
              setDistributionPagination({
                sort: state.sorted[0],
                page: state.page,
                limit: state.pageSize,
              })
            );
            getAccessTokenSilently().then((token) =>
              dispatch(fetchDistributionsAction.started({ token }))
            );
          }}
        />
      </div>
    );
  } else {
    return (
      <ReactTable
        data={distributions}
        columns={columnDefinitions}
        defaultSorted={defaultSorting}
        defaultPageSize={defaultPageSize}
      />
    );
  }
};

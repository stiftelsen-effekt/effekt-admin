import { AppState } from '../../../../models/state';
import React, { ChangeEvent, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import '../../../style/elements/react-table/table.css';
import ReactTable from 'react-table';
import {
  searchDonorAction,
  setSelectedDonor,
} from '../../../../store/donors/donor-selection.actions';
import { IDonor } from '../../../../models/types';
import { EffektInput } from '../../../style/elements/input.style';
import { shortDate } from '../../../../util/formatting';
import { PlusSquare } from 'react-feather';
import { EffektButton } from '../../../style/elements/button.style';
import { EffektModal } from '../../../style/elements/effekt-modal/effekt-modal.component.style';
import { CreateDonor } from '../create/CreateDonor';
import { useHistory } from 'react-router';
import { useAuth0 } from '@auth0/auth0-react';

interface IDonorTableState {
  sorted: Array<any>;
  page: number;
  pageSize: number;
  expanded: any;
  resized: any;
  filtered: any;
  selected: any;
}

export const DonorSelectionComponent: React.FunctionComponent = (props) => {
  const history = useHistory();
  const { getAccessTokenSilently } = useAuth0();

  const getDefaultState = (): IDonorTableState => {
    return {
      sorted: [],
      page: 0,
      pageSize: 25,
      expanded: {},
      resized: [],
      filtered: [],
      selected: null,
    };
  };

  const [state, setState] = useState<IDonorTableState>(getDefaultState());
  const dispatch = useDispatch();
  const searchResult = useSelector((state: AppState) => state.donorSelector.searchResult);

  if (!searchResult)
    getAccessTokenSilently().then((token) =>
      dispatch(searchDonorAction.started({ query: '', token }))
    );

  const search = (event: ChangeEvent<HTMLInputElement>) => {
    event.persist();
    setState({
      ...state,
      selected: null,
    });
    getAccessTokenSilently().then((token) =>
      dispatch(searchDonorAction.started({ query: event.target.value, token }))
    );
  };

  const columnDefinitions = [
    {
      Header: 'ID',
      accessor: 'id',
    },
    {
      Header: 'name',
      accessor: 'name',
    },
    {
      Header: 'email',
      accessor: 'email',
    },
    {
      id: 'registered',
      Header: 'registered',
      accessor: (donor: IDonor) => shortDate(donor.registered),
    },
  ];

  const rowClick = (rowInfo: any) => {
    setState({
      ...state,
      selected: rowInfo.index,
    });
    dispatch(setSelectedDonor(rowInfo.original));
  };

  const rowDoubleClick = (donorID: number) => {
    history.push(`donors/${donorID}`);
  };

  const rowStyle = (rowIndex: number, selectedIndex: number) => {
    return {
      background: rowIndex === selectedIndex ? 'black' : '',
      color: rowIndex === selectedIndex ? 'white' : '',
    };
  };

  const trProps = (tableState: any, rowInfo: any) => {
    if (rowInfo && rowInfo.row) {
      return {
        onClick: (e: React.MouseEvent) => rowClick(rowInfo),
        onDoubleClick: (e: any) => rowDoubleClick(rowInfo.original.id),
        style: rowStyle(rowInfo.index, state.selected),
      };
    } else {
      return {};
    }
  };

  const [showCreate, setShowCreate] = useState<boolean>(false);

  return (
    <div>
      <div style={{ display: 'flex', marginBottom: '20px' }}>
        <EffektInput
          type="text"
          onChange={search}
          placeholder="søk"
          style={{ flexGrow: 1, marginRight: 18 }}
        ></EffektInput>
        <EffektButton onClick={() => setShowCreate(true)}>
          <span>Create &nbsp;</span>{' '}
          <PlusSquare color={'white'} size={18} style={{ verticalAlign: 'middle' }} />
        </EffektButton>
      </div>

      <EffektModal visible={showCreate} effect="fadeInUp" onClickAway={() => setShowCreate(false)}>
        <CreateDonor onSubmit={() => setShowCreate(false)}></CreateDonor>
      </EffektModal>
      <ReactTable
        data={searchResult}
        columns={columnDefinitions}
        defaultPageSize={state.pageSize}
        onSortedChange={(sorted) => setState({ ...state, sorted })}
        onPageChange={(page) => setState({ ...state, page })}
        onPageSizeChange={(pageSize, page) => setState({ ...state, page, pageSize })}
        onExpandedChange={(expanded) => setState({ ...state, expanded })}
        onResizedChange={(resized) => setState({ ...state, resized })}
        onFilteredChange={(filtered) => setState({ ...state, filtered })}
        getTrProps={trProps}
      ></ReactTable>
    </div>
  );
};

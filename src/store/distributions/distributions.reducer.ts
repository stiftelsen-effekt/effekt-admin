import { DistributionsState } from '../../models/state';
import { isType } from 'typescript-fsa';
import {
  fetchDistributionsAction,
  SET_DISTRIBUTIONS_PAGINATION,
  SET_DISTRIBUTIONS_FILTER_DONOR,
  SET_DISTRIBUTIONS_FILTER_KID,
} from './distribution-list.actions';
import { SET_DISTRIBUTION_INPUT } from './distribution-input.actions';

const defaultState: DistributionsState = {
  searchResult: [],
  pages: -1,
  loading: false,
  pagination: {
    page: 1,
    limit: 20,
    sort: {
      id: 'KID',
      desc: true,
    },
  },
  filter: {
    donor: '',
    KID: '',
  },
  distributionInput: []
};

export const distributionsReducer = (state = defaultState, action: any): DistributionsState => {
  if (isType(action, fetchDistributionsAction.done)) {
    return {
      ...state,
      searchResult: action.payload.result.rows,
      pages: action.payload.result.pages,
      loading: false,
    };
  } else if (isType(action, fetchDistributionsAction.started)) {
    return { ...state, loading: true };
  } else if (isType(action, fetchDistributionsAction.failed)) {
    return { ...state, loading: false };
  }

  /**
  * FILTER
  */

  switch (action.type) {
    case SET_DISTRIBUTIONS_FILTER_DONOR:
      return { ...state, filter: { ...state.filter, donor: action.payload } };
    case SET_DISTRIBUTIONS_FILTER_KID:
      return { ...state, filter: { ...state.filter, KID: action.payload } };
  }

  /**
  * PAGINATION ACTIONS
  */
  switch (action.type) {
    case SET_DISTRIBUTIONS_PAGINATION:
      return { ...state, pagination: action.payload };
  }
 
  /**
  * DISTRIBUTION INPUT ACTIONS
  */
  switch (action.type) {
    case SET_DISTRIBUTION_INPUT:
      return { ...state, distributionInput: action.payload };
  }

  return state;
};

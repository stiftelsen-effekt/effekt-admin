import { DistributionsState } from '../../models/state';
import { isType } from 'typescript-fsa';
import {
  fetchDistributionsAction,
  SET_DISTRIBUTIONS_PAGINATION,
  SET_DISTRIBUTIONS_FILTER_DONOR,
  SET_DISTRIBUTIONS_FILTER_KID,
  fetchDistributionAction,
} from './distribution.actions';
import { createDistributionAction, SET_DISTRIBUTION_INPUT } from './distribution-input.actions';
import { toast } from 'react-toastify';
import Decimal from 'decimal.js';

const defaultState: DistributionsState = {
  searchResult: [],
  pages: -1,
  loading: false,
  pagination: {
    page: 1,
    limit: 25,
    sort: {
      id: 'KID',
      desc: true,
    },
  },
  filter: {
    donor: '',
    KID: '',
  },
  distributionInput: {
    donorID: '',
    donorName: '',
    distribution: [{ organizationId: 12, share: new Decimal(100) }],
  },
};

export const distributionsReducer = (state = defaultState, action: any): DistributionsState => {
  if (isType(action, fetchDistributionAction.done)) {
    return {
      ...state,
      current: {
        ...state.current,
        distribution: {
          KID: action.payload.result.kid,
          donor: action.payload.result.donor,
          shares: action.payload.result.distribution,
        },
        affiliatedDonations: action.payload.result.affilliatedDonations,
      },
    };
  } else if (isType(action, fetchDistributionAction.started)) {
    return { ...state, current: undefined, loading: true };
  } else if (isType(action, fetchDistributionAction.failed)) {
    console.log(action.payload);
    return { ...state, loading: false };
  }

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

  if (isType(action, createDistributionAction.done)) {
    toast.success(`Created new distribution with KID ${action.payload.result}`);
    return {
      ...state,
      filter: { ...state.filter, KID: action.payload.result },
    };
  }

  switch (action.type) {
    case SET_DISTRIBUTION_INPUT:
      return {
        ...state,
        distributionInput: { ...state.distributionInput, distribution: action.payload },
      };
  }

  return state;
};

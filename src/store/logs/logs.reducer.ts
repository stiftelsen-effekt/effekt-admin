import { isType } from 'typescript-fsa';
import { fetchLogsAction, SET_LOGS_PAGINATION } from './logs-list.actions';
import { LoggingState } from '../../models/state';
import { toastError } from '../../util/toasthelper';
import { CLEAR_CURRENT_LOG_ENTRY, fetchLogEntryAction } from './logs.actions';

const defaultState: LoggingState = {
  entries: [],
  loading: false,
  pages: 1,
  pagination: {
    page: 0,
    limit: 20,
    sort: {
      id: 'id',
      desc: true,
    },
  },
};

export const loggingReducer = (state = defaultState, action: any): LoggingState => {
  /**
   * Donations search
   */
  if (isType(action, fetchLogsAction.done)) {
    return {
      ...state,
      loading: false,
      entries: action.payload.result.rows,
      pages: action.payload.result.pages,
    };
  } else if (isType(action, fetchLogsAction.started)) {
    return { ...state, loading: true };
  } else if (isType(action, fetchLogsAction.failed)) {
    return { ...state, loading: false };
  }

  /**
   * Current entry (TODO)
   */

  if (action.type === CLEAR_CURRENT_LOG_ENTRY) {
    return {
      ...state,
      currentEntry: undefined,
    };
  }
  if (isType(action, fetchLogEntryAction.done)) {
    return {
      ...state,
      currentEntry: action.payload.result,
    };
  } else if (isType(action, fetchLogEntryAction.failed)) {
    toastError('Failed to fetch donation', action.payload.error.message);
  }

  /**
   * PAGINATION ACTIONS
   */
  switch (action.type) {
    case SET_LOGS_PAGINATION:
      return { ...state, pagination: action.payload };
  }

  return state;
};

import { AnyAction } from 'redux';
import { isType } from 'typescript-fsa';
import { DataOwnerState } from '../state';
import { fetchOwnersAction, SET_CURRENT_OWNER } from './owners.actions';
import { toastError } from '../../util/toasthelper';

const initialState: DataOwnerState = {
  current: undefined,
  owners: undefined,
};

export const ownersReducer = (
  state: DataOwnerState = initialState,
  action: AnyAction,
): DataOwnerState => {
  if (isType(action, fetchOwnersAction.done)) {
    return {
      ...state,
      current: action.payload.result.find((owner) => owner.default === true),
      owners: action.payload.result,
    };
  }
  if (isType(action, fetchOwnersAction.failed)) {
    toastError(
      'Failed to fetch active organizations',
      action.payload.error.message,
    );
  }

  if (action.type === SET_CURRENT_OWNER) {
    return {
      ...state,
      current: action.payload,
    };
  }

  return state;
};

import { DataOwnerState } from '../../models/state';
import { AnyAction } from 'redux';
import { fetchOwnersAction } from './owners.actions';
import { isType } from 'typescript-fsa';
import { toastError } from '../../util/toasthelper';

const initialState: DataOwnerState = {
  owners: undefined,
};

export const ownersReducer = (
  state: DataOwnerState = initialState,
  action: AnyAction
): DataOwnerState => {
  if (isType(action, fetchOwnersAction.done)) {
    return {
      ...state,
      owners: action.payload.result,
    };
  } else if (isType(action, fetchOwnersAction.failed)) {
    toastError('Failed to fetch active organizations', action.payload.error.message);
  }

  return state;
};

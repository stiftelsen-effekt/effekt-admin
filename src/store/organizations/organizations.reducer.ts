import { AnyAction } from 'redux';
import { isType } from 'typescript-fsa';
import { OrganizationsState } from '../state';
import { fetchActiveOrganizationsAction } from './organizations.action';
import { toastError } from '../../util/toasthelper';

const initialState: OrganizationsState = {
  active: undefined,
};

export const organizationsReducer = (
  state: OrganizationsState = initialState,
  action: AnyAction,
): OrganizationsState => {
  if (isType(action, fetchActiveOrganizationsAction.done)) {
    return {
      ...state,
      active: action.payload.result,
    };
  }
  if (isType(action, fetchActiveOrganizationsAction.failed)) {
    toastError(
      'Failed to fetch active organizations',
      action.payload.error.message,
    );
  }

  return state;
};

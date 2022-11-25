import { DonorSelectorState } from '../../models/state';
import { AnyAction } from 'redux';
import {
  SHOW_DONOR_SELECTION_COMPONENT,
  HIDE_DONOR_SELECTION_COMPONENT,
  CLEAR_SELECTED_DONOR,
  SET_SELECTED_DONOR,
  searchDonorAction,
} from './donor-selection.actions';
import { IDonor } from '../../models/types';
import { DateTime } from 'luxon';
import { isType } from 'typescript-fsa';

const initialState: DonorSelectorState = {
  visible: false,
  searchResult: [],
};

export const donorSelectorReducer = (
  state: DonorSelectorState = initialState,
  action: AnyAction
): DonorSelectorState => {
  if (isType(action, searchDonorAction.done)) {
    return {
      ...state,
      searchResult: action.payload.result.map((donor: IDonor) => {
        return {
          ...donor,
          registered: DateTime.fromISO(donor.registered.toString()),
        };
      }),
    };
  } else if (isType(action, searchDonorAction.failed)) {
    return {
      ...state,
      searchResult: [],
    };
  }

  switch (action.type) {
    case SHOW_DONOR_SELECTION_COMPONENT:
      return {
        ...state,
        visible: true,
      };
    case HIDE_DONOR_SELECTION_COMPONENT:
      return {
        ...state,
        visible: false,
      };
    case SET_SELECTED_DONOR:
      return {
        ...state,
        selectedDonor: action.payload,
      };

    case CLEAR_SELECTED_DONOR:
      return {
        ...state,
        selectedDonor: undefined,
      };

    default:
      return state;
  }
};

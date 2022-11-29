import { IDonor } from '../../models/types';
import actionCreatorFactory from 'typescript-fsa';

export const SHOW_DONOR_SELECTION_COMPONENT = 'SHOW_DONOR_SELECTION_COMPONENT';
export const HIDE_DONOR_SELECTION_COMPONENT = 'HIDE_DONOR_SELECTION_COMPONENT';

export const SET_SELECTED_DONOR = 'SET_SELECTED_DONOR';
export const CLEAR_SELECTED_DONOR = 'CLEAR_SELECTED_DONOR';

export const showDonorSelectionComponent = () => ({ type: SHOW_DONOR_SELECTION_COMPONENT });
export const hideDonorSelectionComponent = () => ({ type: HIDE_DONOR_SELECTION_COMPONENT });

export const setSelectedDonor = (payload: IDonor) => ({ type: SET_SELECTED_DONOR, payload });
export const clearSelectedDonor = () => ({ type: CLEAR_SELECTED_DONOR });

const actionCreator = actionCreatorFactory();

export interface IFetchSearchDonorsActionParams {
  query?: string,
  registered?: {
    from: Date | null,
    to: Date | null,
  },
  totalDonations?: {
    from: number | null,
    to: number | null,
  },
  token?: string
}

export const searchDonorAction = actionCreator.async<IFetchSearchDonorsActionParams, Array<IDonor>, Error>('SEARCH_DONORS');

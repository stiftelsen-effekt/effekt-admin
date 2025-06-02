import { DonorFiltersState } from "../../models/state";
import { IDonor } from "../../models/types";
import actionCreatorFactory from "typescript-fsa";

export const SET_DONOR_SELECTION_QUERY = "SET_DONOR_SELECTION_QUERY";

export const SHOW_DONOR_SELECTION_COMPONENT = "SHOW_DONOR_SELECTION_COMPONENT";
export const HIDE_DONOR_SELECTION_COMPONENT = "HIDE_DONOR_SELECTION_COMPONENT";

export const SET_SELECTED_DONOR = "SET_SELECTED_DONOR";
export const CLEAR_SELECTED_DONOR = "CLEAR_SELECTED_DONOR";

export const setDonorSelectionQuery = (payload: string) => ({
  type: SET_DONOR_SELECTION_QUERY,
  payload,
});

export const showDonorSelectionComponent = () => ({ type: SHOW_DONOR_SELECTION_COMPONENT });
export const hideDonorSelectionComponent = () => ({ type: HIDE_DONOR_SELECTION_COMPONENT });

export const setSelectedDonor = (payload: IDonor) => ({ type: SET_SELECTED_DONOR, payload });
export const clearSelectedDonor = () => ({ type: CLEAR_SELECTED_DONOR });

const actionCreator = actionCreatorFactory();

export interface IFetchSearchDonorsActionParams {
  token?: string;
  filter: DonorFiltersState;
  page: number;
  limit: number;
  sort?: {
    id: string;
    desc: boolean;
  };
}

export const searchDonorAction = actionCreator.async<
  IFetchSearchDonorsActionParams,
  {
    rows: Array<IDonor>;
    pages: number;
  },
  Error
>("SEARCH_DONORS");

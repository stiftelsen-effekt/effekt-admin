import { DonorSelectorState } from "../../../../models/state";
import { AnyAction } from "redux";
import { SHOW_DONOR_SELECTION_COMPONENT, HIDE_DONOR_SELECTION_COMPONENT, SEARCH_DONORS_SUCCESS, SEARCH_DONORS_FAILURE } from "./donor-selection.actions";

const initialState: DonorSelectorState = {
    visible: false,
    searchResult: []
}

export const donorSelectorReducer = (state: DonorSelectorState = initialState, action: AnyAction): DonorSelectorState => {
    console.log(action)
    switch(action.type) {
        case SHOW_DONOR_SELECTION_COMPONENT:
            return {
                ...state,
                visible: true
            }
        case HIDE_DONOR_SELECTION_COMPONENT:
            return {
                ...state,
                visible: false
            }

        case SEARCH_DONORS_SUCCESS:
            return {
                ...state,
                searchResult: action.payload
            }
        
        case SEARCH_DONORS_FAILURE:
            return {
                ...state,
                searchResult: []
            }

        default:
            return state;
    }
}
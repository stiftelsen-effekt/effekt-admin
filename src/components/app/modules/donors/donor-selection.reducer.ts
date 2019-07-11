import { DonorSelectorState } from "../../../../models/state";
import { AnyAction } from "redux";
import { SHOW_DONOR_SELECTION_COMPONENT, HIDE_DONOR_SELECTION_COMPONENT, SEARCH_DONORS_SUCCESS, SEARCH_DONORS_FAILURE, CLEAR_SELECTED_DONOR, SET_SELECTED_DONOR } from "./donor-selection.actions";
import { IDonor } from "../../../../models/dbtypes";
import { DateTime } from "luxon";

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
                searchResult: action.payload.map((donor: IDonor) => { return {...donor, registered: DateTime.fromISO(donor.registered.toString())}})
            }
        
        case SEARCH_DONORS_FAILURE:
            return {
                ...state,
                searchResult: []
            }

        case SET_SELECTED_DONOR:
            return {
                ...state,
                selectedDonor: action.payload
            }
        
        case CLEAR_SELECTED_DONOR:
            return {
                ...state,
                selectedDonor: undefined
            }

        default:
            return state;
    }
}
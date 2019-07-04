import { DonorSelectorState } from "../../../models/state";
import { AnyAction } from "redux";
import { SHOW_DONOR_SELECTION_COMPONENT, HIDE_DONOR_SELECTION_COMPONENT } from "./donorselector.actions";

const initialState: DonorSelectorState = {
    visible: false,
    searchResult: []
}

export const donorSelectorReducer = (state: DonorSelectorState = initialState, action: AnyAction): DonorSelectorState => {
    console.log(action.type)
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
        default:
            return state;
    }
}
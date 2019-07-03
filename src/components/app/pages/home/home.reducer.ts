import { HomeState } from "../../../../models/state";
import { AnyAction } from "redux";
import { FETCH_DONOR_SUCCESS } from "./home.actions";

const initialState: HomeState = {
    selectedDonor: undefined
}

export const homeReducer = (state: HomeState = initialState, action: AnyAction): HomeState => {
    switch(action.type) {
        case FETCH_DONOR_SUCCESS:
            return {
                ...state,
                selectedDonor: action.payload
            }
        default:
            return state;
    }
}
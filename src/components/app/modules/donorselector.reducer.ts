import { DonorSelectorState } from "../../../models/state";
import { AnyAction } from "redux";

const initialState: DonorSelectorState = {
    visible: true,
    searchResult: []
}

export const donorSelectorReducer = (state: DonorSelectorState = initialState, action: AnyAction): DonorSelectorState => {
    switch(action.type) {
        default:
            return state;
    }
}
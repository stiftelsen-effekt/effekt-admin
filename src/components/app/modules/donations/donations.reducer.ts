import { DonationsState } from "../../../../models/state";
import { isType, AnyAction } from "typescript-fsa";
import { fetchDonationsAction } from "./list/donations-list.actions";

const defaultState: DonationsState = {
    donations: [],
    page: 1,
    pages: -1
}
export const donationsReducer = (state = defaultState, action: AnyAction): DonationsState => {
    if(isType(action, fetchDonationsAction.done)) {
        return {
            ...state,
            donations: action.payload.result.rows,
            pages: action.payload.result.pages
        }
    }

    return state;
}
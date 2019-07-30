import { DonationsState } from "../../../../models/state";
import { isType, AnyAction } from "typescript-fsa";
import { fetchDonationsAction } from "./list/donations-list.actions";
import { fetchDonationAction, CLEAR_CURRENT_DONATION } from "../../../../store/donations/donation.actions";
import { toastError } from "../../../../util/toasthelper";

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

    if (action.type === CLEAR_CURRENT_DONATION) {
        return {
            ...state,
            currentDonation: undefined
        }
    }
    if(isType(action, fetchDonationAction.done)) {
        return {
            ...state,
            currentDonation: action.payload.result
        }
    }
    else if (isType(action, fetchDonationAction.failed)) {
        toastError("Failed to fetch donation", action.payload.error.message)
    }

    return state;
}
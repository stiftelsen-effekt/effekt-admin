import { DonationsState } from "../../models/state";
import { isType, AnyAction } from "typescript-fsa";
import { fetchDonationsAction } from "../../components/app/modules/donations/list/donations-list.actions";
import { fetchDonationAction, CLEAR_CURRENT_DONATION } from "./donation.actions";
import { toastError } from "../../util/toasthelper";
import Decimal from "decimal.js";

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
            currentDonation: {
                ...action.payload.result,
                timestamp: new Date(action.payload.result.timestamp),
                distribution: (
                    action.payload.result.distribution ?
                    action.payload.result.distribution.map((dist) => ({...dist, share: new Decimal(dist.share)})) :
                    undefined)
            }
        }
    }
    else if (isType(action, fetchDonationAction.failed)) {
        toastError("Failed to fetch donation", action.payload.error.message)
    }

    return state;
}
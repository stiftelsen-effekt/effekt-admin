import { DonationsState } from "../../models/state";
import { isType } from "typescript-fsa";
import { fetchDonationsAction, SET_DONATIONS_PAGINATION } from "../../components/app/modules/donations/list/donations-list.actions";
import { fetchDonationAction, CLEAR_CURRENT_DONATION } from "./donation.actions";
import { toastError } from "../../util/toasthelper";
import Decimal from "decimal.js";
import { SET_DONATION_FILTER_DATE_RANGE, SET_DONATION_FILTER_SUM_RANGE, SET_DONATION_FILTER_KID, SET_DONATION_FILTRE_PAYMENT_METHOD_IDS } from "../../components/app/modules/donations/list/filters/filters.actions";

const defaultState: DonationsState = {
    donations: [],
    pages: -1,
    pagination: {
        page: 1,
        limit: 20,
        sort: {
            id: 'ID',
            desc: true
        }
    },
    filter: {
        date: {
            from: null,
            to: null
        },
        sum: {
            from: 0,
            to: 30000
        },
        paymentMethodIDs: [2,3,4]
    }
}
export const donationsReducer = (state = defaultState, action: any): DonationsState => {
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

    /**
     * PAGINATION ACTIONS
     */
    switch(action.type) {
        case SET_DONATIONS_PAGINATION:
            return { ...state, pagination: action.payload }
    }

    /**
     * FILTER ACTIONS
     */

    switch(action.type) {
        case SET_DONATION_FILTER_DATE_RANGE:
            return {...state, filter: { ...state.filter, date: action.payload }}
        case SET_DONATION_FILTER_SUM_RANGE:
            return {...state, filter: { ...state.filter, sum: action.payload }}
        case SET_DONATION_FILTER_KID:
            return {...state, filter: { ...state.filter, KID: action.payload }}
        case SET_DONATION_FILTRE_PAYMENT_METHOD_IDS:
            return {...state, filter: { ...state.filter, paymentMethodIDs: action.payload }}
    }

    return state;
}
import { VippsAgreementsState } from "../../models/state";
import { isType } from "typescript-fsa";
import { toastError } from "../../util/toasthelper";
import Decimal from "decimal.js";
import { fetchVippsAgreementsAction, SET_VIPPS_AGREEMENTS_FILTER_AMOUNT, SET_VIPPS_AGREEMENTS_FILTER_DONOR, SET_VIPPS_AGREEMENTS_FILTER_KID, SET_VIPPS_AGREEMENTS_FILTER_STATUS, SET_VIPPS_AGREEMENTS_PAGINATION } from "./vipps.actions";

const defaultState: VippsAgreementsState = {
    agreements: [],
    loading: false,
    pages: 1,
    pagination: {
        page: 0,
        limit: 20,
        sort: {
            id: 'amount',
            desc: true
        }
    },
    filter: {
        amount: {
            from: 0,
            to: 1000000
        },
        KID: "",
        donor: "",
        status: ["ACTIVE", "STOPPED", "EXPIRED", "PENDING"]
    }
}

export const vippsAgreementReducer = (state = defaultState, action: any): VippsAgreementsState => {

    if(isType(action, fetchVippsAgreementsAction.done)) {
        return {
            ...state,
            loading: false,
            agreements: action.payload.result.rows,
            pages: action.payload.result.pages
        }
    }
    else if (isType(action, fetchVippsAgreementsAction.started)) {
        return { ...state, loading: true }
    }
    else if (isType(action, fetchVippsAgreementsAction.failed)) {
        return { ...state, loading: false }
    }

    /*
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
    */

    /**
     * PAGINATION ACTIONS
    */
    switch(action.type) {
        case SET_VIPPS_AGREEMENTS_PAGINATION:
            return { ...state, pagination: action.payload }
    }

    /**
     * FILTER ACTIONS
    */

    switch(action.type) {
        case SET_VIPPS_AGREEMENTS_FILTER_AMOUNT:
            return {...state, pagination: { ...state.pagination, page: 0 }, filter: { ...state.filter, amount: action.payload }}
        case SET_VIPPS_AGREEMENTS_FILTER_DONOR:
            return {...state, pagination: { ...state.pagination, page: 0 }, filter: { ...state.filter, donor: action.payload }}
        case SET_VIPPS_AGREEMENTS_FILTER_STATUS:
            return {...state, pagination: { ...state.pagination, page: 0 }, filter: { ...state.filter, KID: action.payload }}
        case SET_VIPPS_AGREEMENTS_FILTER_KID:
            return {...state, pagination: { ...state.pagination, page: 0 }, filter: {...state.filter, donor: action.payload}}
    }

    return state;
}

import { VippsAgreementChargeState, VippsAgreementsState } from "../../models/state";
import { isType } from "typescript-fsa";
import { toastError } from "../../util/toasthelper";
import { fetchAgreementHistogramAction, fetchChargeHistogramAction, fetchVippsAgreementChargesAction, fetchVippsAgreementsAction, SET_VIPPS_AGREEMENTS_FILTER_AMOUNT, SET_VIPPS_AGREEMENTS_FILTER_DONOR, SET_VIPPS_AGREEMENTS_FILTER_KID, SET_VIPPS_AGREEMENTS_FILTER_STATUS, SET_VIPPS_AGREEMENTS_PAGINATION } from "./vipps.actions";
import { fetchChargeHistogram } from "./vipps.saga";

const defaultAgreementState: VippsAgreementsState = {
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
        statuses: ["ACTIVE", "STOPPED", "EXPIRED", "PENDING"]
    }
}

const defaultChargeState: VippsAgreementChargeState = {
    charges: [],
    loading: false,
    pages: 1,
    pagination: {
        page: 0,
        limit: 20,
        sort: {
            id: 'amountNOK',
            desc: true
        }
    },
    filter: {
        amountNOK: {
            from: 0,
            to: 1000000
        },
        dueDate: {
            from: "",
            to: ""
        },
        KID: "",
        statuses: ["CHARGED", "REFUNDED", "RESERVED", "PENDING"]
    }
}

export const vippsAgreementReducer = (state = defaultAgreementState, action: any): VippsAgreementsState => {

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

    if (isType(action, fetchAgreementHistogramAction.done)) {
        return {
            ...state,
            histogram: action.payload.result
        }
    } else if (isType(action, fetchAgreementHistogramAction.failed)) {
        toastError("Failed to fetch agreement histogram", action.payload.error.message)
    }

    if (isType(action, fetchChargeHistogramAction.done)) {
        return {
            ...state,
            histogram: action.payload.result
        }
    } else if (isType(action, fetchChargeHistogramAction.failed)) {
        toastError("Failed to fetch charge histogram", action.payload.error.message)
    }

    switch(action.type) {
        case SET_VIPPS_AGREEMENTS_FILTER_AMOUNT:
            return {...state, pagination: { ...state.pagination, page: 0 }, filter: { ...state.filter, amount: action.payload }}
        case SET_VIPPS_AGREEMENTS_FILTER_DONOR:
            return {...state, pagination: { ...state.pagination, page: 0 }, filter: { ...state.filter, donor: action.payload }}
        case SET_VIPPS_AGREEMENTS_FILTER_STATUS:
            return {...state, pagination: { ...state.pagination, page: 0 }, filter: { ...state.filter, statuses: action.payload }}
        case SET_VIPPS_AGREEMENTS_FILTER_KID:
            return {...state, pagination: { ...state.pagination, page: 0 }, filter: {...state.filter, KID: action.payload}}
    }

    return state;
}

export const vippsAgreementChargeReducer = (state = defaultChargeState, action: any): VippsAgreementChargeState => {

    if(isType(action, fetchVippsAgreementChargesAction.done)) {
        return {
            ...state,
            loading: false,
            charges: action.payload.result.rows,
            pages: action.payload.result.pages
        }
    }
    else if (isType(action, fetchVippsAgreementChargesAction.started)) {
        return { ...state, loading: true }
    }
    else if (isType(action, fetchVippsAgreementChargesAction.failed)) {
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

    if (isType(action, fetchAgreementHistogramAction.done)) {
        return {
            ...state,
            histogram: action.payload.result
        }
    } else if (isType(action, fetchAgreementHistogramAction.failed)) {
        toastError("Failed to fetch agreement histogram", action.payload.error.message)
    }

    if (isType(action, fetchChargeHistogramAction.done)) {
        return {
            ...state,
            histogram: action.payload.result
        }
    } else if (isType(action, fetchChargeHistogramAction.failed)) {
        toastError("Failed to fetch charge histogram", action.payload.error.message)
    }

    switch(action.type) {
        case SET_VIPPS_AGREEMENTS_FILTER_AMOUNT:
            return {...state, pagination: { ...state.pagination, page: 0 }, filter: { ...state.filter, amount: action.payload }}
        case SET_VIPPS_AGREEMENTS_FILTER_DONOR:
            return {...state, pagination: { ...state.pagination, page: 0 }, filter: { ...state.filter, donor: action.payload }}
        case SET_VIPPS_AGREEMENTS_FILTER_STATUS:
            return {...state, pagination: { ...state.pagination, page: 0 }, filter: { ...state.filter, statuses: action.payload }}
        case SET_VIPPS_AGREEMENTS_FILTER_KID:
            return {...state, pagination: { ...state.pagination, page: 0 }, filter: {...state.filter, KID: action.payload}}
    }

    return state;
}

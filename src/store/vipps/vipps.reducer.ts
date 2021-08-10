import { VippsAgreementChargeState, VippsAgreementsState } from "../../models/state";
import { isType } from "typescript-fsa";
import { toastError } from "../../util/toasthelper";
import { fetchAgreementHistogramAction, fetchAgreementsReportAction, fetchChargeHistogramAction, fetchVippsAgreementAction, fetchVippsAgreementChargesAction, fetchVippsAgreementsAction, SET_VIPPS_AGREEMENTS_FILTER_AMOUNT, SET_VIPPS_AGREEMENTS_FILTER_DONOR, SET_VIPPS_AGREEMENTS_FILTER_KID, SET_VIPPS_AGREEMENTS_FILTER_STATUS, SET_VIPPS_AGREEMENTS_PAGINATION, SET_VIPPS_CHARGES_FILTER_AMOUNT, SET_VIPPS_CHARGES_FILTER_DONOR, SET_VIPPS_CHARGES_FILTER_KID, SET_VIPPS_CHARGES_FILTER_STATUS, SET_VIPPS_CHARGES_PAGINATION } from "./vipps.actions";

const defaultAgreementState: VippsAgreementsState = {
    activeAgreementCount: 0,
    averageAgreementSum: 0,
    totalAgreementSum: 0,
    medianAgreementSum: 0,
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
        statuses: []
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
        statuses: [],
        donor: ""
    }
}

export const vippsAgreementReducer = (state = defaultAgreementState, action: any): VippsAgreementsState => {

    // Fetch multiple agreements
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

    // Fetch single agreement
    if(isType(action, fetchVippsAgreementAction.done)) {
        return {
            ...state,
            currentAgreement: action.payload.result,
            loading: false
        }
    }
    else if (isType(action, fetchVippsAgreementAction.started)) {
        return { ...state, loading: true }
    }
    else if (isType(action, fetchVippsAgreementAction.failed)) {
        return { ...state, loading: false }
    }

    // Fetch agreement report
    if(isType(action, fetchAgreementsReportAction.done)) {
        return {
            ...state,
            loading: false,
            ...action.payload.result
        }
    }
    else if (isType(action, fetchAgreementsReportAction.started)) {
        return { ...state, loading: true }
    }
    else if (isType(action, fetchAgreementsReportAction.failed)) {
        return { ...state, loading: false }
    }


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

    /**
     * PAGINATION ACTIONS
    */
    switch(action.type) {
        case SET_VIPPS_CHARGES_PAGINATION:
            return { ...state, pagination: action.payload }
    }

    /**
     * FILTER ACTIONS
    */

    if (isType(action, fetchChargeHistogramAction.done)) {
        return {
            ...state,
            histogram: action.payload.result
        }
    } else if (isType(action, fetchChargeHistogramAction.failed)) {
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
        case SET_VIPPS_CHARGES_FILTER_AMOUNT:
            return {...state, pagination: { ...state.pagination, page: 0 }, filter: { ...state.filter, amountNOK: action.payload }}
        case SET_VIPPS_CHARGES_FILTER_DONOR:
            return {...state, pagination: { ...state.pagination, page: 0 }, filter: { ...state.filter, donor: action.payload }}
        case SET_VIPPS_CHARGES_FILTER_STATUS:
            return {...state, pagination: { ...state.pagination, page: 0 }, filter: { ...state.filter, statuses: action.payload }}
        case SET_VIPPS_CHARGES_FILTER_KID:
            return {...state, pagination: { ...state.pagination, page: 0 }, filter: {...state.filter, KID: action.payload}}
    }

    return state;
}

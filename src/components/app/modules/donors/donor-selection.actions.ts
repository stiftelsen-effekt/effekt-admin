import { IDonor } from "../../../../models/dbtypes";

export const SHOW_DONOR_SELECTION_COMPONENT = "SHOW_DONOR_SELECTION_COMPONENT"
export const HIDE_DONOR_SELECTION_COMPONENT = "HIDE_DONOR_SELECTION_COMPONENT"

export const SEARCH_DONORS_REQUEST = "SEARCH_DONORS_REQUEST"
export const SEARCH_DONORS_SUCCESS = "SEARCH_DONORS_SUCCESS"
export const SEARCH_DONORS_FAILURE = "SEARCH_DONORS_FAILURE"

export const showDonorSelectionComponent= () => {
    return {
        type: SHOW_DONOR_SELECTION_COMPONENT
    }
}

export const hideDonorSelectionComponent= () => {
    return {
        type: HIDE_DONOR_SELECTION_COMPONENT
    }
}

export const searchDonorsRequest = (query: string) => {
    return {
        type: SEARCH_DONORS_REQUEST,
        payload: query
    }
}

export const searchDonorsSuccess = (payload: Array<IDonor>) => {
    return {
        type: SEARCH_DONORS_SUCCESS,
        payload
    }
}

export const searchDonorFailure = (payload: string) => {
    return {
        type: SEARCH_DONORS_FAILURE,
        payload
    }
}
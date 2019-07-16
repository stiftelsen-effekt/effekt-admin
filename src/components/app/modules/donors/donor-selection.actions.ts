import { IDonor } from "../../../../models/types";

export const SHOW_DONOR_SELECTION_COMPONENT = "SHOW_DONOR_SELECTION_COMPONENT"
export const HIDE_DONOR_SELECTION_COMPONENT = "HIDE_DONOR_SELECTION_COMPONENT"

export const SEARCH_DONORS_REQUEST = "SEARCH_DONORS_REQUEST"
export const SEARCH_DONORS_SUCCESS = "SEARCH_DONORS_SUCCESS"
export const SEARCH_DONORS_FAILURE = "SEARCH_DONORS_FAILURE"

export const SET_SELECTED_DONOR = "SET_SELECTED_DONOR"
export const CLEAR_SELECTED_DONOR = "CLEAR_SELECTED_DONOR"

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

export const setSelectedDonor = (payload: IDonor) => {
    return {
        type: SET_SELECTED_DONOR,
        payload
    }
}

export const clearSelectedDonor = () => {
    return {
        type: CLEAR_SELECTED_DONOR
    }
}
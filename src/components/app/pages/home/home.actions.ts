export const FETCH_DONOR_REQUEST = "FETCH_DONOR_REQUEST";
export const FETCH_DONOR_SUCCESS = "FETCH_DONOR_SUCCESS";

export const fetchDonorRequest = (id: number) => {
    return {
        type: FETCH_DONOR_REQUEST,
        payload: id
    }
}

export const fetchDonorSuccess = (payload: any) => {
    return {
        type: FETCH_DONOR_SUCCESS,
        payload
    }
}
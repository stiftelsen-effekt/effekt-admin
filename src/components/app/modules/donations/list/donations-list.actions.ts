import actionCreatorFactory from "typescript-fsa";
import { IDonation, IDonationsPagination } from "../../../../../models/types";

export const SET_DONATIONS_PAGINATION = "SET_DONATIONS_PAGINATION"

const actionCreator = actionCreatorFactory();

interface IFetchDonationsResult {
    rows: Array<IDonation>,
    pages: number
}

export const fetchDonationsAction = actionCreator.async<undefined, IFetchDonationsResult, Error>('FETCH_DONATIONS');
export const setDonationsPagination = (pagination: IDonationsPagination) => {
    return {
        type: SET_DONATIONS_PAGINATION,
        payload: pagination
    }
}
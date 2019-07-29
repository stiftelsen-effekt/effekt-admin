import actionCreatorFactory from "typescript-fsa";
import { IDonation } from "../../../../../models/types";

const actionCreator = actionCreatorFactory();

export interface IFetchDonationsParams {
    sort: {
        id: string,
        desc: boolean
    },
    page: number,
    limit: number
}

interface IFetchDonationsResult {
    rows: Array<IDonation>,
    pages: number
}

export const fetchDonationsAction = actionCreator.async<IFetchDonationsParams, IFetchDonationsResult, Error>('FETCH_DONATIONS');
import actionCreatorFactory from "typescript-fsa";
import { IDonation } from "../../../../../models/types";

const actionCreator = actionCreatorFactory();

export interface IFetchDonationsParams {
    sort: {
        id: string,
        desc: boolean
    },
    cursor: number | string | Date | null,
    limit: number
}

interface IFetchDonationsResult {
    rows: Array<IDonation>,
    nextCursor?: string | number | Date
}

export const fetchDonationsAction = actionCreator.async<IFetchDonationsParams, IFetchDonationsResult, Error>('FETCH_DONATIONS');
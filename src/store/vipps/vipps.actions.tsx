import actionCreatorFactory from "typescript-fsa";
import { IHistogramBucket, IPagination, IVippsAgreement } from "../../models/types";

export const SET_VIPPS_AGREEMENTS_PAGINATION = "SET_VIPPS_AGREEMENTS_PAGINATION"
export const SET_VIPPS_AGREEMENTS_FILTER_AMOUNT = "SET_VIPPS_AGREEMENTS_FILTER_AMOUNT"
export const SET_VIPPS_AGREEMENTS_FILTER_KID = "SET_VIPPS_AGREEMENTS_FILTER_KID"
export const SET_VIPPS_AGREEMENTS_FILTER_DONOR = "SET_VIPPS_AGREEMENTS_FILTER_DONOR"
export const SET_VIPPS_AGREEMENTS_FILTER_STATUS = "SET_VIPPS_AGREEMENTS_FILTER_STATUS"

const actionCreator = actionCreatorFactory();

interface IFetchVippsAgreementsResult {
    rows: Array<IVippsAgreement>,
    pages: number
}

export const fetchVippsAgreementsAction = actionCreator.async<undefined, IFetchVippsAgreementsResult, Error>('FETCH_VIPPS_AGREEMENTS');
export const fetchAgreementHistogramAction = actionCreator.async<undefined, Array<IHistogramBucket> , Error>('FETCH_VIPPS_AGREEMENT_HISTOGRAM');
export const fetchChargeHistogramAction = actionCreator.async<undefined, Array<IHistogramBucket> , Error>('FETCH_VIPPS_CHARGES_HISTOGRAM');

export const setVippsAgreementsPagination = (pagination: IPagination) => {
    return {
        type: SET_VIPPS_AGREEMENTS_PAGINATION,
        payload: pagination
    }
}

interface AmountRange {
    from: number;
    to: number;
}

export const setVippsAgreementsFilterAmount = (amountRange: AmountRange) => {
    return {
        type: SET_VIPPS_AGREEMENTS_FILTER_AMOUNT,
        payload: amountRange
    }
}

export const setVippsAgreementsFilterDonor = (donor: string) => {
    return {
        type: SET_VIPPS_AGREEMENTS_FILTER_DONOR,
        payload: donor
    }
}

export const setVippsAgreementsFilterKID = (KID: string) => {
    return {
        type: SET_VIPPS_AGREEMENTS_FILTER_KID,
        payload: KID
    }
}

export const setVippsAgreementsFilterStatus = (status: string[]) => {
    return {
        type: SET_VIPPS_AGREEMENTS_FILTER_STATUS,
        payload: status
    }
}

import actionCreatorFactory from "typescript-fsa";
import { IVippsAgreement, IPagination } from "../../../../models/types";

export const SET_VIPPS_AGREEMENTS_PAGINATION = "SET_VIPPS_AGREEMENTS_PAGINATION"

const actionCreator = actionCreatorFactory();

interface IFetchVippsAgreementsResult {
    rows: Array<IVippsAgreement>,
    pages: number
}

export const fetchVippsAgreementsAction = actionCreator.async<undefined, IFetchVippsAgreementsResult, Error>('FETCH_VIPPS_AGREEMENTS');
export const setVippsAgreementsPagination = (pagination: IPagination) => {
    return {
        type: SET_VIPPS_AGREEMENTS_PAGINATION,
        payload: pagination
    }
}

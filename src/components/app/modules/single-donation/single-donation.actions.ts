import { IPaymentMethod, IDonor } from "../../../../models/dbtypes";
import { IDistribution } from "../kid/kid.models";

import actionCreatorFactory from 'typescript-fsa';
 
const actionCreator = actionCreatorFactory();

export const FETCH_PAYMENT_METHODS_REQUEST = 'FETCH_PAYMENT_METHODS_REQUEST';
export const FETCH_PAYMENT_METHODS_FAILURE = 'FETCH_PAYMENT_METHODS_FAILURE';
export const FETCH_PAYMENT_METHODS_SUCCESS = 'FETCH_PAYMENT_METHODS_SUCCESS';

export const fetchPaymentMethodsRequest = () => {
    return {
        type: FETCH_PAYMENT_METHODS_REQUEST
    }
}

export const fetchPaymentMethodsFailure = (error: Error) => {
    return {
        type: FETCH_PAYMENT_METHODS_FAILURE,
        payload: error
    }
}

export const fetchPaymentMethodsSuccess = (paymentMethods: Array<IPaymentMethod>) => {
    return {
        type: FETCH_PAYMENT_METHODS_SUCCESS,
        payload: paymentMethods
    }
}

export interface ICreateDistributionParams {
    donor: IDonor, 
    distribution: Array<IDistribution>
}

export interface IInsertDonationParams {
    sum: number,
    KID: number | undefined,
    time: Date | null,
    externalRef: string,
    methodId: number
}

/*
Do I need these? I don't think so.

export const insertDonationAction = actionCreator.async<IInsertDonationParams,{},{code: number}>('INSERT_DONATION');
export const createDistributionAction = actionCreator.async<ICreateDistributionParams,{KID: number},{code: number}>('CREATE_DISTRIBUTION');
*/

interface ICreateDistributionAndInsertDonationParams {
    distribution: ICreateDistributionParams,
    donation: IInsertDonationParams
}

export const createDistribitionAndInsertDonationAction = actionCreator.async<ICreateDistributionAndInsertDonationParams, {}, {code: number}>('CREATE_DISTRIBUTION_AND_INSERT_DONATION');
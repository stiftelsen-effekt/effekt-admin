import { IPaymentMethod, IDonor, IDonation } from "../../../../models/types";
import { IDistribution } from "../kid/kid.models";

import actionCreatorFactory from 'typescript-fsa';
 
const actionCreator = actionCreatorFactory();

/*
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
*/

export const fetchPaymentMethodsAction = actionCreator.async<undefined, Array<IPaymentMethod>, Error>('FETCH_PAYMENT_METHODS');

export interface ICreateDistributionParams {
    donor: IDonor,
    distribution: Array<IDistribution>
}

interface ICreateDistributionAndInsertDonationParams {
    distribution: ICreateDistributionParams,
    donation: IDonation
}

export const createDistribitionAndInsertDonationAction = actionCreator.async<ICreateDistributionAndInsertDonationParams, {}, Error>('CREATE_DISTRIBUTION_AND_INSERT_DONATION');
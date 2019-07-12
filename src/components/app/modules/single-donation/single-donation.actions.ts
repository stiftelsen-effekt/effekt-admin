import { IPaymentMethod, IDonor, IDonation } from "../../../../models/dbtypes";
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

export const INSERT_DONATION_REQUEST = 'INSERT_DONATION_REQUEST'
export const INSERT_DONATION_FAILURE = 'INSERT_DONATION_FAILURE'
export const INSERT_DONATION_SUCCESS = 'INSERT_DONATION_SUCCESS'

export const insertDonationRequest = (donation: IDonation) => {
    return {
        type: INSERT_DONATION_REQUEST,
        payload: donation
    }
}

export const insertDonationFailure = (error: Error) => {
    return {
        type: INSERT_DONATION_FAILURE,
        payload: error
    }
}

export const insertDonationSuccess = () => {
    return {
        type: INSERT_DONATION_SUCCESS
    }
}

export const createDistributionAction = actionCreator.async<{donor: IDonor, distribution: Array<IDistribution>},{KID: number},{code: number}>('CREATE_DISTRIBUTION');
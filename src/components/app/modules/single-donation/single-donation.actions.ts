import { IPaymentMethod } from "../../../../models/dbtypes";

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
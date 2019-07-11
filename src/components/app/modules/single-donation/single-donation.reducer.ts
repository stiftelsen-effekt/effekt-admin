import { SingleDonationState } from "../../../../models/state";
import { AnyAction } from "redux";
import { IPaymentMethod } from "../../../../models/dbtypes";
import { DateTime } from "luxon";
import { FETCH_PAYMENT_METHODS_SUCCESS } from "./single-donation.actions";

const initialState: SingleDonationState = {
    paymentMethods: undefined
}

export const singleDonationReducer = (state: SingleDonationState = initialState, action: AnyAction): SingleDonationState => {
    switch(action.type) {
        case FETCH_PAYMENT_METHODS_SUCCESS:
            return {
                ...state,
                paymentMethods: action.payload.map((method: IPaymentMethod) => { return {...method, lastUpdated: DateTime.fromISO(method.lastUpdated.toString())}})
            }
        

        default:
            return state;
    }
}
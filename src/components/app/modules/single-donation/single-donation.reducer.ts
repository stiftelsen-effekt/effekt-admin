import { SingleDonationState } from "../../../../models/state";
import { AnyAction } from "redux";
import { IPaymentMethod } from "../../../../models/dbtypes";
import { DateTime } from "luxon";
import { FETCH_PAYMENT_METHODS_SUCCESS, createDistribitionAndInsertDonationAction } from "./single-donation.actions";
import { isType } from "typescript-fsa";
import { toast } from "react-toastify";

const initialState: SingleDonationState = {
    paymentMethods: undefined
}

export const singleDonationReducer = (state: SingleDonationState = initialState, action: AnyAction): SingleDonationState => {
    if (isType(action, createDistribitionAndInsertDonationAction.done)) {
        toast.success("Donation inserted")
    }

    else if (isType(action, createDistribitionAndInsertDonationAction.failed)) {
        toast.error("Could not insert donation")
    }

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
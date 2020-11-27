import { AnyAction } from "redux";
import { isType } from "typescript-fsa";
import { toast } from "react-toastify";
import { resendRecieptAction } from "./reciept.actions";
import { toastError } from "../../util/toasthelper";

const initialState = {}

export const recieptReducer = (state = initialState, action: AnyAction) => {
    if (isType(action, resendRecieptAction.done)) {
        toast.success("Reciept resent")
    }
    else if (isType(action, resendRecieptAction.failed)) {
        toastError("Could not resend reciept", action.payload.error.message)
    }

    return state
}
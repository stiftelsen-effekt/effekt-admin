import { CreateDonorState } from "../../../../../models/state";
import { isType, AnyAction } from "typescript-fsa";
import { createDonorAction } from "./create-donor.actions";
import { toast } from "react-toastify";
import { toastError } from "../../../../../util/toasthelper";

export const CreateDonorReducer = (state: CreateDonorState = {}, action: AnyAction): CreateDonorState => {
    if (isType(action, createDonorAction.done)) {
        toast.success("Created donor!")
    }
    else if (isType(action, createDonorAction.failed)) {
        toastError("Failed to create donor!", action.payload.error.message)
    }

    return {}
}
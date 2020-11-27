import { DataOwnerState } from "../state";
import { AnyAction } from "redux";
import { fetchOwnersAction, SET_CURRENT_OWNER } from "./owners.actions";
import { isType } from "typescript-fsa";
import { toastError } from "../../util/toasthelper";

const initialState: DataOwnerState = {
    current: undefined,
    owners: undefined
}

export const ownersReducer = (state: DataOwnerState = initialState, action: AnyAction): DataOwnerState => {
    if (isType(action, fetchOwnersAction.done)) {
        return {
            ...state,
            current: action.payload.result.find((owner) => owner.default === true),
            owners: action.payload.result
        }
    } else if (isType(action, fetchOwnersAction.failed)) {
        toastError("Failed to fetch active organizations", action.payload.error.message)
    }

    if (action.type === SET_CURRENT_OWNER) {
        return {
            ...state,
            current: action.payload
        }
    }

    return state;
}
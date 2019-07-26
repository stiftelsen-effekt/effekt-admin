import { OrganizationsState } from "../../models/state";
import { AnyAction } from "redux";
import { fetchActiveOrganizationsAction } from "./organizations.action";
import { isType } from "typescript-fsa";
import { toastError } from "../../util/toasthelper";

const initialState: OrganizationsState = {
    active: undefined
}

export const organizationsReducer = (state: OrganizationsState = initialState, action: AnyAction): OrganizationsState => {
    if (isType(action, fetchActiveOrganizationsAction.done)) {
        return {
            ...state,
            active: action.payload.result
        }
    } else if (isType(action, fetchActiveOrganizationsAction.failed)) {
        toastError("Failed to fetch active organizations", action.payload.error.message)
    }

    return state;
}
import { OrganizationsState } from "../../models/state";
import { AnyAction } from "redux";
import { FETCH_ACTIVE_ORGANIZATIONS_SUCCESS } from "./organizations.action";

const initialState: OrganizationsState = {
    active: undefined
}

export const organizationsReducer = (state: OrganizationsState = initialState, action: AnyAction): OrganizationsState => {
    switch(action.type) {
        case FETCH_ACTIVE_ORGANIZATIONS_SUCCESS:
            return {
                ...state,
                active: action.payload
            }
        default:
            return state;
    }
}
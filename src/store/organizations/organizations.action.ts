import { IOrganization } from "../../models/dbtypes";

export const FETCH_ACTIVE_ORGANIZATIONS_REQUEST = "FETCH_ACTIVE_ORGANIZATIONS_REQUEST";
export const FETCH_ACTIVE_ORGANIZATIONS_FAILURE = "FETCH_ACTIVE_ORGANIZATIONS_FAILURE";
export const FETCH_ACTIVE_ORGANIZATIONS_SUCCESS = "FETCH_ACTIVE_ORGANIZATIONS_SUCCESS";

export const fetchActiveOrganizationsRequest = () => {
    return {
        type: FETCH_ACTIVE_ORGANIZATIONS_REQUEST
    }
}

export const fetchActiveOrganizationsFailure = (error: Error) => {
    return {
        type: FETCH_ACTIVE_ORGANIZATIONS_FAILURE,
        payload: error
    }
}

export const fetchActiveOrganizationsSuccess = (payload: Array<IOrganization>) => {
    return {
        type: FETCH_ACTIVE_ORGANIZATIONS_SUCCESS,
        payload
    }
}
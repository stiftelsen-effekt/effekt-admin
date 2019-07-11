import { IAccessKey, IAccessToken } from "../authenticate/auth";
import { IDonor, IOrganization, IPaymentMethod } from "./dbtypes";

export interface AppState {
    auth: AuthState,
    home: HomeState,

    donorSelector: DonorSelectorState,
    organizations: OrganizationsState
    singleDonation: SingleDonationState
}

export interface AuthState {
    currentToken?: IAccessToken,
    accessKey?: IAccessKey,
    authStep: AuthStep,
    loginError?: string
}
export enum AuthStep {
    INITIAL,
    SHOW_CONNECTION_FAILED,
    SHOW_LOGIN_SCREEN,
    LOGGED_IN
}

export interface HomeState {
    selectedDonor?: any
}

export interface DonorSelectorState {
    selectedDonor?: IDonor,
    searchResult: Array<IDonor>,
    visible: boolean
}

export interface OrganizationsState {
    active?: Array<IOrganization>
}

export interface SingleDonationState {
    paymentMethods?: Array<IPaymentMethod>
}
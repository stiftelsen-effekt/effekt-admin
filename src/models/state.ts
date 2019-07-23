import { IAccessKey, IAccessToken } from "../authenticate/auth";
import { IDonor, IOrganization, IPaymentMethod, IInvalidTransaction } from "./types";

export interface AppState {
    auth: AuthState,
    home: HomeState,

    donorSelector: DonorSelectorState,
    donorCreation: CreateDonorState,

    organizations: OrganizationsState
    singleDonation: SingleDonationState,

    reportProcessing: ReportProcessingState,
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
    paymentMethods: Array<IPaymentMethod>
}

export interface ReportProcessingState {
    valid: number,
    invalid: number,
    invalidTransactions: Array<IInvalidTransaction>
}

export interface CreateDonorState {

}
import { IAccessKey, IAccessToken } from "../authenticate/auth";
import { IDonor, IOrganization, IPaymentMethod, IInvalidTransaction, IDonation, IAggregationItem, IDonationFilter, IHistogramBucket, IDistributionFilter, IDistribution, IPagination, IDistributionSearchResultItem, IDataOwner, ILogEntry, IVippsAgreement } from "./types";

export interface AppState {
    auth: AuthState,

    graphing: GraphingState,

    donorSelector: DonorSelectorState,
    donorCreation: CreateDonorState,

    organizations: OrganizationsState
    singleDonation: SingleDonationState,

    reportProcessing: ReportProcessingState,

    donations: DonationsState,
    distributions: DistributionsState,
    dataOwner:  DataOwnerState,
    reciept: RecieptState,
    logs: LoggingState

    vippsAgreements: VippsAgreementsState,
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

export interface DonorSelectorState {
    selectedDonor?: IDonor,
    searchResult?: Array<IDonor>,
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

export interface DonationsState {
    currentDonation?: IDonation,

    histogram?: Array<IHistogramBucket>,
    pages: number,
    loading: boolean,
    pagination: IPagination,
    filter: IDonationFilter,
    donations: Array<IDonation>,
}

export interface VippsAgreementsState {
    currentAgreement?: IVippsAgreement,
    pages: number,
    loading: boolean,
    pagination: IPagination,
    agreements: Array<IVippsAgreement>,
}

export interface GraphingState {
    total?: Array<IAggregationItem>
}

export interface CurrentDistributionState {
    distribution: IDistribution,
    affiliatedDonations: Array<IDonation>
}

export interface DistributionsState {
    current?: CurrentDistributionState,

    filter: IDistributionFilter,
    pagination: IPagination,
    pages: number,
    loading: boolean,
    searchResult: Array<IDistributionSearchResultItem>
}

export interface DataOwnerState {
    current?: IDataOwner,
    owners?: Array<IDataOwner>
}

export interface RecieptState {
    
}

export interface LoggingState {
    currentEntry?: ILogEntry,
    entries: Array<ILogEntry>,
    pages: number,
    loading: boolean,
    pagination: IPagination,
}
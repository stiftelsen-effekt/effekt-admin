import { IAccessKey, IAccessToken } from '../store/authentication/auth';
import {
  IDonor,
  IOrganization,
  IPaymentMethod,
  IInvalidTransaction,
  IDonation,
  IAggregationItem,
  IDonationFilter,
  IHistogramBucket,
  IDistributionFilter,
  IDistribution,
  IPagination,
  IDistributionSearchResultItem,
  IDataOwner,
  ILogEntry,
  IVippsAgreement,
  IVippsAgreementFilter,
  IVippsAgreementCharge,
  IVippsAgreementChargeFilter,
  IAvtaleGiro,
  IAvtaleGiroFilter,
  IAggregationMonthlyItem,
  IAvtaleGiroValidationTableRow,
} from './types';

export interface AppState {
  auth: AuthState;

  graphing: GraphingState;

  donorSelector: DonorSelectorState;
  donorCreation: CreateDonorState;

  organizations: OrganizationsState;
  singleDonation: SingleDonationState;

  reportProcessing: ReportProcessingState;

  donations: DonationsState;
  distributions: DistributionsState;
  dataOwner: DataOwnerState;
  receipt: ReceiptState;
  logs: LoggingState;

  vippsAgreements: VippsAgreementsState;
  vippsAgreementCharges: VippsAgreementChargeState;

  avtaleGiroAgreements: AvtaleGiroAgreementsState;
}

export interface AuthState {
  currentToken?: IAccessToken;
  accessKey?: IAccessKey;
  authStep: AuthStep;
  loginError?: string;
}
export enum AuthStep {
  INITIAL,
  SHOW_CONNECTION_FAILED,
  SHOW_LOGIN_SCREEN,
  LOGGED_IN,
}

export interface DonorSelectorState {
  selectedDonor?: IDonor;
  searchResult?: Array<IDonor>;
  visible: boolean;
}

export interface OrganizationsState {
  active?: Array<IOrganization>;
}

export interface SingleDonationState {
  paymentMethods: Array<IPaymentMethod>;
}

export interface ReportProcessingState {
  valid: number;
  invalid: number;
  invalidTransactions: Array<IInvalidTransaction>;
}

export interface CreateDonorState {}

export interface DonationsState {
  currentDonation?: IDonation;

  histogram?: Array<IHistogramBucket>;
  pages: number;
  loading: boolean;
  pagination: IPagination;
  filter: IDonationFilter;
  donations: Array<IDonation>;
}

export interface VippsAgreementsState {
  activeAgreementCount: number;
  averageAgreementSum: number;
  totalAgreementSum: number;
  medianAgreementSum: number;
  activatedThisMonth: number;
  sumActivatedThisMonth: null | number;
  stoppedThisMonth: number;
  sumStoppedThisMonth: null | number;
  pendingThisMonth: number;
  sumPendingThisMonth: null | number;
  expiredThisMonth: number;
  sumExpiredThisMonth: null | number;
  currentAgreement?: IVippsAgreement;
  histogram?: Array<IHistogramBucket>;
  pages: number;
  loading: boolean;
  pagination: IPagination;
  filter: IVippsAgreementFilter;
  agreements: Array<IVippsAgreement>;
}

export interface VippsAgreementChargeState {
  currentCharge?: IVippsAgreementCharge;
  histogram?: Array<IHistogramBucket>;
  pages: number;
  loading: boolean;
  pagination: IPagination;
  filter: IVippsAgreementChargeFilter;
  charges: Array<IVippsAgreementCharge>;
}

export interface AvtaleGiroAgreementsState {
  activeAgreementCount: number;
  averageAgreementSum: number;
  totalAgreementSum: number;
  medianAgreementSum: number;
  draftedThisMonth: number;
  sumDraftedThisMonth: number | null;
  activatedThisMonth: number;
  sumActivatedThisMonth: number | null;
  stoppedThisMonth: number;
  sumStoppedThisMonth: number | null;
  validationTable: Array<IAvtaleGiroValidationTableRow>;
  currentAgreement?: IAvtaleGiro;
  histogram?: Array<IHistogramBucket>;
  pages: number;
  loading: boolean;
  pagination: IPagination;
  filter: IAvtaleGiroFilter;
  agreements: Array<IAvtaleGiro>;
}

export interface GraphingState {
  total?: Array<IAggregationItem>;
  monthly?: Array<IAggregationMonthlyItem>;
}

export interface CurrentDistributionState {
  distribution: IDistribution;
  affiliatedDonations: Array<IDonation>;
}

export interface DistributionsState {
  current?: CurrentDistributionState;

  filter: IDistributionFilter;
  pagination: IPagination;
  pages: number;
  loading: boolean;
  searchResult: Array<IDistributionSearchResultItem>;
}

export interface DataOwnerState {
  current?: IDataOwner;
  owners?: Array<IDataOwner>;
}

export interface ReceiptState {}

export interface LoggingState {
  currentEntry?: ILogEntry;
  entries: Array<ILogEntry>;
  pages: number;
  loading: boolean;
  pagination: IPagination;
}

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
  IAvtalegiroReport,
  IAvtaleGiroValidation,
  ILogFilter,
  IDonorStats,
  IDistributionShare,
} from './types';

export interface AppState {
  graphing: GraphingState;

  donorSelector: DonorSelectorState;
  donorCreation: CreateDonorState;
  donorPage: DonorPageState;

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

export interface DonorSelectorState {
  selectedDonor?: IDonor;
  searchResult?: Array<IDonor>;
  visible: boolean;
}

export interface DonorPageState {
  donor?: IDonor;
  stats?: IDonorStats;
  donations?: Array<IDonation>;
  distributions?: Array<IDistributionSearchResultItem>;
  avtalegiroAgreements?: Array<IAvtaleGiro>;
  vippsAgreements?: Array<IVippsAgreement>;
  updateError?: {message: string, timestamp: number};
  pendingUpdates: number;
}

export interface OrganizationsState {
  active?: Array<IOrganization>;
}

export interface SingleDonationState {
  paymentMethods: Array<IPaymentMethod>;
}

export interface FBCampaign {
  ID: string;
  fundraiserTitle: string;
  campaignOwnerName: string;
  permalink: string;
}

export interface ReportProcessingState {
  valid: number;
  invalid: number;
  invalidTransactions: Array<IInvalidTransaction>;
  loading: boolean;
  fbCampaigns?: Array<FBCampaign> | undefined;
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
  report: IAvtalegiroReport;
  validation: IAvtaleGiroValidation;
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
  distribution?: IDistribution;
  affiliatedDonations?: Array<IDonation>;
}

export interface DistributionsState {
  current?: CurrentDistributionState;
  filter: IDistributionFilter;
  pagination: IPagination;
  pages: number;
  loading: boolean;
  searchResult: Array<IDistributionSearchResultItem>;
  distributionInput: {
    distribution: Array<IDistributionShare>;
    donorID: string;
    donorName: string;
  };
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
  filter: ILogFilter;
}

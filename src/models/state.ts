import {
  IDonor,
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
  IReferralAnswer,
  ITaxUnit,
  ITaxUnitFilter,
  IAutoGiroValidation,
  IAutoGiro,
  IAutoGiroFilter,
  ICauseArea,
  IAutoGiroMandate,
  IAutoGiroMandateFilter,
  IFundraiser,
  IFundraiserFilter,
  IReferralType,
  IVippsMatchingRule,
  IOrganization,
} from "./types";
import { DateTime } from "luxon";

export interface AppState {
  graphing: GraphingState;

  donorSelector: DonorSelectorState;
  donorCreation: CreateDonorState;
  donorPage: DonorPageState;

  causeareas: CauseAreasState;
  referrals: ReferralsState;
  singleDonation: SingleDonationState;

  reportProcessing: ReportProcessingState;

  donations: DonationsState;
  distributions: DistributionsState;
  taxUnits: TaxUnitsState;
  dataOwner: DataOwnerState;
  receipt: ReceiptState;
  logs: LoggingState;

  vippsAgreements: VippsAgreementsState;
  vippsAgreementCharges: VippsAgreementChargeState;

  avtaleGiroAgreements: AvtaleGiroAgreementsState;
  autoGiroAgreements: AutoGiroAgreementsState;
  autoGiroMandates: AutoGiroMandatesState;

  vippsMatchingRules: VippsMatchingRulesState;

  fundraisers: FundraisersState;

  donors: DonorsState;

  organizations: OrganizationsState;
}

export interface DonorSelectorState {
  query: string;
  selectedDonor?: IDonor;
  searchResult?: {
    rows: Array<IDonor>;
    pages: number;
  };
  visible: boolean;
  loading: boolean;
}

export interface DonorPageState {
  donor?: IDonor;
  stats?: IDonorStats;
  donations?: Array<IDonation>;
  taxUnits?: Array<ITaxUnit>;
  referralAnswers?: Array<IReferralAnswer>;
  distributions?: Array<IDistributionSearchResultItem>;
  avtalegiroAgreements?: Array<IAvtaleGiro>;
  autoGiroAgreements?: Array<IAutoGiro>;
  vippsAgreements?: Array<IVippsAgreement>;
  updateError?: { message: string; timestamp: number };
  pendingUpdates: number;
  mergedDonorTargetId?: number;
}

export interface CauseAreasState {
  active?: Array<ICauseArea>;
  all?: Array<ICauseArea>;
}

export interface ReferralsState {
  active?: Array<IReferralType>;
  all?: Array<IReferralType>;
}

export interface SingleDonationState {
  editSaving: boolean;
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
  newMandates?: number | undefined;
  autoGiroShipments?: { ID: number; sent_date: string }[];
}

export interface CreateDonorState {}

export interface DonationsState {
  currentDonation?: IDonation;

  transactionCostsReport?: ITransactionCostsReport;
  histogram?: Array<IHistogramBucket>;
  pages: number;
  loading: boolean;
  pagination: IPagination;
  filter: IDonationFilter;
  donations: Array<IDonation>;
}

export interface ITransactionCostsReport {
  costPrevMonth: string;
  costPrevMonthPrevYear: string;
  costCurrentMonthToDate: string;
  costCurrentMonthToDatePrevYear: string;
  costYTD: string;
  costYTDPrevYear: string;
}

export interface TaxUnitsState {
  currentTaxUnit?: ITaxUnit;

  pages: number;
  loading: boolean;
  pagination: IPagination;
  filter: ITaxUnitFilter;
  units: Array<ITaxUnit>;
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
  currentAgreementUpdating?: boolean;
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
  currentAgreementUpdating?: boolean;
  histogram?: Array<IHistogramBucket>;
  pages: number;
  loading: boolean;
  pagination: IPagination;
  filter: IAvtaleGiroFilter;
  agreements: Array<IAvtaleGiro>;
}

export interface AutoGiroAgreementsState {
  validation: IAutoGiroValidation;
  currentAgreement?: IAutoGiro;
  currentAgreementUpdating?: boolean;
  histogram?: Array<IHistogramBucket>;
  pages: number;
  loading: boolean;
  pagination: IPagination;
  filter: IAutoGiroFilter;
  agreements: Array<IAutoGiro>;
}

export interface AutoGiroMandatesState {
  currentMandate?: IAutoGiroMandate;
  pages: number;
  loading: boolean;
  pagination: IPagination;
  filter: IAutoGiroMandateFilter;
  mandates: Array<IAutoGiroMandate>;
}

export interface VippsMatchingRulesState {
  rules: Array<IVippsMatchingRule>;
  loading: boolean;
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
    distribution: Partial<IDistribution>;
    donor?: IDonor;
    taxUnits?: ITaxUnit[];
    valid: {
      valid: boolean;
      reason: string;
    };
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

export interface FundraisersState {
  currentFundraiser?: IFundraiser;
  fundraisers: Array<IFundraiser>;
  pages: number;
  loading: boolean;
  pagination: IPagination;
  filter: IFundraiserFilter;
  statistics: {
    numFundraisers: number;
    sumDonations: number;
    avgDonation: number;
  };
}

export interface DonorFiltersState {
  name: string;
  email: string;
  query?: string;
  donorId: number | null;
  newsletter?: boolean;
  registeredDate: {
    from: DateTime | null;
    to: DateTime | null;
  };
  donationsDateRange: {
    from: DateTime | null;
    to: DateTime | null;
  };
  lastDonationDate: {
    from: DateTime | null;
    to: DateTime | null;
  };
  donationsCount: {
    from: number | null;
    to: number | null;
  };
  donationsSum: {
    from: number | null;
    to: number | null;
  };
  referralTypeIDs?: Array<number>;
  recipientOrgIDs?: Array<number>;
}

export interface DonorsState {
  donors: Array<IDonor>;
  loading: boolean;
  pages: number;
  pagination: {
    page: number;
    limit: number;
    sort?: {
      id: string;
      desc: boolean;
    };
  };
  filter: DonorFiltersState;
  statistics: {
    totalDonors: number;
    totalDonationSum: number;
    totalDonationCount: number;
  };
}

export interface OrganizationsState {
  organizations: Array<IOrganization>;
  currentOrganization?: IOrganization;
  loading: boolean;
}

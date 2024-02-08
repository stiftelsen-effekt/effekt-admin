import { DateTime } from "luxon";
import Decimal from "decimal.js";

export interface IDonor {
  id: number;
  name: string;
  email: string;
  registered: DateTime;
  total_donations: number;
  ssn: string;
  newsletter?: boolean;
  trash?: boolean;
}

export interface IDonorStats {
  countTotalDonations?: number;
  sumTotalDonations?: number;
  sumYearlyAggregates?: Array<IDistributionShare & { year: number }>;
}

export interface IOrganization {
  id: number;
  name: string;
  abbreviation: string;
  shortDesc: string;
  standardShare: number;
  infoUrl: string;
}

export interface IPaymentMethod {
  id: number;
  name: string;
  abbriviation: string;
  shortDescription: string;
  flatFee: number;
  percentageFee: number;
  lastUpdated: DateTime;
}

/** Donations */

export interface IDonation {
  id?: number;
  donorId?: number;
  paymentId: number;
  paymentExternalRef: string;
  sum: number;
  transactionCost: number;
  paymentMethod: string;
  timestamp: Date;
  KID?: string;
  distribution?: IDistribution;
  metaOwnerID?: number;
}

export interface IDistribution {
  kid: string;
  donorId: number;
  taxUnitId: number;
  causeAreas: Array<IDistributionCauseArea>;
}

export interface IDistributionCauseArea {
  id: number;
  name?: string;
  standardSplit: boolean;
  percentageShare: Decimal;
  organizations: Array<IDistributionShare>;
}

export interface ICauseArea {
  id: number;
  name: string;
  standardSplit: boolean;
  percentageShare: Decimal;
  organizations: Array<IOrganization>;
}

export interface IOrganization {
  id: number;
  name: string;
  abbriv: string;
  shortDesc: string;
  standardShare: number;
  infoUrl: string;
}

export interface IDonationFilter {
  sum: {
    from: number;
    to: number;
  };
  date: {
    from: Date | null;
    to: Date | null;
  };
  paymentMethodIDs: Array<number> | undefined;
  organizationIDs: Array<number> | undefined;
  KID?: string;
  donor?: string;
  id?: string;
  statistics: {
    numDonations: number;
    sumDonations: number;
    avgDonation: number;
  };
}

export interface IHistogramBucket {
  bucket: number;
  items: number;
  bar: number;
}

/** Distribution */

export interface IDistributionShare {
  id: number;
  percentageShare: Decimal;
  value?: Decimal;
  abbriv?: string;
  name?: string;
}

export interface IDistributionFilter {
  KID?: string;
  donor?: string;
}

export interface IDistributionSearchResultItem extends Partial<IDistribution> {
  sum: number;
  count: number;
}

/** Tax units */
export interface ITaxUnit {
  id: number;
  ssn: string | null;
  name: string;
  numDonations: number;
  sumDonations: number;
  registered: DateTime;
  archived: DateTime | null;
}

export interface ITaxUnitFilter {
  donor?: string;
}

/** Transactions */

export interface IInvalidTransaction {
  reason: string;
  transaction: ITransaction;
}

export interface ITransaction {
  KID: string;
  amount: number;
  date: Date;
  location: string;
  message: string;
  name: string;
  transactionID: string;
  paymentID?: number;
  FBLink?: string;
  FBCampaignName?: string;
}

/** Graphing */

export interface IAggregationItem {
  id: number;
  orgName: string;
  sum: Decimal;
}

export interface IAggregationMonthlyItem {
  year: number;
  month: number;
  sum: number;
}

/** Misc */
export interface IPagination {
  sort: {
    id: string;
    desc: boolean;
  };
  page: number;
  limit: number;
}

export interface IDataOwner {
  id: number;
  name: string;
  default: boolean;
}

/** Logs */
export interface ILogEntry {
  ID: number;
  label: string;
  result: object;
  timestamp: string;
}

export interface ILogFilter {
  filesearch?: string;
}

/** VippsAgreements */

export interface IVippsAgreement {
  id: string;
  start: string;
  status: string;
  amount: number;
  KID: string;
  agreement_url_code: string;
  donorID: number;
  monthly_charge_day: number;
  paused_until_date: Date;
  distribution: IDistribution;
  timestamp_created: string;
}

export interface IVippsAgreementFilter {
  amount: {
    from: number;
    to: number;
  };
  created?: {
    from: Date | null;
    to: Date | null;
  };
  chargeDay?: {
    from: number;
    to: number;
  };
  KID?: string;
  donor?: string;
  statuses?: Array<string>;
  statistics: {
    numAgreements: number;
    sumAgreements: number;
    avgAgreement: number;
  };
}

export interface IVippsAgreementCharge {
  chargeID: string;
  agreementID: string;
  status: string;
  amountNOK: number;
  KID: string;
  dueDate: string;
  timestamp: string;
}

export interface IVippsAgreementChargeFilter {
  amountNOK: {
    from: number;
    to: number;
  };
  dueDate: {
    from: Date | null;
    to: Date | null;
  };
  KID?: string;
  statuses?: Array<string>;
  donor: string;
  statistics: {
    numCharges: number;
    sumCharges: number;
    avgCharge: number;
  };
}

/** AvtaleGiro agreements */

export interface IAvtaleGiro {
  id: string;
  created: string;
  last_updated: string;
  active: number;
  amount: number;
  KID: string;
  donor: string;
  full_name: string;
  payment_date: number;
  cancelled: string;
  distribution: IDistribution;
  affiliatedDonations: Array<IDonation>;
}

export interface IAvtaleGiroFilter {
  amount: {
    from: number;
    to: number;
  };
  KID?: string;
  paymentDate?: {
    from: number;
    to: number;
  };
  created?: {
    from: Date | null;
    to: Date | null;
  };
  donor?: string;
  statuses?: Array<number>;
  statistics: {
    numAgreements: number;
    sumAgreements: number;
    avgAgreement: number;
  };
}

export interface IAvtaleGiroDonation {
  chargeID: string;
  agreementID: string;
  status: string;
  amountNOK: number;
  KID: string;
  dueDate: string;
  timestamp: string;
}

export interface IAvtaleGiroDonationFilter {
  sum: {
    from: number;
    to: number;
  };
  paymentDate: {
    from: number;
    to: number;
  };
  kid?: string;
  statuses?: Array<number>;
  donor: string;
}

export interface IAvtaleGiroValidationTableRow {
  date: number;
  expected: number;
  actual: number;
  diff: number;
}

export interface IAvtalegiroReport {
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
}

export interface IAvtaleGiroValidation {
  validationTable: Array<IAvtaleGiroValidationTableRow>;
  missing: Array<IAvtaleGiro>;
  recieved: Array<IDonation>;
  expected: Array<IAvtaleGiro>;
}

/** AutoGiro agreements */

export interface IAutoGiro {
  id: string;
  created: string;
  last_updated: string;
  active: number;
  amount: number;
  KID: string;
  donor: string;
  full_name: string;
  payment_date: number;
  cancelled: string;
  distribution: IDistribution;
  affiliatedDonations: Array<IDonation>;
}

export interface IAutoGiroFilter {
  amount: {
    from: number;
    to: number;
  };
  KID?: string;
  paymentDate?: {
    from: number;
    to: number;
  };
  created?: {
    from: Date | null;
    to: Date | null;
  };
  donor?: string;
  statuses?: Array<number>;
  statistics: {
    numAgreements: number;
    sumAgreements: number;
    avgAgreement: number;
  };
}

export interface IAutoGiroDonation {
  chargeID: string;
  agreementID: string;
  status: string;
  amountNOK: number;
  KID: string;
  dueDate: string;
  timestamp: string;
}

export interface IAutoGiroDonationFilter {
  sum: {
    from: number;
    to: number;
  };
  paymentDate: {
    from: number;
    to: number;
  };
  kid?: string;
  statuses?: Array<number>;
  donor: string;
}

export interface IAutoGiroValidationTableRow {
  date: number;
  expected: number;
  actual: number;
  diff: number;
}

export interface IAvtalegiroReport {
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
}

export interface IAutoGiroValidation {
  validationTable: Array<IAutoGiroValidationTableRow>;
  missing: Array<IAutoGiro>;
  recieved: Array<IDonation>;
  expected: Array<IAutoGiro>;
}

export type AutoGiroMandateStatus = "DRAFTED" | "NEW" | "PENDING" | "ACTIVE" | "STOPPED";

export interface IAutoGiroMandate {
  ID: number;
  status: AutoGiroMandateStatus;
  KID: string;
  bank_account: string;
  special_information: string;
  name_and_address: string;
  postal_code: string;
  postal_label: string;
  created: string;
  last_updated: string;
}

export interface IAutoGiroMandateFilter {
  KID?: string;
  statuses?: Array<AutoGiroMandateStatus>;
  donor?: string;
}

/** Referrals */

export interface IReferralAnswer {
  id: number;
  typeId: number;
  donorId: number;
  answer: string;
  timestamp: DateTime;
  session: string;
  active: boolean;
}

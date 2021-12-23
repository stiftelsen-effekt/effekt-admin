import { DateTime } from 'luxon';
import Decimal from 'decimal.js';

export interface IDonor {
  id: number;
  name: string;
  email: string;
  registered: DateTime;
  ssn: string;
}

export interface IOrganization {
  id: number;
  name: string;
  abbriv: string;
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
  method: string;
  timestamp: Date;
  KID?: string;
  distribution?: Array<IDistributionShare>;
  metaOwnerID?: number;
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
  paymentMethodIDs: Array<number>;
  KID?: string;
  donor?: string;
}

export interface IHistogramBucket {
  bucket: number;
  items: number;
  bar: number;
}

/** Distribution */

export interface IDistributionShare {
  organizationId: number;
  share: Decimal;
  value?: Decimal;
  abbriv: string;
}

export interface IDistribution {
  KID: string;
  donor: Partial<IDonor>;
  shares: Array<IDistributionShare>;
}

export interface IDistributionFilter {
  KID?: string;
  donor?: string;
}

export interface IDistributionSearchResultItem extends Partial<IDistribution> {
  sum: number;
  count: number;
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
  distribution: Array<IDistributionShare>;
}

export interface IVippsAgreementFilter {
  amount: {
    from: number;
    to: number;
  };
  KID?: string;
  donor?: string;
  statuses?: Array<string>;
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
    from: string;
    to: string;
  };
  KID?: string;
  statuses?: Array<string>;
  donor: string;
}

/** AvtaleGiro agreements */

export interface IAvtaleGiro {
    id: string,
    created: string,
    last_updated: string,
    active: number,
    amount: number,
    KID: string,
    donor: string,
    payment_date: number,
    cancelled: string,
    distribution: Array<IDistributionShare>,
}

export interface IAvtaleGiroFilter {
  amount: {
    from: number;
    to: number;
  };
  KID?: string;
  donor?: string;
  statuses?: Array<string>;
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
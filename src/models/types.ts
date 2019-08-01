import { DateTime } from "luxon";
import Decimal from "decimal.js";

export interface IDonor {
    id: number,
    name: string,
    email: string,
    registered: DateTime
}

export interface IOrganization {
    id: number,
    name: string,
    abbriv: string,
    shortDesc: string,
    standardShare: number,
    infoUrl: string
}

export interface IPaymentMethod {
    id: number,
    name: string,
    abbriviation: string,
    shortDescription: string,
    flatFee: number,
    percentageFee: number,
    lastUpdated: DateTime
}

export interface IDonation {
    id?: number,
    donorId?: number,
    paymentId: number,
    paymentExternalRef: string,
    sum: number,
    transactionCost: number,
    method: string,
    timestamp: Date,
    KID?: number,
    distribution?: Array<IDistribution>
}

export interface IDonationFilter {
    sum: {
        from: number,
        to: number
    },
    date: {
        from: Date|null,
        to: Date|null
    },
    paymentMethodIDs?: Array<number>,
    KID?: string
}

export interface IDistribution {
    organizationId: number,
    share: Decimal,
    value?: Decimal,
    abbriv: string
}

export interface IInvalidTransaction {
    reason: string,
    transaction: ITransaction
}

export interface ITransaction {
    KID: number,
    amount: number,
    date: Date,
    location: string,
    message: string,
    name: string,
    transactionID: string
}

export interface IAggregationItem {
    id: number,
    orgName: string,
    sum: Decimal
}
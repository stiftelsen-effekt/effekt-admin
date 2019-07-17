import { DateTime } from "luxon";

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
    id: number,
    donorId: number,
    paymentId: number,
    paymentExternalRef: string,
    sum: number,
    timestamp: DateTime,
    KID: number
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
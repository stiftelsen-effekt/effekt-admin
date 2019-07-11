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
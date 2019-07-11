import Decimal from "decimal.js";

export interface IDistribution {
    organizationId: number,
    value: Decimal,
    abbriv: string
}

export enum DistributionType {
    PERCENT,
    ABSOLUTE
}

export enum KIDModuleMode {
    CREATE,
    READ
}
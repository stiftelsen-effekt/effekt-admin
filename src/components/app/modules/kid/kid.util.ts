import { IOrganization, IDistributionShare } from "../../../../models/types";
import Decimal from "decimal.js";

export const calculateDistributionSum = (distribution: Array<IDistributionShare>): Decimal => {
    let sum = new Decimal(0);
    distribution.forEach(dist => sum = sum.add(dist.share))
    return sum;
}

export const mapOrgToDist = (organizations: Array<IOrganization>): Array<IDistributionShare> => {
    return organizations.map(((org: IOrganization):IDistributionShare => ({
        abbriv: org.abbriv,
        organizationId: org.id,
        //TODO: Handle donation amount
        share: new Decimal(org.standardShare)
    })))
}
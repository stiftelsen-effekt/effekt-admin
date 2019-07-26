import { IPaymentMethod, IDonor, IDonation } from "../../../../models/types";
import { IDistribution } from "../kid/kid.models";

import actionCreatorFactory from 'typescript-fsa';
 
const actionCreator = actionCreatorFactory();

export const fetchPaymentMethodsAction = actionCreator.async<undefined, Array<IPaymentMethod>, Error>('FETCH_PAYMENT_METHODS');

export interface ICreateDistributionParams {
    donor: IDonor,
    distribution: Array<IDistribution>
}

interface ICreateDistributionAndInsertDonationParams {
    distribution: ICreateDistributionParams,
    donation: IDonation
}

export const createDistribitionAndInsertDonationAction = actionCreator.async<ICreateDistributionAndInsertDonationParams, {}, Error>('CREATE_DISTRIBUTION_AND_INSERT_DONATION');
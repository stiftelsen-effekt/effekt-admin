import { IPaymentMethod, IDonation, IDistribution } from "../../models/types";

import actionCreatorFactory from "typescript-fsa";

const actionCreator = actionCreatorFactory();

export const fetchPaymentMethodsAction = actionCreator.async<
  undefined,
  Array<IPaymentMethod>,
  Error
>("FETCH_PAYMENT_METHODS");

export interface ICreateDistributionParams {
  distribution: Partial<IDistribution>;
}

export interface ICreateDonationParams extends IDonation {
  receipt: boolean;
}

export interface IInsertDonationParams {
  donation: ICreateDonationParams;
  token: string;
}

export interface ICreateDistributionAndInsertDonationParams {
  distribution: ICreateDistributionParams;
  donation: ICreateDonationParams;
  token: string;
}

export const createDistribitionAndInsertDonationAction = actionCreator.async<
  ICreateDistributionAndInsertDonationParams,
  {},
  Error
>("CREATE_DISTRIBUTION_AND_INSERT_DONATION");
export const insertDonationAction = actionCreator.async<IInsertDonationParams, {}, Error>(
  "INSERT_DONATION",
);

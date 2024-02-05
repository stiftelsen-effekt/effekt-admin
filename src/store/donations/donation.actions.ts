import actionCreatorFactory from "typescript-fsa";
import { ITransactionCostsReport } from "../../models/state";
import { IDistribution, IDonation, IHistogramBucket } from "../../models/types";

const actionCreator = actionCreatorFactory();

export interface IFetchDonationActionParams {
  id: number;
  token: string;
}
export interface IFetchDonationsHistogramActionParams {
  token: string;
}

export interface IFetchTransactionCostsReportActionParams {
  token: string;
}

export const fetchDonationAction = actionCreator.async<
  IFetchDonationActionParams,
  IDonation & { distribution: IDistribution },
  Error
>("FETCH_DONATION");
export const fetchHistogramAction = actionCreator.async<
  IFetchDonationsHistogramActionParams,
  Array<IHistogramBucket>,
  Error
>("FETCH_HISTOGRAM");

export const CLEAR_CURRENT_DONATION = "CLEAR_CURRENT_DONATION";
export const clearCurrentDonation = () => ({ type: CLEAR_CURRENT_DONATION });

export const fetchTransactionCostsReportAction = actionCreator.async<
  IFetchTransactionCostsReportActionParams,
  ITransactionCostsReport,
  Error
>("FETCH_TRANSACTION_COSTS_REPORT");

import actionCreatorFactory from "typescript-fsa";
import { IDonation, IPagination } from "../../models/types";

export const SET_DONATIONS_PAGINATION = "SET_DONATIONS_PAGINATION";

const actionCreator = actionCreatorFactory();

export interface IFetchDonationsActionParams {
  token: string;
}
export interface IDeleteDonationActionParams {
  id: number;
  token: string;
}

export interface IExportDonationsActionParams {
  token: string;
}

interface IFetchDonationsResult {
  rows: Array<IDonation>;
  statistics: {
    numDonations: number;
    sumDonations: string;
    avgDonation: string;
  };
  pages: number;
}

export const fetchDonationsAction = actionCreator.async<
  IFetchDonationsActionParams,
  IFetchDonationsResult,
  Error
>("FETCH_DONATIONS");
export const setDonationsPagination = (pagination: IPagination) => {
  return {
    type: SET_DONATIONS_PAGINATION,
    payload: pagination,
  };
};

export const deleteDonationAction = actionCreator.async<
  IDeleteDonationActionParams,
  IFetchDonationsResult,
  Error
>("DELETE_DONATION");

export const exportDonationsAction = actionCreator.async<IExportDonationsActionParams, void, Error>(
  "EXPORT_DONATIONS",
);

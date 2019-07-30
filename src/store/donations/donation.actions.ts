import actionCreatorFactory from "typescript-fsa";
import { IDonation } from "../../models/types";

const actionCreator = actionCreatorFactory();

export interface IFetchDonationActionParams { id: number }
export const fetchDonationAction = actionCreator.async<IFetchDonationActionParams, IDonation, Error>('FETCH_DONATION');

export const CLEAR_CURRENT_DONATION = "CLEAR_CURRENT_DONATION"
export const clearCurrentDonation = () => ({ type: CLEAR_CURRENT_DONATION })
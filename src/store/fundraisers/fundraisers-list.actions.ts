import actionCreatorFactory from "typescript-fsa";
import { IPagination, IFundraiser } from "../../models/types";

const actionCreator = actionCreatorFactory("FUNDRAISERS_LIST");

export const fetchFundraisersAction = actionCreator.async<
  { token: string },
  {
    fundraisers: Array<IFundraiser>;
    pages: number;
    statistics?: {
      totalCount: number;
      totalSum?: number;
      avgDonation?: number;
    };
  },
  Error
>("FETCH");

export const setFundraisersPagination = actionCreator<IPagination>("SET_PAGINATION");

export interface ICreateFundraiserActionParams {
  token: string;
  donorId: number;
}

export interface IFundraiserWithSecret extends IFundraiser {
  secret: string | null;
}

export const createFundraiserAction = actionCreator.async<
  ICreateFundraiserActionParams,
  IFundraiserWithSecret,
  Error
>("CREATE_FUNDRAISER");

export const fetchFundraiserSecretAction = actionCreator.async<
  { token: string; fundraiserId: number },
  { secret: string | null },
  Error
>("FETCH_FUNDRAISER_SECRET");

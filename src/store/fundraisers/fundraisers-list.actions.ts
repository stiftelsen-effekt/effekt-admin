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

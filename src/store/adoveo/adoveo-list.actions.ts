import actionCreatorFactory from "typescript-fsa";
import { IPagination, IAdoveo } from "../../models/types";

const actionCreator = actionCreatorFactory("ADOVEO_LIST");

export const fetchAdoveoAction = actionCreator.async<
  { token: string },
  {
    fundraisers: Array<IAdoveo>;
    pages: number;
    statistics?: {
      totalCount: number;
      totalSum?: number;
      avgDonation?: number;
    };
  },
  Error
>("FETCH");

export const setAdoveoPagination = actionCreator<IPagination>("SET_PAGINATION");

export interface ICreateAdoveoActionParams {
  token: string;
  name: string;
  donorId?: number;
  adoveoId?: number;
  orgShares?: { orgId: number; share: number; standardSplit: boolean }[];
  useStandardSplit?: boolean;
}

export const createAdoveoAction = actionCreator.async<ICreateAdoveoActionParams, IAdoveo, Error>(
  "CREATE",
);

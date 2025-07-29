import { actionCreatorFactory } from "typescript-fsa";
import { IDonor } from "../../models/types";

const actionCreator = actionCreatorFactory("DONORS_LIST");

export interface IFetchDonorsActionParams {
  token: string;
}

export interface IExportDonorsActionParams {
  token: string;
}

export const fetchDonorsAction = actionCreator.async<
  IFetchDonorsActionParams,
  {
    rows: Array<IDonor>;
    pages: number;
    statistics: { totalDonors: number; totalDonationSum: number; totalDonationCount: number };
  },
  Error
>("FETCH_DONORS");

export const setDonorsPagination = actionCreator<{
  page: number;
  limit: number;
  sort?: {
    id: string;
    desc: boolean;
  };
}>("SET_DONORS_PAGINATION");

export const exportDonorsAction = actionCreator.async<IExportDonorsActionParams, void, Error>(
  "EXPORT_DONORS",
);

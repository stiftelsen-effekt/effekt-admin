import actionCreatorFactory from "typescript-fsa";

const actionCreator = actionCreatorFactory("ADOVEO_FILTER");

export const setAdoveoFilterName = actionCreator<string>("SET_NAME");
export const setAdoveoFilterFundraiserId = actionCreator<string>("SET_FUNDRAISER_ID");
export const setAdoveoFilterAdoveoId = actionCreator<string>("SET_ADOVEO_ID");
export const setAdoveoFilterDonorName = actionCreator<string>("SET_DONOR_NAME");

export const setAdoveoFilterCreatedDateRange = actionCreator<{
  from: Date | null;
  to: Date | null;
}>("SET_CREATED_DATE_RANGE");

export const setAdoveoFilterDonationCountRange = actionCreator<{
  from: number;
  to: number;
}>("SET_DONATION_COUNT_RANGE");

export const setAdoveoFilterDonationSumRange = actionCreator<{
  from: number;
  to: number;
}>("SET_DONATION_SUM_RANGE");

export const setAdoveoFilterOrganizationIDs = actionCreator<Array<number> | undefined>(
  "SET_ORGANIZATION_IDS",
);

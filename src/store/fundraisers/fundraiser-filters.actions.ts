import actionCreatorFactory from "typescript-fsa";

const actionCreator = actionCreatorFactory("FUNDRAISER_FILTER");

export const setFundraiserFilterRegistrationDateRange = actionCreator<{
  from: Date | null;
  to: Date | null;
}>("SET_REGISTRATION_DATE_RANGE");

export const setFundraiserFilterDonationCountRange = actionCreator<{
  from: number;
  to: number;
}>("SET_DONATION_COUNT_RANGE");

export const setFundraiserFilterDonationSumRange = actionCreator<{
  from: number;
  to: number;
}>("SET_DONATION_SUM_RANGE");

export const setFundraiserFilterDonor = actionCreator<string>("SET_DONOR");
export const setFundraiserFilterId = actionCreator<string>("SET_FUNDRAISER_ID");
export const setFundraiserFilterOrganizationIDs = actionCreator<Array<number> | undefined>(
  "SET_ORGANIZATION_IDS",
);

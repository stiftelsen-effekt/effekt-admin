import { actionCreatorFactory } from "typescript-fsa";
import { DateTime } from "luxon";

const actionCreator = actionCreatorFactory("DONOR_FILTERS");

export const setDonorFilterName = actionCreator<string>("SET_DONOR_FILTER_NAME");
export const setDonorFilterEmail = actionCreator<string>("SET_DONOR_FILTER_EMAIL");
export const setDonorFilterId = actionCreator<number | null>("SET_DONOR_FILTER_ID");
export const setDonorFilterDateRange = actionCreator<{
  from: DateTime | null;
  to: DateTime | null;
}>("SET_DONOR_FILTER_DATE_RANGE");

export const setDonorFilterDonationsDateRange = actionCreator<{
  from: DateTime | null;
  to: DateTime | null;
}>("SET_DONOR_FILTER_DONATIONS_DATE_RANGE");

export const setDonorFilterLastDonationDate = actionCreator<{
  from: DateTime | null;
  to: DateTime | null;
}>("SET_DONOR_FILTER_LAST_DONATION_DATE");

export const setDonorFilterDonationsCount = actionCreator<{
  from: number | null;
  to: number | null;
}>("SET_DONOR_FILTER_DONATIONS_COUNT");

export const setDonorFilterDonationsSum = actionCreator<{
  from: number | null;
  to: number | null;
}>("SET_DONOR_FILTER_DONATIONS_SUM");

export const setDonorFilterReferralTypeIDs = actionCreator<Array<number> | undefined>(
  "SET_DONOR_FILTER_REFERRAL_TYPE_IDS",
);

export const setDonorFilterRecipientOrgIDs = actionCreator<Array<number> | undefined>(
  "SET_DONOR_FILTER_RECIPIENT_ORG_IDS",
);

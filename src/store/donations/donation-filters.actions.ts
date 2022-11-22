export const SET_DONATION_FILTER_SUM_RANGE = 'SET_DONATION_FILTER_SUM_RANGE';
export const SET_DONATION_FILTER_DATE_RANGE = 'SET_DONATION_FILTER_DATE_RANGE';
export const SET_DONATION_FILTER_DONOR = 'SET_DONATION_FILTER_DONOR';
export const SET_DONATION_FILTER_DONATION_ID = 'SET_DONATION_FILTER_DONATION_ID';
export const SET_DONATION_FILTER_KID = 'SET_DONATION_FILTER_KID';
export const SET_DONATION_FILTER_PAYMENT_METHOD_IDS = 'SET_DONATION_FILTER_PAYMENT_METHOD_IDS';
export const SET_DONATION_FILTER_PAYMENT_ORGANIZATION_IDS = 'SET_DONATION_FILTER_ORGANIZATION_IDS';

export interface IActionRangeParams<T> {
  from: T;
  to: T;
}

export interface IFilterAction<T> {
  type: string;
  payload: T;
}

export const setDonationFilterSumRange = (
  from: number,
  to: number
): IFilterAction<IActionRangeParams<number>> => {
  return {
    type: SET_DONATION_FILTER_SUM_RANGE,
    payload: {
      from,
      to,
    },
  };
};

export const setDonationFilterDateRange = (
  from: Date | null,
  to: Date | null
): IFilterAction<IActionRangeParams<Date | null>> => {
  return {
    type: SET_DONATION_FILTER_DATE_RANGE,
    payload: {
      from,
      to,
    },
  };
};

export const setDonationFilterKid = (KID: string): IFilterAction<string> => {
  return {
    type: SET_DONATION_FILTER_KID,
    payload: KID,
  };
};

export const setDonationFilterDonor = (donor: string): IFilterAction<string> => {
  return {
    type: SET_DONATION_FILTER_DONOR,
    payload: donor,
  };
};

export const setDonationFilterDonationId = (donationId: string): IFilterAction<string> => {
  return {
    type: SET_DONATION_FILTER_DONATION_ID,
    payload: donationId,
  };
};

export const setDonationFilterPaymentMethodIDs = (
  IDs: Array<number> | undefined
): IFilterAction<Array<number> | undefined> => {
  return {
    type: SET_DONATION_FILTER_PAYMENT_METHOD_IDS,
    payload: IDs,
  };
};

export const setDonationFilterOrganizationIDs = (
  IDs: Array<number> | undefined
): IFilterAction<Array<number> | undefined> => {
  return {
    type: SET_DONATION_FILTER_PAYMENT_ORGANIZATION_IDS,
    payload: IDs,
  };
};
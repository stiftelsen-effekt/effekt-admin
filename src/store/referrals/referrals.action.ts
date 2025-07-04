import { IReferralType } from "../../models/types";
import actionCreatorFactory from "typescript-fsa";

const actionCreator = actionCreatorFactory();

export const fetchActiveRefferalsAction = actionCreator.async<
  undefined,
  Array<IReferralType>,
  Error
>("FETCH_ACTIVE_REFERRALS");

export const fetchAllRefferalsAction = actionCreator.async<undefined, Array<IReferralType>, Error>(
  "FETCH_ALL_REFERRALS",
);

export interface ICreateReferralTypeActionParams {
  token: string;
  referral: { name: string; ordering: number };
}
export const createReferralTypeAction = actionCreator.async<
  ICreateReferralTypeActionParams,
  IReferralType,
  Error
>("CREATE_REFERRAL_TYPE");

export interface IUpdateReferralTypeActionParams {
  token: string;
  referral: { id: number; name?: string; ordering?: number; is_active?: boolean };
}
export const updateReferralTypeAction = actionCreator.async<
  IUpdateReferralTypeActionParams,
  IReferralType,
  Error
>("UPDATE_REFERRAL_TYPE");

export interface IToggleReferralTypeActiveActionParams {
  token: string;
  referralId: number;
}
export const toggleReferralTypeActiveAction = actionCreator.async<
  IToggleReferralTypeActiveActionParams,
  IReferralType,
  Error
>("TOGGLE_REFERRAL_TYPE_ACTIVE");

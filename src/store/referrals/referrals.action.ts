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

import actionCreatorFactory from "typescript-fsa";
import { IDonation } from "../../../../models/types";

const actionCreator = actionCreatorFactory();

export const fetchDonationAction = actionCreator.async<{id: number}, IDonation, Error>('FETCH_DONATION');
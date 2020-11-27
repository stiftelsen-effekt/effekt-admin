import actionCreatorFactory from "typescript-fsa";
import { IDonor } from "../../../types";

const actionCreator = actionCreatorFactory();

export const createDonorAction = actionCreator.async<Partial<IDonor>, Boolean, Error>('CREATE_USER');
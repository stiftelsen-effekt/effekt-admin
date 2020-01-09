import actionCreatorFactory from "typescript-fsa";
import { IDonor } from "../../../../models/types";

const actionCreator = actionCreatorFactory();

export const createDonorAction = actionCreator.async<Partial<IDonor>, Boolean, Error>('CREATE_USER');
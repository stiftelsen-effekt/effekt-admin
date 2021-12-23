import { AnyAction } from "redux";
import { DonorPageState } from "../../models/state";

const initialState: DonorPageState = {
  
};

export const donorPageReducer = (
  state: DonorPageState = initialState,
  action: AnyAction
): DonorPageState => { 
  return state;
}
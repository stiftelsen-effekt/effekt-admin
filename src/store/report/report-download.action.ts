import actionCreatorFactory from "typescript-fsa";
const actionCreator = actionCreatorFactory();

export interface IFetchAutogiroShipmentsActionParams {
  token: string;
}

export const fetchAutogiroShipmentsAction = actionCreator.async<
  IFetchAutogiroShipmentsActionParams,
  { ID: number; sent_date: string }[],
  Error
>("FETCH_AUTOGIRO_SHIPMENTS");

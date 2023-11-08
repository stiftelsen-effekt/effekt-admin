import actionCreatorFactory from "typescript-fsa";
import { ReportProcessingState } from "../../models/state";
const actionCreator = actionCreatorFactory();

export enum ReportTypes {
  VIPPS,
  PAYPAL,
  OCR,
  BANK,
  FACEBOOK,
  AUTOGIRO,
}

export interface IUploadReportActionParams {
  type: ReportTypes;
  report: File | null;
  metaOwnerID: Number;
  token: string;
}

export const uploadReportAction = actionCreator.async<
  IUploadReportActionParams,
  ReportProcessingState,
  Error
>("REPORT_UPLOAD");

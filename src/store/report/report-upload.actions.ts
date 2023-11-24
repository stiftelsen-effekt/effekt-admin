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
  ADOVEO_FUNDRAISER,
  ADOVEO_GIFTCARDS,
}

export interface IUploadReportActionParams {
  type: ReportTypes;
  resourceId?: string;
  report: File | null;
  metaOwnerID: Number;
  token: string;
}

export interface AdoveoReportProcessingResult {
  addedTransactions: number;
  updatedTransactions: number;
  addedDonations: number;
  failedTransactions: Array<any>;
}

export interface AutoGiroProcessingResult {
  newMandates: number;
}

export const uploadReportAction = actionCreator.async<
  IUploadReportActionParams,
  ReportProcessingState | AutoGiroProcessingResult | AdoveoReportProcessingResult,
  Error
>("REPORT_UPLOAD");

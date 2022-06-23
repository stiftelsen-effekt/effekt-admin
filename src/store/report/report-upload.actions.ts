import actionCreatorFactory from 'typescript-fsa';
import { ReportProcessingState } from '../../models/state';
const actionCreator = actionCreatorFactory();

export enum ReportTypes {
  VIPPS,
  PAYPAL,
  OCR,
  BANK,
}

export interface IUploadReportActionParams { type: ReportTypes; report: File; metaOwnerID: Number, token: string }

export const uploadReportAction = actionCreator.async<
  IUploadReportActionParams,
  ReportProcessingState,
  Error
>('REPORT_UPLOAD');

import actionCreatorFactory from 'typescript-fsa';
import { ReportProcessingState } from '../state';

const actionCreator = actionCreatorFactory();

export enum ReportTypes {
  VIPPS,
  PAYPAL,
  OCR,
  BANK,
}

export const uploadReportAction = actionCreator.async<
  { type: ReportTypes; report: File; metaOwnerID: number },
  ReportProcessingState,
  Error
>('REPORT_UPLOAD');

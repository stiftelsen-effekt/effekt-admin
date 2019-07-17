import actionCreatorFactory from 'typescript-fsa';
import { ReportProcessingState } from '../../../../models/state';
 const actionCreator = actionCreatorFactory();

export enum ReportTypes {
    VIPPS,
    PAYPAL,
    BANK
}

export const uploadReportAction = actionCreator.async<{type: ReportTypes, report: File}, ReportProcessingState, Error>('REPORT_UPLOAD');
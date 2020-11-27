import actionCreatorFactory from 'typescript-fsa';
import { ReportProcessingState } from '../../store/state';
const actionCreator = actionCreatorFactory();

export enum ReportTypes {
    VIPPS,
    PAYPAL,
    OCR,
    BANK
}

export const uploadReportAction = actionCreator.async<{type: ReportTypes, report: File, metaOwnerID: Number}, ReportProcessingState, Error>('REPORT_UPLOAD');
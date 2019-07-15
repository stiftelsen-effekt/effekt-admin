import actionCreatorFactory from 'typescript-fsa';
 const actionCreator = actionCreatorFactory();

export enum ReportTypes {
    VIPPS,
    PAYPAL,
    BANK
}

export const uploadReportAction = actionCreator.async<{type: ReportTypes, file: File}, {}, {code: number}>('REPORT_UPLOAD');
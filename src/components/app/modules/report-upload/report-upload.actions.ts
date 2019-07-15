import actionCreatorFactory from 'typescript-fsa';
 const actionCreator = actionCreatorFactory();

export enum ReportTypes {
    VIPPS,
    PAYPAL,
    BANK
}

export const uploadReportAction = actionCreator.async<{file: File, type: ReportTypes}, {}, {code: number}>('REPORT_UPLOAD');
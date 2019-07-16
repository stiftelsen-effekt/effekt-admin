import { ReportProcessingState } from "../../../../models/state";
import { AnyAction } from "redux";
import { isType } from "typescript-fsa";
import { uploadReportAction } from "./report-upload.actions";

const initialState: ReportProcessingState = {
    failures: null
}

export const reportProcessingReducer = (state: ReportProcessingState = initialState, action: AnyAction): ReportProcessingState => {
    if (isType(action, uploadReportAction.failed)) {
        console.log(action.payload.error.message)
    }
    else if (isType(action, uploadReportAction.done)) {
        return {
            ...state,
            failures: action.payload
        }
    }

    return state
}
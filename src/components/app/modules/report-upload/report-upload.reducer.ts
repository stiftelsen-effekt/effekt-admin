import { ReportProcessingState } from "../../../../models/state";
import { AnyAction } from "redux";
import { isType } from "typescript-fsa";
import { uploadReportAction } from "./report-upload.actions";
import { toast } from "react-toastify";

const initialState: ReportProcessingState = {
    failures: null
}

export const reportProcessingReducer = (state: ReportProcessingState = initialState, action: AnyAction): ReportProcessingState => {
    if (isType(action, uploadReportAction.failed)) {
        toast.error("Failed to process report")
    }
    else if (isType(action, uploadReportAction.done)) {
        return {
            ...state,
            failures: action.payload
        }
    }

    return state
}
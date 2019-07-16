import { ReportProcessingState } from "../../../../models/state";
import { AnyAction } from "redux";
import { isType } from "typescript-fsa";
import { uploadReportAction } from "../../modules/report-upload/report-upload.actions";
import { toast } from "react-toastify";
import { POP_INVALID_TRANSACTION } from "./process.actions";

const defaultState: ReportProcessingState = {
    valid: 0,
    invalid: 0,
    invalidTransactions: []
}

export const reportProcessingReducer = (state: ReportProcessingState = defaultState, action: AnyAction): ReportProcessingState => {
    if (isType(action, uploadReportAction.failed)) {
        toast.error("Failed to process report")
        console.log(action.payload.error.message)
    }
    else if (isType(action, uploadReportAction.done)) {
        return {
            ...action.payload.result,
            invalidTransactions: action.payload.result.invalidTransactions.map((invalid) => {
                return {
                    reason: invalid.reason,
                    transaction: {
                        ...invalid.transaction,
                        date: new Date(invalid.transaction.date)
                    }
                }
            })
        }
    }
    else if (action.type === POP_INVALID_TRANSACTION) {
        let transactions = state.invalidTransactions
        transactions.pop()
        return {
            valid: state.valid++,
            invalid: state.invalid--,
            invalidTransactions: transactions
        }
    }

    return state
}
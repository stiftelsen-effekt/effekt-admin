import { ReportProcessingState } from "../../../../models/state";
import { AnyAction } from "redux";
import { isType } from "typescript-fsa";
import { uploadReportAction } from "../../modules/report-upload/report-upload.actions";
import { toast } from "react-toastify";
import { POP_INVALID_TRANSACTION } from "./process.actions";
import { createDistribitionAndInsertDonationAction } from "../../modules/single-donation/single-donation.actions";

const defaultState: ReportProcessingState = {
    valid: 0,
    invalid: 0,
    invalidTransactions: []
}

const toastIfDone = (transactionsLeft: number) => transactionsLeft === 0 && toast.success("🎉 Good job, you did them all!")

export const reportProcessingReducer = (state: ReportProcessingState = defaultState, action: AnyAction): ReportProcessingState => {
    if (isType(action, uploadReportAction.failed)) {
        toast.error("Failed to process report")
        console.log(action.payload.error.message)
    }
    else if (isType(action, uploadReportAction.done)) {
        if (action.payload.result.invalid > 0) {
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
        } else {
            toast.success(`🔥 inserted ${action.payload.result.valid} donations`)
            return state
        }
    }
    else if (action.type === POP_INVALID_TRANSACTION) {
        let transactions = state.invalidTransactions
        transactions.pop()

        toastIfDone(transactions.length)
        return {
            valid: ++state.valid,
            invalid: --state.invalid,
            invalidTransactions: transactions
        }
    }
    else if (isType(action, createDistribitionAndInsertDonationAction.done)) {
        if (state.invalidTransactions.length === 0) return state
        let externalRef = action.payload.params.donation.externalRef

        let transactions = state.invalidTransactions.filter(invalid => invalid.transaction.transactionID !== externalRef)

        if (transactions.length === state.invalidTransactions.length) return state

        toastIfDone(transactions.length)
        return {
            valid: ++state.valid,
            invalid: --state.invalid,
            invalidTransactions: transactions
        }
    }

    return state
}
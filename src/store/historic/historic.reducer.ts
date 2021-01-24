import { RegisterHistoricDonationsState } from "../../models/state";
import { AnyAction } from "redux";
import { isType } from "typescript-fsa";
import { registerHistoricDonationsAction } from "./historic.actions";
import { toast } from "react-toastify";
import { toastError } from '../../util/toasthelper';
import { IHistoricDonation } from "../../models/types";

const defaultState: RegisterHistoricDonationsState = {
    inProgress: false,
    csvFile: undefined,
    registeredDonations: Array<IHistoricDonation>(),
    failedDonations: Array<IHistoricDonation>(),
    metaOwnerID: 0
}

const toastIfDone = (transactionsLeft: number) => transactionsLeft === 0 && toast.success("🎉 Good job, you did them all!")

export const registerHistoricReducer = (state: RegisterHistoricDonationsState = defaultState, action: AnyAction): RegisterHistoricDonationsState => {
    if (isType(action, registerHistoricDonationsAction.started)) {
        return {
            ...state,
            inProgress: true,
            csvFile: action.payload.csvFile,
            metaOwnerID: action.payload.metaOwnerID
        }
    }
    if (isType(action, registerHistoricDonationsAction.failed)) {
        toastError("Failed to process historic donations", action.payload.error.message)
        return {
            ...state,
            inProgress: false
        }
    }
    if (isType(action, registerHistoricDonationsAction.done)) {
        if (action.payload.result.failedDonations.length > 0) {
            toast.success(`🔥 inserted ${action.payload.result.registeredDonations.length}, ignored ${action.payload.result.failedDonations.length}`)
        } else {
            toast.success(`🔥 inserted ${action.payload.result.registeredDonations.length} donations`)
        }
        return {
            ...state,
            inProgress: false,
            registeredDonations: action.payload.result.registeredDonations,
            failedDonations: action.payload.result.failedDonations
        }
    }

    return state
}
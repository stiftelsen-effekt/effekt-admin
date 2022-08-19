import Decimal from "decimal.js";
import { DateTime } from "luxon";
import { AnyAction } from "redux";
import { isType } from "typescript-fsa";
import { DonorPageState } from "../../models/state";
import { getDonorAction, getDonorAvtalegiroAgreementsAction, getDonorDistributionsAction, getDonorDonationsAction, getDonorVippsAgreementsAction, getDonorYearlyAggregatesAction, updateDonorDataAction, getDonorReferralAnswersAction } from "./donor-page.actions";

const initialState: DonorPageState = {
  pendingUpdates: 0
};

export const donorPageReducer = (
  state: DonorPageState = initialState,
  action: AnyAction
): DonorPageState => {
  if (isType(action, getDonorAction.done)) {
    return {
      ...state,
      donor: {
        ...action.payload.result,
        registered: DateTime.fromISO(action.payload.result.registered.toString(), { setZone: true })
      }
    }
  } else if (isType(action, getDonorAction.started)) {
    return {
      ...state,
      donor: undefined
    }
  }

  if (isType(action, getDonorDonationsAction.done)) {
    return {
      ...state,
      donations: action.payload.result
    }
  } else if (isType(action, getDonorDonationsAction.started)) {
    return {
      ...state,
      donations: undefined
    }
  }

  if (isType(action, getDonorDistributionsAction.done)) {
    return {
      ...state,
      distributions: action.payload.result
    }
  } else if (isType(action, getDonorDistributionsAction.started)) {
    return {
      ...state,
      distributions: undefined
    }
  }

  if (isType(action, getDonorAvtalegiroAgreementsAction.done)) {
    return {
      ...state,
      avtalegiroAgreements: action.payload.result
    }
  } else if (isType(action, getDonorAvtalegiroAgreementsAction.started)) {
    return {
      ...state,
      avtalegiroAgreements: undefined
    }
  }

  if (isType(action, getDonorVippsAgreementsAction.done)) {
    return {
      ...state,
      vippsAgreements: action.payload.result
    }
  } else if (isType(action, getDonorVippsAgreementsAction.started)) {
    return {
      ...state,
      vippsAgreements: undefined
    }
  }

  if (isType(action, getDonorYearlyAggregatesAction.done)) {
    return {
      ...state,
      stats: {
        ...state.stats,
        sumYearlyAggregates: action.payload.result.map((row) => ({
          ...row,
          value: new Decimal(row.value as Decimal)
        }))
      }
    }
  } else if (isType(action, getDonorYearlyAggregatesAction.started)) {
    return {
      ...state,
      stats: {
        ...state.stats,
        sumYearlyAggregates: undefined
      }
    }
  } else if (isType(action, getDonorReferralAnswersAction.done)) {
    return {
      ...state,
      referralAnswers: action.payload.result
    }
  } else if (isType(action, getDonorReferralAnswersAction.started)) {
    return {
      ...state,
      referralAnswers: undefined
    }
  } else if (isType(action, updateDonorDataAction.started)) {
    state.pendingUpdates += 1;
    delete state.updateError;
  } else if (isType(action, updateDonorDataAction.done)) {
    state.pendingUpdates -= 1;
    delete state.updateError;
  } else if (isType(action, updateDonorDataAction.failed)) {
    state.pendingUpdates -= 1;
    return {
      ...state,
      updateError: {message: action.payload.error.message, timestamp: +new Date()}
    }
  }

  return state;
}

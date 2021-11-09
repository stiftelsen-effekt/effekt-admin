import { AppState } from './models/state';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import watchAll from './root.saga';
import { authReducer } from './store/authentication/auth.reducer';
import { donorSelectorReducer } from './store/donors/donor-selection.reducer';
import { organizationsReducer } from './store/organizations/organizations.reducer';
import { singleDonationReducer } from './store/single-donation/single-donation.reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reportProcessingReducer } from './store/process/process.reducer';
import { CreateDonorReducer } from './store/donors/create-donor.reducer';
import { donationsReducer } from './store/donations/donations.reducer';
import { graphingReducer } from './store/graphing/graphing.reducer';
import { distributionsReducer } from './store/distributions/distributions.reducer';
import { ownersReducer } from './store/owners/owners.reducer';
import { receiptReducer } from './store/donations/receipt.reducer';
import { loggingReducer } from './store/logs/logs.reducer';
import { vippsAgreementChargeReducer, vippsAgreementReducer } from './store/vipps/vipps.reducer';
import { avtaleGiroReducer } from './store/avtalegiro/avtalegiro.reducer';

const rootReducer = combineReducers<AppState>({
  auth: authReducer,
  graphing: graphingReducer,
  donorSelector: donorSelectorReducer,
  donorCreation: CreateDonorReducer,
  organizations: organizationsReducer,
  singleDonation: singleDonationReducer,
  reportProcessing: reportProcessingReducer,
  donations: donationsReducer,
  distributions: distributionsReducer,
  dataOwner: ownersReducer,
  receipt: receiptReducer,
  logs: loggingReducer,
  vippsAgreements: vippsAgreementReducer,
  vippsAgreementCharges: vippsAgreementChargeReducer,
  avtaleGiroAgreements: avtaleGiroReducer,
});

const sagaMiddleware = createSagaMiddleware();
const Store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(watchAll);

export default Store;

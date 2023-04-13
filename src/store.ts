import { AppState } from './models/state';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import watchAll from './root.saga';
import { donorSelectorReducer } from './store/donors/donor-selection.reducer';
import { organizationsReducer } from './store/organizations/organizations.reducer';
import { singleDonationReducer } from './store/single-donation/single-donation.reducer';
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
import { donorPageReducer } from './store/donors/donor-page.reducer';
import { composeWithDevTools } from '@redux-devtools/extension';
import { createTaxUnitReducer, taxUnitsReducer } from './store/taxunits.ts/taxunits.reducer';

const rootReducer = combineReducers<AppState>({
  graphing: graphingReducer,
  donorSelector: donorSelectorReducer,
  donorCreation: CreateDonorReducer,
  donorPage: donorPageReducer,
  organizations: organizationsReducer,
  singleDonation: singleDonationReducer,
  reportProcessing: reportProcessingReducer,
  donations: donationsReducer,
  distributions: distributionsReducer,
  taxUnits: taxUnitsReducer,
  taxUnitCreation: createTaxUnitReducer,
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

import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { AppState } from './state';
import watchAll from './root.saga';
import { authReducer } from './auth/auth.reducer';
import { organizationsReducer } from './organizations/organizations.reducer';
import { singleDonationReducer } from './donations/donation/single/single-donation.reducer';
import { reportProcessingReducer } from './donations/process/process.reducer';
import { donationsReducer } from './donations/donations.reducer';
import { distributionsReducer } from './distributions/distributions.reducer';
import { ownersReducer } from './owners/owners.reducer';
import { graphingReducer } from './graphing/graphing.reducer';
import { donorSelectorReducer } from './donor/select/donor-selection.reducer';
import { CreateDonorReducer } from './donor/create/create-donor.reducer';
import { recieptReducer } from './reciept/reciept.reducer';

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
  reciept: recieptReducer,
});

const sagaMiddleware = createSagaMiddleware();
const Store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
);
sagaMiddleware.run(watchAll);

export default Store;

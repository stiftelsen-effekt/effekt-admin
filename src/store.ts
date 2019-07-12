import { AppState } from './models/state'
import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga'
import watchAll from './root.saga';
import { authReducer } from './authenticate/auth.reducer';
import { homeReducer } from './components/app/pages/home/home.reducer';
import { donorSelectorReducer } from './components/app/modules/donors/donor-selection.reducer';
import { organizationsReducer } from './store/organizations/organizations.reducer';
import { singleDonationReducer } from './components/app/modules/single-donation/single-donation.reducer';
import { composeWithDevTools } from 'redux-devtools-extension';

const rootReducer = combineReducers<AppState>({
    auth: authReducer,
    home: homeReducer,
    donorSelector: donorSelectorReducer,
    organizations: organizationsReducer,
    singleDonation: singleDonationReducer
})

const sagaMiddleware = createSagaMiddleware();
const Store = createStore(
    rootReducer, 
    composeWithDevTools(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(watchAll);

export default Store;
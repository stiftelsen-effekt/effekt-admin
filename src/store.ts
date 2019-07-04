import { AppState } from './models/state'
import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga'
import watchAll from './root.saga';
import { authReducer } from './authenticate/auth.reducer';
import { homeReducer } from './components/app/pages/home/home.reducer';
import { donorSelectorReducer } from './components/app/modules/donorselector.reducer';

const rootReducer = combineReducers<AppState>({
    auth: authReducer,
    home: homeReducer,
    donorSelector: donorSelectorReducer
})

const sagaMiddleware = createSagaMiddleware();
const Store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(watchAll);

export default Store;
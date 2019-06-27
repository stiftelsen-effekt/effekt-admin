import { AppState } from './models/state'
import { createStore, applyMiddleware, AnyAction } from 'redux';
import createSagaMiddleware from 'redux-saga'
import { FETCH_TOKEN_SUCCESS } from './authenticate/token.actions';
import watchAll from './root.saga';
import { LOGIN_SUCCESS } from './authenticate/login.actions';

const initialState: AppState = {
    accessKey: { key: "DefaultKey", expires: new Date() }
}

const reducer = (state: AppState = initialState, action: AnyAction): AppState => {
    console.log("Reducer", state, action);
    switch(action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                accessKey: action.payload
            };
        case FETCH_TOKEN_SUCCESS:
            return state;
        default:
            return state;
    }
    
}

const sagaMiddleware = createSagaMiddleware();
const Store = createStore(reducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(watchAll);

export default Store;
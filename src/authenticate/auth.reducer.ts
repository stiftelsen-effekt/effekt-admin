import { AuthState, AuthStep } from "../models/state";
import { AnyAction } from "redux";
import { FETCH_TOKEN_SUCCESS, FETCH_TOKEN_FAILURE } from "./token.actions";
import { FETCH_ACCESS_KEY_SUCCESS, LOGOUT_SUCCESS, LOGIN_CACHE_FAILURE, LOGIN_FAILURE } from "./loginout.actions";

const initialState: AuthState = {
    authStep: AuthStep.INITIAL
}

export const authReducer = (state: AuthState = initialState, action: AnyAction): AuthState => {
    switch(action.type) {
        case LOGIN_FAILURE:
            return {
                ...state,
                authStep: AuthStep.SHOW_LOGIN_SCREEN,
                loginError: action.payload
            }
        case FETCH_ACCESS_KEY_SUCCESS:
            return {
                ...state,
                accessKey: action.payload
            };
        case LOGOUT_SUCCESS:
            return {
                ...state,
                authStep: AuthStep.SHOW_LOGIN_SCREEN,
                currentToken: undefined,
                accessKey: undefined
            }
        case FETCH_TOKEN_SUCCESS:
            return {
                ...state,
                currentToken: action.payload,
                authStep: AuthStep.LOGGED_IN
            };
        case FETCH_TOKEN_FAILURE:
            return {
                ...state,
                authStep: AuthStep.SHOW_CONNECTION_FAILED
            }
        case LOGIN_CACHE_FAILURE:
            return {
                ...state,
                authStep: AuthStep.SHOW_LOGIN_SCREEN
            }
        default:
            return state;
    }
}
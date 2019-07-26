import { AuthState, AuthStep } from "../models/state";
import { AnyAction } from "redux";
import { fetchTokenAction } from "./token.actions";
import { FETCH_ACCESS_KEY_SUCCESS, LOGOUT_SUCCESS, LOGIN_CACHE_FAILURE, LOGIN_FAILURE } from "./loginout.actions";
import { isType } from "typescript-fsa";

const initialState: AuthState = {
    authStep: AuthStep.INITIAL
}

export const authReducer = (state: AuthState = initialState, action: AnyAction): AuthState => {
    if (isType(action, fetchTokenAction.done)) {
        return {
            ...state,
            currentToken: action.payload.result,
            authStep: AuthStep.LOGGED_IN
        };
    } else if (isType(action, fetchTokenAction.failed)) {
        return {
            ...state,
            authStep: AuthStep.SHOW_CONNECTION_FAILED
        }
    }         

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
        
        case LOGIN_CACHE_FAILURE:
            return {
                ...state,
                authStep: AuthStep.SHOW_LOGIN_SCREEN
            }
        default:
            return state;
    }
}
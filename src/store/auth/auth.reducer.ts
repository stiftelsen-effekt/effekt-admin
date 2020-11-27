import { AuthState, AuthStep } from "../state";
import { AnyAction } from "redux";
import { fetchTokenAction } from "./token.actions";
import { FETCH_ACCESS_KEY_SUCCESS, LOGOUT_SUCCESS, LOGIN_CACHE_FAILURE, LOGIN_FAILURE, SESSION_INVALID } from "./loginout.actions";
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
        if (action.payload.error.message === "401") {
            return {
                ...state,
                authStep: AuthStep.SHOW_LOGIN_SCREEN,
                loginError: "Your access key is no longer valid. Please login to get a new access key.",
                currentToken: undefined,
                accessKey: undefined
            }
        }
        else {
            return {
                ...state,
                authStep: AuthStep.SHOW_CONNECTION_FAILED
            }
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
                loginError: undefined,
                currentToken: undefined,
                accessKey: undefined
            }
        case LOGIN_CACHE_FAILURE:
            return {
                ...state,
                authStep: AuthStep.SHOW_LOGIN_SCREEN,
                loginError: undefined
            }
        case SESSION_INVALID:
            return {
                ...state,
                authStep: AuthStep.SHOW_LOGIN_SCREEN,
                loginError: "Your access key is no longer valid. Please login to get a new access key.",
                currentToken: undefined,
                accessKey: undefined
            }
        default:
            return state;
    }
}
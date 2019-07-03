import { IAccessKey, IAccessToken } from "../authenticate/auth";

export interface AppState {
    auth: AuthState,
    home: HomeState
}

export interface AuthState {
    currentToken?: IAccessToken,
    accessKey?: IAccessKey,
    authStep: AuthStep
}
export enum AuthStep {
    INITIAL,
    SHOW_LOGIN_SCREEN,
    LOGGED_IN
}

export interface HomeState {
    selectedDonor?: any
}
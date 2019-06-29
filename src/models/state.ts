import { IAccessKey, IAccessToken } from "../authenticate/auth";

export interface AppState {
    accessKey?: IAccessKey,
    currentToken?: IAccessToken,
    authorized: boolean,
    selectedDonor?: any
} 
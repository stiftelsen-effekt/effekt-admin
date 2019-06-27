import { IAccessKey } from "./auth";

export const LOGIN_BEGIN = "LOGIN_BEGIN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";

export const loginBegin = () => {
    return {
        type: LOGIN_BEGIN
    }
}

export const loginSuccess = (accessKey: IAccessKey) => {
    return {
        type: LOGIN_SUCCESS,
        payload: accessKey
    }
}
import { API_URL } from "../config/config";
import store from './../store';
import queryString from "querystring";
import { Auth } from "../store/authentication/auth";
import { LOGIN_SUCCESS, sessionInvalid } from "../store/authentication/loginout.actions";

export enum Method {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE"
}

export interface IAPIParameters {
    endpoint: string,
    token?: string,
    method: Method, 
    data?: any,
    handleUnauthorized?: boolean,
    formData?: FormData
}

export interface Response {
    status: number,
    content: any
}

interface IFetchOptions {
    method?: string,
    headers?: any,
    body?: any
} 

export const call = async (params: IAPIParameters): Promise<any> => {
    let url = `${API_URL}${params.endpoint}`

    let options: IFetchOptions = {
        headers: {}
    }
    if (params.token != null) {
        options = { 
            ...options, 
            headers: { 'authorization': 'Bearer ' + params.token } 
        }
    }

    let response;
    let result;
    switch(params.method) {
        case Method.GET:
            if (params.data !== null) url += `?${queryString.stringify(params.data)}`;

            response = await fetch(url, options);
            if (!params.handleUnauthorized)
                if (response.status === 401) {
                    return await redoCallWithNewToken(params)
                }
            result = await response.json();

            return result
        case Method.POST:
            options = {
                ...options,
                method: Method.POST,
                headers: {
                    ...options.headers,
                    'Accept': 'application/json'
                }
            }

            if (!params.formData) {
                //POSTing normal JSON data
                options = {
                    ...options,
                    headers: {
                        ...options.headers,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(params.data)
                }
            }
            else {
                //POSTing form data
                options = {
                    ...options,
                    body: params.formData
                }
            }

            response = await fetch(url, options)
            if (!params.handleUnauthorized)
                if (response.status === 401) {
                    return await redoCallWithNewToken(params)
                }
            result = await response.json()
            return result;
        case Method.DELETE:
            options = {
                ...options,
                method: Method.DELETE,
            }

            response = await fetch(url, options);
            if (!params.handleUnauthorized)
                if (response.status === 401) {
                    return await redoCallWithNewToken(params)
                }
            result = await response.json();

            return result
        default:
            return new Promise<Response | void>((success) => { success(); });
    }
}

async function redoCallWithNewToken(params: IAPIParameters) {
    let cachedKeyAction = Auth.tryCachedKey()
    //Possible infinite recursion, here be dragons!
    
    if (cachedKeyAction.type === LOGIN_SUCCESS) {
        for(let i = 0; i < 10; i++) {
            await sleep(250)
            let token = store.getState().auth.currentToken
            if (typeof token !== "undefined" && token.token !== params.token) 
                return await call({...params, token: token.token });
        }
    }
    
    store.dispatch(sessionInvalid())
    return false
}

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
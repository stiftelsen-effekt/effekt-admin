import { API_URL } from "../config/config";
import queryString from "querystring";

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
    data?: any
}

interface IFetchOptions {
    method?: string,
    headers?: any,
    body?: any
}

export const call = (params: IAPIParameters): Promise<Response> => {
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

    switch(params.method) {
        case Method.GET:
            if (params.data !== null) url += `?${queryString.stringify(params.data)}`;

            return fetch(url, options).then(response => response.json())
        case Method.POST:
            options = {
                ...options,
                method: Method.POST,
                headers: {
                    ...options.headers,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(params.data)
            }
            return fetch(url, options).then(response => response.json());
        default:
            return new Promise<Response>((success) => { success(); });
    }
}
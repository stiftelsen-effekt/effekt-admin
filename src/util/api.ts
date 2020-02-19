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

const loginPage = "https://storage.googleapis.com/static.gieffektivt.no/index.html#/login";

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
                if (response.status === 401) window.location.href = loginPage
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
                if (response.status === 401) window.location.href = loginPage
            result = await response.json()
            return result;
        default:
            return new Promise<Response>((success) => { success(); });
    }
}
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
    data: any
}

export const call = (params: IAPIParameters): Promise<Response> => {
    if (params.method === Method.GET) {
        let query = "";
        if (params.data !== null) query = "?" + queryString.stringify(params.data);
        const url = `${API_URL}${params.endpoint}${query}`;

        let options = {}
        if (params.token != null) {
            options = { 
                ...options, 
                headers: { 'authorization': 'Bearer ' + params.token } 
            }
        }
        
        return fetch(url, options).then(response => response.json())
    } 
    else {
        //TODO: Handle in a much better way
        return new Promise<Response>((success) => { success(); });
    }
}
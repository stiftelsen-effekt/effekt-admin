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
        return fetch(`${API_URL}${params.endpoint}${query}`).then(response => response.json())
    } 
    else {
        //TODO: Handle in a much better way
        return new Promise<Response>((success) => { success(); });
    }
}
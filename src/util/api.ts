/* eslint-disable import/no-cycle */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-return-await */

/**
 * TODO:
 * This utility class is a mess,
 * it should be rewritten
 */

import queryString from 'querystring';
import { API_URL } from '../config/config';
import store from '../store/store';
import { sessionInvalid, LOGIN_SUCCESS } from '../store/auth/loginout.actions';
import { Auth } from '../auth/auth';

export enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export interface IAPIParameters<Payload> {
  endpoint: string;
  token?: string;
  method: Method;
  data?: Payload;
  handleUnauthorized?: boolean;
  formData?: FormData;
}

export interface Response<Result> {
  status: number;
  content: Result;
}

interface IFetchOptions {
  method?: string;
  headers?: Record<string, unknown>;
  body?: Record<string, unknown>;
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function redoCallWithNewToken(params: IAPIParameters) {
  const cachedKeyAction = Auth.tryCachedKey();
  // Possible infinite recursion, here be dragons!

  if (cachedKeyAction.type === LOGIN_SUCCESS) {
    for (let i = 0; i < 10; i++) {
      await sleep(250);
      const token = store.getState().auth.currentToken;
      if (typeof token !== 'undefined' && token.token !== params.token)
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        return await call({ ...params, token: token.token });
    }
  }

  store.dispatch(sessionInvalid());
  return false;
}

export const call = async (params: IAPIParameters): Promise<Result> => {
  let url = `${API_URL}${params.endpoint}`;

  let options: IFetchOptions = {
    headers: {},
  };
  if (params.token != null) {
    options = {
      ...options,
      headers: { authorization: `Bearer ${params.token}` },
    };
  }

  let response;
  let result;
  switch (params.method) {
    case Method.GET:
      if (params.data !== null) url += `?${queryString.stringify(params.data)}`;

      response = await fetch(url, options);
      if (!params.handleUnauthorized)
        if (response.status === 401) {
          return await redoCallWithNewToken(params);
        }
      result = await response.json();

      return result;
    case Method.POST:
      options = {
        ...options,
        method: Method.POST,
        headers: {
          ...options.headers,
          Accept: 'application/json',
        },
      };

      if (!params.formData) {
        // POSTing normal JSON data
        options = {
          ...options,
          headers: {
            ...options.headers,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(params.data),
        };
      } else {
        // POSTing form data
        options = {
          ...options,
          body: params.formData,
        };
      }

      response = await fetch(url, options);
      if (!params.handleUnauthorized)
        if (response.status === 401) {
          return await redoCallWithNewToken(params);
        }
      result = await response.json();
      return result;
    case Method.DELETE:
      options = {
        ...options,
        method: Method.DELETE,
      };

      response = await fetch(url, options);
      if (!params.handleUnauthorized)
        if (response.status === 401) {
          return await redoCallWithNewToken(params);
        }
      result = await response.json();

      return result;
    default:
      return new Promise<Response>((success) => {
        success();
      });
  }
};

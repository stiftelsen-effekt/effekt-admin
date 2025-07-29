import { API_URL } from "../config/config";

export enum Method {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export interface IAPIParameters {
  endpoint: string;
  token?: string;
  method: Method;
  data?: any;
  handleUnauthorized?: boolean;
  formData?: FormData;
}

export interface Response {
  status: number;
  content: any;
}

export type OkResponse<T> = {
  status: 200; // Or any other "OK" status
  content: T;
};

export type ErrorResponse = {
  status: 400 | 500; // Or any other error
  content: string;
};

export type TypedResponse<T> = OkResponse<T> | ErrorResponse;

export const isOk = <T>(response: TypedResponse<T>): response is OkResponse<T> =>
  response.status >= 200 && response.status < 300;

interface IFetchOptions {
  method?: string;
  headers?: any;
  body?: any;
}

export const call = async (params: IAPIParameters): Promise<any> => {
  let url = `${API_URL}${params.endpoint}`;
  let options: IFetchOptions = {
    headers: {},
  };

  if (params.token != null) {
    options = {
      ...options,
      headers: { authorization: "Bearer " + params.token },
    };
  }

  let response;
  let result;

  switch (params.method) {
    case Method.GET:
      if (params.data !== null) {
        url += "?";
        for (let key in params.data) {
          url += encodeURIComponent(key) + "=" + encodeURIComponent(params.data[key]);
        }
      }
      response = await fetch(url, options);
      result = await response.json();
      return result;

    case Method.POST:
    case Method.PUT:
      options = {
        ...options,
        method: params.method,
        headers: {
          ...options.headers,
          Accept: "application/json",
        },
      };

      if (!params.formData) {
        //POSTing normal JSON data
        options = {
          ...options,
          headers: {
            ...options.headers,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(params.data),
        };
      } else {
        //POSTing form data
        options = {
          ...options,
          body: params.formData,
        };
      }

      response = await fetch(url, options);
      result = await response.json();
      return result;

    case Method.DELETE:
      options = {
        ...options,
        method: Method.DELETE,
        headers: {
          ...options.headers,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params.data),
      };

      response = await fetch(url, options);
      result = await response.json();
      return result;

    default:
      return new Promise<void>((success) => {
        success();
      });
  }
};

export const callForBlob = async (
  params: IAPIParameters,
): Promise<{ blob: Blob; filename?: string }> => {
  let url = `${API_URL}${params.endpoint}`;
  let options: IFetchOptions = {
    headers: {},
  };

  if (params.token != null) {
    options = {
      ...options,
      headers: { authorization: "Bearer " + params.token },
    };
  }

  let response;

  switch (params.method) {
    case Method.GET:
      if (params.data !== null) {
        url += "?";
        for (let key in params.data) {
          url += encodeURIComponent(key) + "=" + encodeURIComponent(params.data[key]);
        }
      }

      response = await fetch(url, options);
      break;

    case Method.POST:
    case Method.PUT:
      options = {
        ...options,
        method: params.method,
        headers: {
          ...options.headers,
        },
      };

      if (!params.formData) {
        // POSTing normal JSON data
        options = {
          ...options,
          headers: {
            ...options.headers,
            "Content-Type": "application/json",
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
      break;

    case Method.DELETE:
      options = {
        ...options,
        method: Method.DELETE,
        headers: {
          ...options.headers,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params.data),
      };

      response = await fetch(url, options);
      break;

    default:
      throw new Error(`Method ${params.method} not supported for blob downloads`);
  }

  if (!response.ok) {
    // Try to get error message from response if possible
    let errorMessage = `Request failed: ${response.statusText}`;
    try {
      const errorData = await response.json();
      if (errorData.content) {
        errorMessage = errorData.content;
      }
    } catch {
      // If we can't parse JSON, stick with the status text
    }
    throw new Error(errorMessage);
  }

  // Extract filename from Content-Disposition header if available
  const contentDisposition = response.headers.get("Content-Disposition");
  let filename: string | undefined;

  if (contentDisposition) {
    const filenameMatch = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
    if (filenameMatch && filenameMatch[1]) {
      filename = filenameMatch[1].replace(/['"]/g, "");
    }
  }

  const blob = await response.blob();

  return { blob, filename };
};

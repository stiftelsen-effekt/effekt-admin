export const DEV_ENVIRONMENT = process.env.NODE_ENV === "development" ? true : false;
export const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5050";

export const AUTH_DOMAIN = process.env.REACT_APP_AUTH_DOMAIN || "";
export const AUTH_CLIENT_ID = process.env.REACT_APP_AUTH_CLIENT_ID || "";
export const AUTH_AUDIENCE = process.env.REACT_APP_AUTH_AUDIENCE || "";
export const AUTH_SCOPE = process.env.REACT_APP_AUTH_SCOPE || "";

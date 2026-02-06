import { AdminPanelLocale } from "../models/locale";

export const DEV_ENVIRONMENT = import.meta.env.DEV;
export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5050";

export const AUTH_DOMAIN = import.meta.env.VITE_AUTH_DOMAIN || "";
export const AUTH_CLIENT_ID = import.meta.env.VITE_AUTH_CLIENT_ID || "";
export const AUTH_AUDIENCE = import.meta.env.VITE_AUTH_AUDIENCE || "";
export const AUTH_SCOPE = import.meta.env.VITE_AUTH_SCOPE || "";
export const APP_LOCALE = (import.meta.env.VITE_LOCALE || AdminPanelLocale.NO) as AdminPanelLocale;

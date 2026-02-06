/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL?: string;
  readonly VITE_AUTH_DOMAIN?: string;
  readonly VITE_AUTH_CLIENT_ID?: string;
  readonly VITE_AUTH_AUDIENCE?: string;
  readonly VITE_AUTH_SCOPE?: string;
  readonly VITE_LOCALE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

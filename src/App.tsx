import React from "react";

import store from "./store";
import { Provider } from "react-redux";

import { MainRouter } from "./components/router/Main";

//TODO: Move styling somewhere else?
import "react-datepicker/dist/react-datepicker.css";
import "./components/style/elements/datepicker/datepicker-effekt.css";
import "react-toastify/dist/ReactToastify.css";
import "./components/style/elements/react-table/base.css";
import { DEV_ENVIRONMENT, AUTH_DOMAIN, AUTH_CLIENT_ID, AUTH_AUDIENCE } from "./config/config";
import "react-loading-skeleton/dist/skeleton.css";
import { Auth0Provider } from "@auth0/auth0-react";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Auth0Provider
        domain={AUTH_DOMAIN}
        clientId={AUTH_CLIENT_ID}
        audience={AUTH_AUDIENCE}
        redirectUri={typeof window !== "undefined" ? window.location.origin + "/" : undefined}
        onRedirectCallback={() => {
          window.history.replaceState({}, document.title, "/");
        }}
        cacheLocation={DEV_ENVIRONMENT ? "localstorage" : "memory"}
      >
        <MainRouter></MainRouter>
      </Auth0Provider>
    </Provider>
  );
};

export default App;

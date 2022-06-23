import React from 'react';

import store from './store';
import { Provider } from 'react-redux';

import { MainRouter } from './components/router/Main';

//TODO: Move styling somewhere else?
import 'react-datepicker/dist/react-datepicker.css';
import './components/style/elements/datepicker/datepicker-effekt.css';
import 'react-toastify/dist/ReactToastify.css';
import './components/style/elements/react-table/base.css';
import 'react-loading-skeleton/dist/skeleton.css';
import { Auth0Provider } from '@auth0/auth0-react';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Auth0Provider
        domain={process.env.NEXT_PUBLIC_DOMAIN || 'konduit.eu.auth0.com'}
        clientId={process.env.NEXT_PUBLIC_CLIENT_ID || 'EX8houA1Dg5P6eWucXG6Tcc7qc8Loh63'}
        audience="https://data.gieffektivt.no"
        scope="openid profile email read:donations write:donations read:profile write:profile read:distributions write:distributions read:agreements write:agreements read:vipps_api write:vipps_api admin"
        redirectUri={typeof window !== 'undefined' ? window.location.origin + '/' : undefined}
        onRedirectCallback={() => (window.location.href = '/')}
        cacheLocation={
          typeof window !== 'undefined'
            ? (window as any).Cypress
              ? 'localstorage'
              : 'memory'
            : undefined
        }
      >
        <MainRouter></MainRouter>
      </Auth0Provider>
    </Provider>
  );
};

export default App;

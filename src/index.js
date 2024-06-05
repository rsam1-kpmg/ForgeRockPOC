import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Config, TokenStorage } from '@forgerock/javascript-sdk';
import { AM_URL, APP_URL, JOURNEY_LOGIN, REALM_PATH, WEB_OAUTH_CLIENT } from './constants';

const root = ReactDOM.createRoot(document.getElementById('root'));
Config.set({
  clientId: WEB_OAUTH_CLIENT,
  redirectUri: `${APP_URL}/callback`,
  scope: 'openid profile email address',
  serverConfig: {
    baseUrl: AM_URL,
    timeout: 5000,
  },
  realmPath: REALM_PATH,
  tree: JOURNEY_LOGIN,
});

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

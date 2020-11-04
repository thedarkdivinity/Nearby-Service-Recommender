import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Auth0Provider} from '@auth0/auth0-react';
import { BrowserRouter } from 'react-router-dom';
const domain="sayush.us.auth0.com";
const clientid="3tbBxav53LFb5yfGHSMZWLS98Rxcpo9a";


ReactDOM.render(
  <BrowserRouter>
  <Auth0Provider
  domain={domain}
  clientId={clientid}
  redirectUri={window.location.origin}
  >
    <App />
    </Auth0Provider>
    </BrowserRouter>
 ,
  document.getElementById('root')
);
serviceWorker.unregister();

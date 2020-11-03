import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Auth0Provider} from '@auth0/auth0-react';
import { BrowserRouter } from 'react-router-dom';
const domain=process.env.REACT_APP_AUTH0_DOMAIN;
const clientid=process.env.REACT_APP_AUTH0_CLIENT_ID;


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

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

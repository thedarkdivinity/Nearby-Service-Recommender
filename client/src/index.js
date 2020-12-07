import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import App from './App';
import swDev from './swDev';
import {Auth0Provider} from '@auth0/auth0-react';
import { BrowserRouter } from 'react-router-dom';
const domain="sayush.us.auth0.com";
const clientid="3tbBxav53LFb5yfGHSMZWLS98Rxcpo9a";


ReactDOM.render(
  <BrowserRouter>
  <Auth0Provider
  domain={domain}
  clientId={clientid}
  redirectUri="http://localhost:3000/auth"
  >
    <App />
    </Auth0Provider>
    </BrowserRouter>
 ,
  document.getElementById('root')
);

swDev();
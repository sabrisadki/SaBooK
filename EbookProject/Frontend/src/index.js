import { ColorModeScript } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store'
import { Auth0Provider } from '@auth0/auth0-react';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <StrictMode>
          <BrowserRouter>
              <Provider store={store}>
                  <ColorModeScript />

                  <Auth0Provider
                   domain="dev-8pyv56fkzf3d3abb.eu.auth0.com"
                   clientId="YqYNBh3syIE3704hRkp4wTnoT7Ej8jnr"
                    authorizationParams={{
                      redirect_uri: window.location.origin,
                      audience: "https://dev-8pyv56fkzf3d3abb.eu.auth0.com/api/v2/",
                      scope: "read:current_user update:current_user_metadata"
                    }}
                  >
                  <App />
                  </Auth0Provider>
              </Provider>
          </BrowserRouter>
  </StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

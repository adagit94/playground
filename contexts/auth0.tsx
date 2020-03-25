import React from 'react';

import { StatesAuth0 } from '../types/auth0';

export const ContextAuth0 = React.createContext<{
  statesAuth0: StatesAuth0;
  clientID: string;
  loginWithPopup: Function;
  handleRedirectCallback: Function;
  getIdTokenClaims: Function;
  loginWithRedirect: Function;
  getTokenSilently: Function;
  getTokenWithPopup: Function;
  logout: Function;
}>(null);

ContextAuth0.displayName = 'ContextAuth0';

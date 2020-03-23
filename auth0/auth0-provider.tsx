import React, { useState, useEffect, useReducer } from 'react';
import createAuth0Client from '@auth0/auth0-spa-js';

import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client';
import { ContextStatesAuth0, ContextFunctionsAuth0 } from '../contexts/auth0';
import { reducerAuth0 } from '../reducers/auth0';
import { initsAuth0 } from '../inits/auth0';

const DEFAULT_REDIRECT_CALLBACK = (): void =>
  window.history.replaceState({}, document.title, window.location.pathname);

export const Auth0Provider: React.FC<Auth0ClientOptions> = ({
  children,
  onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
  ...initOptions
}) => {
  const [statesAuth0, dispatchAuth0] = useReducer(reducerAuth0, initsAuth0);
  const [auth0, setAuth0] = useState<Auth0Client>(null);

  const loginWithPopup = async (params = {}): Promise<void> => {
    dispatchAuth0({ type: 'setPopupOpen', value: true });

    try {
      await auth0.loginWithPopup(params);
    } catch (error) {
      console.error(error);
    } finally {
      dispatchAuth0({ type: 'setPopupOpen', value: false });
    }
    const user = await auth0.getUser();

    dispatchAuth0({ type: 'setUser', user });
    dispatchAuth0({ type: 'setIsAuthenticated', value: true });
  };

  const handleRedirectCallback = async (): Promise<void> => {
    dispatchAuth0({ type: 'setIsAuthenticated', value: true });

    await auth0.handleRedirectCallback();

    const user = await auth0.getUser();

    dispatchAuth0({ type: 'setLoading', value: false });
    dispatchAuth0({ type: 'setIsAuthenticated', value: true });
    dispatchAuth0({ type: 'setUser', user });
  };

  const functions = {
    loginWithPopup,
    handleRedirectCallback,
    getIdTokenClaims: (...p): Promise<IdToken> => auth0.getIdTokenClaims(...p),
    loginWithRedirect: (...p): Promise<void> => auth0.loginWithRedirect(...p),
    getTokenSilently: (...p): Promise<any> => auth0.getTokenSilently(...p),
    getTokenWithPopup: (...p): Promise<string> => auth0.getTokenWithPopup(...p),
    logout: (...p): void => auth0.logout(...p)
  };

  useEffect(() => {
    const initAuth0 = async (): Promise<void> => {
      const auth0FromHook = await createAuth0Client(initOptions);

      setAuth0(auth0FromHook);

      if (
        window.location.search.includes('code=') &&
        window.location.search.includes('state=')
      ) {
        const { appState } = await auth0FromHook.handleRedirectCallback();

        onRedirectCallback(appState);
      }
      const isAuthenticated = await auth0FromHook.isAuthenticated();

      dispatchAuth0({ type: 'setIsAuthenticated', value: isAuthenticated });

      if (isAuthenticated) {
        const user = await auth0FromHook.getUser();

        dispatchAuth0({ type: 'setUser', user });
      }
      dispatchAuth0({ type: 'setLoading', value: false });
    };

    initAuth0();
    // eslint-disable-next-line
  }, []);

  return (
    <ContextStatesAuth0.Provider value={statesAuth0}>
      <ContextFunctionsAuth0.Provider value={functions}>
        {children}
      </ContextFunctionsAuth0.Provider>
    </ContextStatesAuth0.Provider>
  );
};

export default Auth0Provider;

import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client';

export type StatesAuth0 = {
  auth0: Auth0Client;
  user: any;
  isAuthenticated: boolean;
  loading: boolean;
};

export type ActionsAuth0 =
  | { type: 'setAuth0'; payload: Auth0Client }
  | { type: 'setUser'; payload: any }
  | { type: 'setIsAuthenticated'; value: boolean }
  | { type: 'setLoading'; value: boolean };

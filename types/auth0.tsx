export type StatesAuth0 = {
  user: any;
  isAuthenticated: boolean;
  loading: boolean;
  popupOpen: boolean;
};

export type ActionsAuth0 =
  | { type: 'setUser'; user: any }
  | { type: 'setIsAuthenticated'; value: boolean }
  | { type: 'setLoading'; value: boolean }
  | { type: 'setPopupOpen'; value: boolean };

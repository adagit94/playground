export type StatesAuth0 = {
  isAuthenticated: boolean;
  loading: boolean;
  popupOpen: boolean;
};

export type ActionsAuth0 =
  | { type: 'setIsAuthenticated'; value: boolean }
  | { type: 'setLoading'; value: boolean }
  | { type: 'setPopupOpen'; value: boolean };



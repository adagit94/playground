export type StatesFirebase = {
  user: firebase.User;
  isAuthenticated: boolean;
  loading: boolean;
};

export type ActionsFirebase =
  | { type: 'initUser'; payload: firebase.User }
  | { type: 'setIsAuthenticated'; value: boolean }
  | { type: 'setLoading'; value: boolean }
  | { type: 'reset' };

export type HandleLoading = (value: boolean) => void;

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

export type PropsProfile = {
  logout: Function;
};

export type ValidatorReturn = {
  isValid: boolean;
  equalPasswords: boolean;
  count: boolean;
  upper: boolean;
  num: boolean;
  special: boolean;
};

export type HandleLoading = (value: boolean) => void;

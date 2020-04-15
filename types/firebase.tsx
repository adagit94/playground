export type StatesFirebase = {
  user: any;
  isAuthenticated: boolean;
  loading: boolean;
};

export type ActionsFirebase =
  | { type: 'setUser'; payload: any }
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

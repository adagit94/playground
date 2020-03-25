import { StatesAuth0, ActionsAuth0 } from '../types/auth0';

export const reducerAuth0: React.Reducer<StatesAuth0, ActionsAuth0> = (
  states,
  action
): StatesAuth0 => {
  switch (action.type) {
    case 'setUser':
      return {
        ...states,
        user: action.user
      };

    case 'setIsAuthenticated':
      return {
        ...states,
        isAuthenticated: action.value
      };

    case 'setLoading':
      return {
        ...states,
        loading: action.value
      };

    case 'setPopupOpen':
      return {
        ...states,
        popupOpen: action.value
      };
  }
};

import { StatesFirebase, ActionsFirebase } from 'types/firebase';
import { initFirebase } from 'inits/firebase';

export const reducerFirebase: React.Reducer<StatesFirebase, ActionsFirebase> = (
  states,
  action
): StatesFirebase => {
  switch (action.type) {
    case 'initUser':
      return {
        user: action.payload,
        isAuthenticated: true,
        loading: false
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

    case 'reset':
      return {
        ...initFirebase,
        loading: false
      };

    default:
      return states;
  }
};

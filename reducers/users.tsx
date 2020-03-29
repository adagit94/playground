import { StatesUsers, ActionsUsers } from '../types/users';

export const reducerUsers: React.Reducer<StatesUsers, ActionsUsers> = (
  states,
  action
): StatesUsers => {
  switch (action.type) {
    case 'initializeUser':
      return {
        ...states,
        [action.user]: {
          wins: 0,
          gatheredPoints: 0
        }
      };

    default:
      throw new Error('Unspecified / Wrong action');
  }
};

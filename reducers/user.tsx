import { StatesUser, ActionsUser } from '../types/user';

export const reducerUser: React.Reducer<StatesUser, ActionsUser> = (
  states,
  action
): StatesUser => {
  switch (action.type) {
    case 'initializeUser':
      return {
        username: action.username,
        wins: 0,
        gatheredPoints: 0
      };

    default:
      throw new Error('Unspecified / Wrong action');
  }
};

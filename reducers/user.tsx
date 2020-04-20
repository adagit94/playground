import { StatesUser, ActionsUser } from '../types/user';
import { initUser } from '../inits/user';

export const reducerUser: React.Reducer<StatesUser, ActionsUser> = (
  states,
  action
): StatesUser => {
  switch (action.type) {
    case 'initUser':
      return { ...action.payload };

    case 'addPoint':
      return {
        ...states,
        gatheredPoints: states.gatheredPoints + 1
      };

    case 'reset':
      return {
        ...initUser
      };

    default:
      throw new Error('Unspecified / Wrong action');
  }
};

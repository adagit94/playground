import { StatesUser, ActionsUser } from '../types/user';

export const reducerUser: React.Reducer<StatesUser, ActionsUser> = (
  states,
  action
): StatesUser => {
  switch (action.type) {
    case 'setUser':
      return { ...action.payload };

    case 'addPoint':
      return {
        ...states,
        gatheredPoints: states.gatheredPoints + 1
      };

    default:
      throw new Error('Unspecified / Wrong action');
  }
};

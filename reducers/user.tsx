import { StatesUser, ActionsUser } from '../types/user';
import { initUser } from '../inits/user';

export const reducerUser: React.Reducer<StatesUser, ActionsUser> = (
  states,
  action
): StatesUser => {
  switch (action.type) {
    case 'setData':
      return { ...action.payload };

    case 'reset':
      return {
        ...initUser
      };

    default:
      throw new Error('Unspecified / Wrong action');
  }
};

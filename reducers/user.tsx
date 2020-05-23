import { StatesUser, ActionsUser } from 'types/user';

export const reducerUser: React.Reducer<StatesUser, ActionsUser> = (
  states,
  action
): StatesUser => {
  switch (action.type) {
    case 'setData':
      return { ...action.payload };

    default:
      return states;
  }
};

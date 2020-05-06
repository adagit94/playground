import { StatesUser, ActionsUser } from '../types/user';
import { initUser } from '../inits/user';

export const reducerUser: React.Reducer<StatesUser, ActionsUser> = (
  states,
  action
): StatesUser => {
  switch (action.type) {
    case 'initUser':
      return { ...action.payload };

    case 'editGame':
      switch (action.game) {
        case 'floatingPoint':
          switch (action.operation) {
            case 'addPoint':
              return {
                ...states,
                games: {
                  ...states.games,
                  [action.game]: {
                    ...states.games[action.game],
                    gatheredPoints: states[action.game].gatheredPoints + 1
                  }
                }
              };

            default:
              throw new Error('Unspecified / Wrong operation');
          }

        default:
          throw new Error('Unspecified / Wrong game title');
      }

    case 'reset':
      return {
        ...initUser
      };

    default:
      throw new Error('Unspecified / Wrong action');
  }
};

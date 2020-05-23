import { StatesLayout, ActionsLayout } from 'types/layout';

export const reducerLayout: React.Reducer<StatesLayout, ActionsLayout> = (
  states,
  action
): StatesLayout => {
  switch (action.type) {
    case 'changeTheme':
      return {
        ...states,
        theme: states.theme === 'dark' ? 'light' : 'dark'
      };

    default:
      return states;
  }
};

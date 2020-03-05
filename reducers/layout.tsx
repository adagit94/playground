import { StatesLayout, ActionsLayout } from '../types/layout';

export const reducerLayout: React.Reducer<StatesLayout, ActionsLayout> = (
  state,
  action
): StatesLayout => {
  switch (action.type) {
    case 'changeTheme':
      return {
        ...state,
        theme: state.theme === 'dark' ? 'light' : 'dark'
      };

    default:
      throw new Error('Unspecified / Wrong action');
  }
};

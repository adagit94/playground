import { ActionsFirebase } from './firebase';

type Colors = '#000000' | '#ffffff';

export type Themes = 'dark' | 'light';

export type StatesLayout = {
  theme: Themes;
};

export type ActionsLayout = { type: 'changeTheme'; theme?: Themes };

export type PropsLayout = {
  content: JSX.Element;
};

export type DispatchesLayout = {
  layout: React.Dispatch<ActionsLayout>;
  firebase: React.Dispatch<ActionsFirebase>;
};

export type Theming = {
  theme: Themes;
  background: Colors;
  inverted: Colors;
};

export type PropsAvatar = {
  user: firebase.User;
  theme: Themes;
};

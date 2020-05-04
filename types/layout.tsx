import { ActionsUser } from './user';
import { ActionsFirebase } from './firebase';

type Themes = 'dark' | 'light';

export type StatesLayout = {
  theme: Themes;
};

export type ActionsLayout = { type: 'changeTheme'; theme?: string };

export type PropsLayout = {
  content: JSX.Element;
};

export type DispatchesLayout = {
  layout: React.Dispatch<ActionsLayout>;
  user: React.Dispatch<ActionsUser>;
  firebase: React.Dispatch<ActionsFirebase>;
};

export type Colors = {
  theme: Themes;
  background: string;
  inverted: string;
};

export type PropsAvatar = {
  user: firebase.User;
  theme: Themes;
};
import { ActionsUser } from './user';
import { ActionsFirebase } from './firebase';

export type StatesLayout = {
  theme: string;
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
  theme: string;
  background: string;
  inverted: string;
};

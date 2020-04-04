import { ActionsUser } from './user';

export type StatesLayout = {
  theme: string;
};

export type ActionsLayout = { type: 'changeTheme'; theme?: string };

export type PropsLayout = {
  content: JSX.Element;
};

export type Dispatches = {
  layout: React.Dispatch<ActionsLayout>;
  user: React.Dispatch<ActionsUser>;
};

export type Colors = {
  theme: string;
  background: string;
  inverted: string;
};

import { ActionsUser } from './user';
import { ActionsAuth0 } from './auth0';

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
  auth0: React.Dispatch<ActionsAuth0>;
};

export type Colors = {
  theme: string;
  background: string;
  inverted: string;
};

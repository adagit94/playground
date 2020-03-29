export type StatesLayout = {
  theme: string;
};

export type ActionsLayout = { type: 'changeTheme'; theme?: string };

export type PropsLayout = {
  content: JSX.Element;
};

export type PropsProfile = {
  clientID: string;
  name: string;
  logout: Function;
};

export type Colors = {
  theme: string;
  background: string;
  inverted: string;
};

export type StatesLayout = {
  theme: string;
};

export type ActionsLayout = { type: 'changeTheme'; theme?: string };

export type PropsLayout = {
  content: JSX.Element;
};

export type Colors = {
  theme: string;
  background: string;
  inverted: string;
};

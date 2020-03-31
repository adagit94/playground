export type StatesUser = {
  username: string;
  wins: number;
  gatheredPoints: number;
};

export type ActionsUser = { type: 'initializeUser'; username: string };

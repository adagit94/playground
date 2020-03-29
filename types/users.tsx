export type StatesUsers = {
  wins: number;
  gatheredPoints: number;
};

export type ActionsUsers = { type: 'initializeUser'; user: string };

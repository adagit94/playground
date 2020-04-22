type FloatingPoint = {
  wins: number;
  gatheredPoints: number;
};

type Games = {
  floatingPoint: FloatingPoint;
};

export type StatesUser = {
  lastPlayed: string;
  games: Games;
};

export type ActionsUser =
  | {
      type: 'initUser';
      payload: StatesUser;
    }
  | { type: 'addPoint' }
  | { type: 'reset' };

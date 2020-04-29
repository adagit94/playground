type FloatingPoint = {
  wins: number;
  gatheredPoints: number;
};

type UpdateFloatingPoint = {
  wins?: number;
  gatheredPoints?: number;
};

type UpdateUser = {
  lastPlayed?: string;
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
  | { type: 'editGame'; game: GamesList; operation: 'addPoint' }
  | { type: 'reset' };

export type UpdatesList = UpdateUser | UpdateFloatingPoint;

export type GamesList = 'floatingPoint';

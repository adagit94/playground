import { GamesList } from './games/generic';

type FloatingPoint = {
  wins: number;
  gatheredPoints: number;
};

type Games = {
  floatingPoint: FloatingPoint;
};

type UpdateUser = {
  lastPlayed?: string;
};

type ActionsList = 'addPoint' | 'win';

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

export type CreateDataUser = (user: string, data: StatesUser) => Promise<void>;

export type GetDataUser = (user: string) => Promise<StatesUser>;

export type UpdateDataUser = (
  user: string,
  update: [GamesList, ActionsList] | UpdateUser
) => Promise<void>;

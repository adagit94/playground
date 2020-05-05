import { GamesList } from './games/generics';

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
  | { type: 'editGame'; game: GamesList; operation: 'addPoint' }
  | { type: 'reset' };

export type CreateDataUser = (
  user: string,
  data: StatesUser
) => Promise<void>;

export type GetDataUser = (user: string) => Promise<StatesUser>;

type UpdateUser = {
  lastPlayed?: string;
};

type ActionsList = 'addPoint' | 'win';

export type UpdateDataUser = (
  user: string,
  update: UpdateUser | [GamesList, ActionsList]
) => Promise<void>;

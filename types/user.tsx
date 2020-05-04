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

export type CreateRecordUser = (
  user: string,
  record: StatesUser
) => Promise<void>;

export type GetRecordUser = (user: string) => Promise<StatesUser>;

type UpdateUser = {
  lastPlayed?: string;
};

type ActionsList = 'addPoint' | 'win';

export type UpdateRecordUser = (
  user: string,
  update: UpdateUser | [GamesList, ActionsList]
) => Promise<void>;

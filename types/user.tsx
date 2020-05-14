import { GamesList } from './games/generic';

type UpdateDataUserGamesFP = {
  wins?: number;
  gatheredPoints?: number;
};

type UpdateDataUserGames = {
  floatingPoint?: UpdateDataUserGamesFP;
};

type UpdateDataUserObj = {
  lastPlayed?: string;
  games?: UpdateDataUserGames;
};

type Games = {
  floatingPoint: FloatingPoint;
};

export type FloatingPoint = {
  wins: number;
  gatheredPoints: number;
};

export type GameDataList = FloatingPoint;

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

export type GetDataUserGame = (
  user: string,
  game: GamesList
) => Promise<GameDataList>;

export type UpdateDataUser = (
  user: string,
  update: UpdateDataUserObj
) => Promise<void>;

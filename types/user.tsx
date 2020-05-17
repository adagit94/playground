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
  timePlayed: number;
  games: Games;
};

export type ActionsUser =
  | {
      type: 'setData';
      payload: StatesUser;
    }
  | { type: 'reset' };

export type HandleData = (data: StatesUser) => void;

export type InitUserDB = (
  user: string,
  handleData: HandleData
) => Promise<void>;

export type ClearUserDB = (user: string) => void;

export type CreateDataUser = (user: string, data: StatesUser) => Promise<void>;

export type GetDataUserGame = (
  user: string,
  game: GamesList
) => Promise<GameDataList>;

export type UpdateDataUser = (
  user: string,
  update: UpdateDataUserObj
) => Promise<void>;

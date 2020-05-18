import { GamesList } from './games/generic';

type UpdateDataUserGamesFP = {
  wins?: number;
  gatheredPoints?: number;
  timePlayed?: number;
};

type UpdateDataUserGames = {
  floatingPoint?: UpdateDataUserGamesFP;
};

type UpdateDataUserObj = {
  registred?: string;
  lastPlayed?: GamesList | '-';
  mostPlayed?: string;
  games?: UpdateDataUserGames;
};

export type Games = {
  floatingPoint: FloatingPoint;
};

export type FloatingPoint = {
  wins: number;
  gatheredPoints: number;
  timePlayed: number;
};

export type GameDataList = FloatingPoint;

export type StatesUser = {
  registred: string;
  lastPlayed: GamesList | '-';
  mostPlayed: string;
  games: Games;
};

export type ActionsUser = {
  type: 'setData';
  payload: StatesUser;
};

export type HandleData = (data: StatesUser) => void;

export type InitUserDB = (
  user: firebase.User,
  handleData: HandleData
) => Promise<void>;

export type RemoveListenerUser = (user: string) => void;

export type CreateDataUser = (user: string, data: StatesUser) => Promise<void>;

export type GetDataUserGame = (
  user: string,
  game: GamesList
) => Promise<GameDataList>;

export type UpdateDataUser = (
  user: string,
  update: UpdateDataUserObj
) => Promise<void>;

export type InitUserDefaults = (user: firebase.User) => StatesUser;

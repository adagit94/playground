import { GamesList, GamesListEdited } from './games/generic';

type UpdateDataUserGamesFP = {
  wins?: number;
  gatheredPoints?: number;
  playedTime?: number;
};

type UpdateGameList = UpdateDataUserGamesFP;

type UpdateDataUserObj = {
  registred?: string;
  lastPlayed?: GamesListEdited | '-';
  mostPlayed?: string;
};

export type Games = {
  floatingPoint: FloatingPoint;
};

export type FloatingPoint = {
  wins: number;
  gatheredPoints: number;
  playedTime: number;
};

export type GameDataList = FloatingPoint;

export type StatesUser = {
  registred: string;
  lastPlayed: GamesListEdited | '-';
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

export type GetDataUser = (user: string) => Promise<StatesUser>;

export type GetDataUserGames = (user: string) => Promise<Games>;

export type GetDataUserGame = (
  user: string,
  game: GamesList
) => Promise<GameDataList>;

export type UpdateDataUser = (
  user: string,
  update: UpdateDataUserObj
) => Promise<void>;

export type UpdateDataUserGame = (
  game: GamesList,
  user: string,
  update: UpdateGameList
) => Promise<void>;

export type InitUserDefaults = (user: firebase.User) => StatesUser;

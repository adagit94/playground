import { GameNames, GameNamesEdited } from './games/generic';

type UpdateDataUserGamesFP = {
  wins?: number;
  gatheredPoints?: number;
  playedTime?: number;
};

type UpdateGame = UpdateDataUserGamesFP;

type UpdateDataUserObj = {
  registred?: string;
  lastPlayed?: GameNamesEdited | '-';
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

export type GameData = FloatingPoint;

export type StatesUser = {
  registred: string;
  lastPlayed: GameNamesEdited | '-';
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
  game: GameNames
) => Promise<GameData>;

export type UpdateDataUser = (
  user: string,
  update: UpdateDataUserObj
) => Promise<void>;

export type UpdateDataUserGame = (
  game: GameNames,
  user: string,
  update: UpdateGame
) => Promise<void>;

export type InitUserDefaults = (user: firebase.User) => StatesUser;

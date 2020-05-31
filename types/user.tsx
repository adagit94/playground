import { CrudOperations } from './generic';
import { GameNames, GameNamesEdited } from './games/generic';

type GameUpdateFP = {
  wins?: number;
  gatheredPoints?: number;
  playedTime?: number;
};

type GameUpdate = GameUpdateFP;

type StatesUserUpdate = {
  registred?: string;
  lastPlayed?: GameNamesEdited | '-';
  mostPlayed?: string;
};

export type GamesData = {
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
  games: GamesData;
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

export type CrudDataUser = (
  user: string,
  operation: CrudOperations,
  data?: StatesUser | StatesUserUpdate
) => Promise<StatesUser | void>;

export type CrudDataUserGame = (
  user: string,
  game: GameNames | 'all',
  operation: CrudOperations,
  data?: GameUpdate
) => Promise<GamesData | GameData | void>;

export type InitUserDefaults = (user: firebase.User) => StatesUser;

import {
  HandleData,
  DataSet as DataSetFP,
  CreateGame as CreateGameFP,
  UpdateGame as UpdateGameFP,
  UpdatePlayer as UpdatePlayerFP,
  CreatePlayer as CreatePlayerFP
} from './floating-point-online';

type CreateGame = CreateGameFP;

type UpdateGame = UpdateGameFP;

type GetGame = DataSetFP;

type CreatePlayer = CreatePlayerFP;

type UpdatePlayer = UpdatePlayerFP;

export type GameNames = 'floatingPoint';

export type GameNamesEdited = 'Floating Point';

export type GameList = ['floatingPoint'];

export type CreateDataGame = (
  game: GameNames,
  data: CreateGame
) => Promise<void>;

export type UpdateDataGame = (
  game: GameNames,
  update: UpdateGame
) => Promise<void>;

export type DeleteDataGame = (game: GameNames) => Promise<void>;

export type GetDataGame = (game: GameNames) => Promise<GetGame>;

export type CreateDataPlayer = (
  game: GameNames,
  player: string,
  data: CreatePlayer
) => Promise<void>;

export type UpdateDataPlayer = (
  game: GameNames,
  player: string,
  update: UpdatePlayer
) => Promise<void>;

export type DeleteDataPlayer = (
  game: GameNames,
  player: string
) => Promise<void>;

export type GetDataPlayer = (
  game: GameNames,
  player: string
) => Promise<CreatePlayer | null>;

export type InitGame = (
  game: GameNames,
  user: firebase.User,
  handleData: HandleData
) => Promise<void>;

export type RemoveListenersGame = (game: GameNames) => void;

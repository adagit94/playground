import {
  HandleData,
  DataSet as DataSetFP,
  CreateGame as CreateGameFP,
  UpdateGame as UpdateGameFP,
  UpdatePlayer as UpdatePlayerFP,
  Player as CreatePlayerFP
} from './floating-point-online';

type CreateGameList = CreateGameFP;

type UpdateGameList = UpdateGameFP;

type GetGameList = DataSetFP;

type CreatePlayerList = CreatePlayerFP;

type UpdatePlayerList = UpdatePlayerFP;

export type GamesList = 'floatingPoint';

export type InitGame = (
  game: GamesList,
  user: firebase.User,
  handleData: HandleData
) => Promise<void>;

export type CreateDataGame = (
  game: GamesList,
  data: CreateGameList
) => Promise<void>;

export type UpdateDataGame = (
  game: GamesList,
  update: UpdateGameList
) => Promise<void>;

export type ClearDataGame = (game: GamesList) => Promise<void>;

export type GetDataGame = (game: GamesList) => Promise<GetGameList>;

export type CreateDataPlayer = (
  game: GamesList,
  player: string,
  data: CreatePlayerList
) => Promise<void>;

export type UpdateDataPlayer = (
  game: GamesList,
  player: string,
  update: UpdatePlayerList
) => Promise<void>;

export type GetDataPlayer = (
  game: GamesList,
  player: string
) => Promise<CreatePlayerList | null>;

import {
  HandleData,
  DataSet as DataSetFP,
  CreateGame as CreateGameFP,
  UpdateGame as UpdateGameFP,
  UpdatePlayer as UpdatePlayerFP,
  CreatePlayer as CreatePlayerFP
} from './floating-point-online';

type CreateGameList = CreateGameFP;

type UpdateGameList = UpdateGameFP;

type GetGameList = DataSetFP;

type CreatePlayerList = CreatePlayerFP;

type UpdatePlayerList = UpdatePlayerFP;

export type GamesList = 'floatingPoint';

export type GamesListEdited = 'Floating Point';

export type CreateDataGame = (
  game: GamesList,
  data: CreateGameList
) => Promise<void>;

export type UpdateDataGame = (
  game: GamesList,
  update: UpdateGameList
) => Promise<void>;

export type DeleteDataGame = (game: GamesList) => Promise<void>;

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

export type DeleteDataPlayer = (
  game: GamesList,
  player: string
) => Promise<void>;

export type GetDataPlayer = (
  game: GamesList,
  player: string
) => Promise<CreatePlayerList | null>;

export type InitGame = (
  game: GamesList,
  user: firebase.User,
  handleData: HandleData
) => Promise<void>;

export type RemoveListenersGame = (game: GamesList) => void;

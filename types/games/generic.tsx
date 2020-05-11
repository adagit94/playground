import {
  HandleData,
  CreateGameFP,
  UpdateGameFP,
  UpdatePlayerFP,
  PlayerFP as CreatePlayerFP
} from './floating-point-online';

type CreateGameList = CreateGameFP;

type UpdateGameList = UpdateGameFP;

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

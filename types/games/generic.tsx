import {
  HandleData,
  UpdateGameFP,
  UpdatePlayerFP,
  PlayerFP
} from './floating-point-online';

type UpdateGameList = UpdateGameFP;

type CreatePlayerList = PlayerFP;

type UpdatePlayerList = UpdatePlayerFP;

export type GamesList = 'floatingPoint';

export type InitGame = (
  game: GamesList,
  handleData: HandleData
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

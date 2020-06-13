import { CrudOperations } from 'types/generic';
import {
  HandleData,
  DataSet as DataSetFP,
  GameCreate as GameCreateFP,
  GameUpdate as GameUpdateFP,
  PlayerUpdate as PlayerUpdateFP,
  PlayerCreate as PlayerCreateFP,
  Player as PlayerFP
} from './floating-point-online';

type GameCreate = GameCreateFP;

type GameUpdate = GameUpdateFP;

type PlayerCreate = PlayerCreateFP;

type PlayerUpdate = PlayerUpdateFP;

export type GameDataSets = DataSetFP;

export type PlayerData = PlayerFP;

export type GameNames = 'floatingPoint';

export type GameNamesEdited = 'Floating Point';

export type GameList = ['floatingPoint'];

export type CrudDataGame = (
  game: GameNames,
  operation: CrudOperations,
  data?: GameCreate | GameUpdate
) => Promise<GameDataSets | void>;

export type CrudDataGamePlayer = (
  game: GameNames,
  player: string,
  operation: CrudOperations,
  data?: PlayerCreate | PlayerUpdate
) => Promise<PlayerData | void>;

export type InitGameDB = (
  game: GameNames,
  user: firebase.User,
  handleData: HandleData
) => Promise<void>;

export type RemoveListenersGame = (game: GameNames) => void;

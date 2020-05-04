import { HandleData, UpdateGameFP } from './floating-point-online';

export type GamesList = 'floatingPoint';

export type InitGame = (
  game: GamesList,
  handleData: HandleData
) => Promise<void>;

export type UpdateRecordGame = (
  game: GamesList,
  update: UpdateGameFP
) => Promise<void>;

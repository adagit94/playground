import { GamesList } from 'types/games/generic';

export type KeyReplacer = (
  match: string,
  first: string,
  afterFirst: string,
  next: string,
  afterNext: string
) => string;

export type CalculateMostPlayed = (user: string) => Promise<GamesList>;

export type UpdatePlayedTime = (
  game: GamesList,
  players: string[],
  timestamps: [number, number]
) => Promise<void>;

export type ConvertPlayedTime = (playedTime: number) => string;

export type TransformAndSort = <T, K extends keyof T>(
  dataObj: T,
  ordering: 'ascending' | 'descending',
  orderBy?: keyof T[K]
) => [K, number][];

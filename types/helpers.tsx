import { GameNames } from 'types/games/generic';

export type KeyReplacer = (
  match: string,
  first: string,
  afterFirst: string,
  next: string,
  afterNext: string
) => string;

export type CalculateMostPlayed = (user: string) => Promise<GameNames>;

export type UpdatePlayedTime = (
  game: GameNames,
  players: string[],
  timestamps: [number, number]
) => Promise<void>;

export type ConvertPlayedTime = (playedTime: number) => string;

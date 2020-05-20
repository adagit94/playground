import { GamesList } from 'types/games/generic';

export type StatReplacer = (
  match: string,
  first: string,
  afterFirst: string,
  next: string,
  afterNext: string
) => string;

export type CalculateMostPlayed = (user: string) => Promise<string>;

export type UpdatePlayedTime = (
  game: GamesList,
  players: string[],
  timestamps: [number, number]
) => Promise<void>;

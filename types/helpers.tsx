import { GamesList, GamesListEdited } from 'types/games/generic';

export type KeyReplacer = (
  match: string,
  first: string,
  afterFirst: string,
  next: string,
  afterNext: string
) => string;

export type CalculateMostPlayed = (user: string) => Promise<GamesListEdited>;

export type UpdatePlayedTime = (
  game: GamesList,
  players: string[],
  timestamps: [number, number]
) => Promise<void>;

export type ConvertPlayedTime = (playedTime: number) => string;

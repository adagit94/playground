export type StatReplacer = (
  match: string,
  first: string,
  afterFirst: string,
  next: string,
  afterNext: string
) => string;

export type CalculateMostPlayed = (user: string) => Promise<string>;

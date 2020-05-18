import { StatesUser } from '../types/user';

export const DEFAULTS_USER: StatesUser = {
  lastPlayed: '-',
  timePlayed: 0,
  games: {
    floatingPoint: {
      wins: 0,
      gatheredPoints: 0
    }
  }
};

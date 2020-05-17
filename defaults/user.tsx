import { StatesUser } from '../types/user';

export const userDefaults: StatesUser = {
  lastPlayed: '-',
  timePlayed: 0,
  games: {
    floatingPoint: {
      wins: 0,
      gatheredPoints: 0
    }
  }
};

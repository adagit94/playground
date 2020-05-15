import { StatesUser } from '../types/user';

export const userDefaults: StatesUser = {
  lastPlayed: '-',
  games: {
    floatingPoint: {
      wins: 0,
      gatheredPoints: 0
    }
  }
};

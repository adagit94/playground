import { StatesUser } from '../types/user';

export const initUser: StatesUser = {
  lastPlayed: undefined,
  games: {
    floatingPoint: {
      wins: undefined,
      gatheredPoints: undefined
    }
  }
};

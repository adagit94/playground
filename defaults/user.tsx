import { StatesUser } from '../types/user';

export const defaultsUser: StatesUser = {
  lastPlayed: '',
  games: {
    floatingPoint: {
      wins: 0,
      gatheredPoints: 0
    }
  }
};

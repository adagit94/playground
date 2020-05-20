import { StatesUser, InitUserDefaults } from 'types/user';

export const initUserDefaults: InitUserDefaults = user => {
  const userDefaults: StatesUser = {
    registred: user.metadata.creationTime,
    lastPlayed: '-',
    mostPlayed: '-',
    games: {
      floatingPoint: {
        wins: 0,
        gatheredPoints: 0,
        playedTime: 0
      }
    }
  };

  return userDefaults;
};

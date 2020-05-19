import { InitUserDefaults } from 'types/user';

export const initUserDefaults: InitUserDefaults = user => {
  return {
    registred: user.metadata.creationTime,
    lastPlayed: '-',
    mostPlayed: '-',
    games: {
      floatingPoint: {
        wins: 0,
        gatheredPoints: 0,
        timePlayed: 0
      }
    }
  };
};

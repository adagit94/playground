import { statDateEditReg } from 'regs/stats';
import { InitUserDefaults } from 'types/user';

export const initUserDefaults: InitUserDefaults = user => {
  return {
    registred: statDateEditReg.exec(user.metadata.creationTime)[0],
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

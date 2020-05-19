import { getDataUserGames } from 'firebase/db';
import { gamesList } from './lists';
import { StatReplacer, CalculateMostPlayed } from 'types/helpers';

export const statReplacer: StatReplacer = (
  match,
  first,
  afterFirst,
  next,
  afterNext
) => {
  let edited = first.toUpperCase() + afterFirst;

  if (next) {
    edited +=
      ' ' + (gamesList.includes(match) ? next : next.toLowerCase()) + afterNext;
  }

  return edited;
};

export const calculateMostPlayed: CalculateMostPlayed = async user => {
  const gamesStats = await getDataUserGames(user);

  const games = Object.keys(gamesStats);
  const times: number[] = games.map(game => gamesStats[game].timePlayed);

  const sortedTimes = [...times].sort((a, b) => a - b).reverse();
  const highestTime = sortedTimes[0];
  const highestTimeindex = times.indexOf(highestTime);

  const mostPlayed = games[highestTimeindex];

  return mostPlayed;
};


const { timestampStart, timestampEnd } = statesGame;
console.log('evalgame timestampend:' + timestampEnd);

// vyresit predbezne odpojeni (prechod na jinou stranku, pryc z webu, nikoliv refresh)
for (const player in statesPlayers) {
  const gameStats = await getDataUserGame(player, 'floatingPoint');

  await updateDataUser(player, {
    games: {
      floatingPoint: {
        timePlayed: gameStats.timePlayed + (timestampEnd - timestampStart)
      }
    }
  });

  const mostPlayed = await calculateMostPlayed(player);

  if (mostPlayed !== 'floatingPoint') {
    updateDataUser(player, {
      mostPlayed
    });
  }
}
};

const update
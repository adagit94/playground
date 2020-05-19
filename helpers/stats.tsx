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

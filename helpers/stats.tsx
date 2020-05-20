import { getDataUser, getDataUserGames, updateDataUser } from 'firebase/db';
import {
  StatReplacer,
  UpdatePlayedTime,
  CalculateMostPlayed
} from 'types/helpers';

const gamesList = ['floatingPoint'];

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
  const games = await getDataUserGames(user);

  const gamesNames = Object.keys(games);
  const gamesTimes: number[] = gamesNames.map(game => games[game].playedTime);

  const sortedGamesTimes = [...gamesTimes].sort((a, b) => a - b).reverse();
  const highestTime = sortedGamesTimes[0];
  const highestTimeindex = gamesTimes.indexOf(highestTime);

  const mostPlayed = gamesNames[highestTimeindex];

  return mostPlayed;
};

export const updatePlayedTime: UpdatePlayedTime = async (
  game,
  players,
  timestamps
) => {
  const [start, end] = timestamps;
  const playedTime = end - start;

  for (const player of players) {
    const userData = await getDataUser(player);
    const { mostPlayed: mostPlayedPrev, games } = userData;

    await updateDataUser(player, {
      games: {
        [game]: {
          playedTime: games[game].playedTime + playedTime
        }
      }
    });

    const mostPlayedNew = await calculateMostPlayed(player);

    if (mostPlayedNew === game && mostPlayedPrev !== game) {
      updateDataUser(player, {
        mostPlayed: mostPlayedNew
      });
    }
  }
};

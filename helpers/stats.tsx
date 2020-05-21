import {
  getDataUser,
  getDataUserGames,
  updateDataUser,
  updateDataUserGame
} from 'firebase/db';
import {
  StatReplacer,
  UpdatePlayedTime,
  CalculateMostPlayed,
  ConvertPlayedTime
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

  const sortedGamesTimes = [...gamesTimes].sort((a, b) => a + b);
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

    await updateDataUserGame(game, player, {
      playedTime: games[game].playedTime + playedTime
    });

    const mostPlayedNew = await calculateMostPlayed(player);

    if (mostPlayedNew === game && mostPlayedPrev !== game) {
      updateDataUser(player, {
        mostPlayed: mostPlayedNew
      });
    }
  }
};

export const convertPlayedTime: ConvertPlayedTime = playedTime => {
  const seconds = playedTime / 1000;
  const minutes = seconds / 60;
  const hours = minutes / 60;
  const days = hours / 24;

  let timeString = '';

  if (days >= 1) {
    timeString += `${Math.floor(days)} D `;
  }

  if (hours >= 1) {
    timeString += `${Math.floor(hours - Math.floor(days) * 24)} H `;
  }

  if (minutes >= 1) {
    timeString += `${Math.floor(minutes - Math.floor(hours) * 60)} M `;
  }

  timeString += `${Math.round(seconds - Math.floor(minutes) * 60)} S`;

  return timeString;
};

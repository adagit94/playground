import { keyEditReg } from 'regs/db';
import { keyReplacer } from 'helpers/regs';
import { GamesListEdited, GamesList } from 'types/games/generic';
import {
  UpdatePlayedTime,
  CalculateMostPlayed,
  ConvertPlayedTime
} from 'types/helpers';

import {
  getDataUser,
  getDataUserGames,
  updateDataUser,
  updateDataUserGame
} from 'firebase/db';

export const calculateMostPlayed: CalculateMostPlayed = async user => {
  const games = await getDataUserGames(user);

  const times: [GamesList, number][] = [];

  for (const game in games) {
    times.push([game as GamesList, games[game].playedTime]);
  }

  times.sort((a, b) => a[1] - b[1]).reverse();

  const mostPlayed = times[0][0];

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

    const editedMostPlayedNew = mostPlayedNew.replace(
      keyEditReg,
      keyReplacer
    ) as GamesListEdited;

    if (mostPlayedNew === game && mostPlayedPrev !== game) {
      updateDataUser(player, {
        mostPlayed: editedMostPlayedNew
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

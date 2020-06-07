import { crudDataUser, crudDataUserGame } from 'firebase/db';
import { keyEditReg } from 'regs/db';
import { keyReplacer } from 'helpers/regs';
import { GameNamesEdited, GameNames } from 'types/games/generic';
import { StatesUser, GamesData } from 'types/user';
import {
  UpdatePlayedTime,
  CalculateMostPlayed,
  ConvertPlayedTime
} from 'types/helpers';

export const calculateMostPlayed: CalculateMostPlayed = async user => {
  const games = (await crudDataUserGame(user, 'all', 'read')) as GamesData;

  let times: [GameNames, number][] = [];

  for (const game in games) {
    times.push([game as GameNames, games[game].playedTime]);
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
    const userData = (await crudDataUser(player, 'read')) as StatesUser;
    const { mostPlayed: mostPlayedPrev, games } = userData;

    await crudDataUserGame(player, game, 'update', {
      playedTime: games[game].playedTime + playedTime
    });

    const mostPlayedNew = await calculateMostPlayed(player);

    const editedMostPlayedNew = mostPlayedNew.replace(
      keyEditReg,
      keyReplacer
    ) as GameNamesEdited;

    if (mostPlayedNew === game && mostPlayedPrev !== game) {
      crudDataUser(player, 'update', {
        mostPlayed: editedMostPlayedNew
      });
    }
  }
};

export const convertPlayedTime: ConvertPlayedTime = playedTime => {
  let seconds = playedTime / 1000;
  let minutes = seconds / 60;
  let hours = minutes / 60;
  let days = hours / 24;

  let timeString = '';

  if (days >= 1) {
    timeString += `${Math.floor(days)} D `;
  }

  if (hours >= 1) {
    hours = (days - Math.floor(days)) * 24;
    timeString += `${hours} H `;
  }

  if (minutes >= 1) {
    minutes = (hours - Math.floor(hours)) * 60;
    timeString += `${minutes} M `;
  }

  timeString += `${minutes - Math.floor(minutes) * 60} S`;

  return timeString;
};

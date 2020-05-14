import * as firebase from 'firebase/app';
import 'firebase/firebase-database';

import { defaultsUser } from '../defaults/user';
import { UpdateDataFP } from '../types/games/floating-point-online';
import {
  CreateDataGame,
  UpdateDataGame,
  ClearDataGame,
  GetDataGame,
  CreateDataPlayer,
  UpdateDataPlayer,
  GetDataPlayer,
  InitGame,
  ClearGame
} from '../types/games/generic';

import {
  StatesUser,
  CreateDataUser,
  GetDataUser,
  GetDataUserGame,
  UpdateDataUser,
  GameDataList
} from '../types/user';

export const createDataUser: CreateDataUser = async (user, data) => {
  const userRef = firebase.database().ref(`users/${user}`);

  await userRef.set(data).catch(err => console.error(err));
};

export const updateDataUser: UpdateDataUser = async (user, update) => {
  const userRef = firebase.database().ref(`users/${user}`);

  await userRef.update(update).catch(err => console.error(err));
};

export const getDataUser: GetDataUser = async user => {
  const userRef = firebase.database().ref(`users/${user}`);

  const userData: StatesUser = await userRef
    .once('value')
    .then(snapshot => snapshot.val())
    .catch(err => console.error(err));

  if (!userData) createDataUser(user, defaultsUser);

  return userData || defaultsUser;
};

export const getDataUserGame: GetDataUserGame = async (user, game) => {
  const gameRef = firebase.database().ref(`users/${user}/games/${game}`);

  const gameData: GameDataList = await gameRef
    .once('value')
    .then(snapshot => snapshot.val())
    .catch(err => console.error(err));

  return gameData;
};

export const createDataGame: CreateDataGame = async (game, data) => {
  const gameRef = firebase.database().ref(`games/${game}/game`);

  await gameRef.set(data).catch(err => console.error(err));
};

export const updateDataGame: UpdateDataGame = async (game, update) => {
  const gameRef = firebase.database().ref(`games/${game}/game`);

  await gameRef.update(update).catch(err => console.error(err));
};

export const clearDataGame: ClearDataGame = async game => {
  const gameRef = firebase.database().ref(`games/${game}`);

  await gameRef.remove().catch(err => console.error(err));
};

export const getDataGame: GetDataGame = async game => {
  const gameRef = firebase.database().ref(`games/${game}`);

  const data = gameRef
    .once('value')
    .then(snapshot => snapshot.val())
    .catch(err => console.error(err));

  return data;
};

export const createDataPlayer: CreateDataPlayer = async (
  game,
  player,
  data
) => {
  const playerRef = firebase.database().ref(`games/${game}/players/${player}`);

  //if (!user.photoURL) return alert('You must upload avatar before initialization of game');

  await playerRef.set(data).catch(err => console.error(err));
};

export const updateDataPlayer: UpdateDataPlayer = async (
  game,
  player,
  update
) => {
  const playerRef = firebase.database().ref(`games/${game}/players/${player}`);

  await playerRef.update(update).catch(err => console.error(err));
};

export const getDataPlayer: GetDataPlayer = async (game, player) => {
  const playerRef = firebase.database().ref(`games/${game}/players/${player}`);

  const data = playerRef
    .once('value')
    .then(snapshot => snapshot.val())
    .catch(err => console.error(err));

  return data;
};

export const updateDataFP: UpdateDataFP = async update => {
  const pointRef = firebase.database().ref('games/floatingPoint/fp');

  await pointRef.update(update).catch(err => console.error(err));
};

export const initGame: InitGame = async (game, user, handleData) => {
  const player = user.uid;

  const gameRef = firebase.database().ref(`games/${game}`);
  const playerRef = firebase.database().ref(`games/${game}/players/${player}`);

  const gameExist = await gameRef
    .once('value')
    .then(data => data.exists())
    .catch(err => console.error(err));

  const playerExist = await playerRef
    .once('value')
    .then(data => data.exists())
    .catch(err => console.error(err));

  switch (game) {
    case 'floatingPoint':
      if (!gameExist) {
        createDataGame('floatingPoint', {
          state: 'conf',
          admin: player
        });
      }

      if (!playerExist) {
        createDataPlayer('floatingPoint', player, {
          username: user.displayName || user.email,
          avatar: user.photoURL,
          top: 0,
          left: 0,
          score: 0,
          isReady: false
        });
      }

      gameRef.child('game').on('value', data => {
        handleData('game', data.val());
      });

      gameRef.child('players').on('value', data => {
        handleData('players', data.val());
      });

      gameRef.child('fp').on('value', data => {
        handleData('fp', data.val());
      });

      break;
  }
};

export const clearGame: ClearGame = game => {
  const gameRef = firebase.database().ref(`games/${game}`);

  switch (game) {
    case 'floatingPoint':
      gameRef.child('game').off('value');
      gameRef.child('players').off('value');
      gameRef.child('fp').off('value');

      break;
  }
};

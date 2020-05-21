import * as firebase from 'firebase/app';
import 'firebase/firebase-database';

import { UpdateDataFP } from 'types/games/floating-point-online';
import { initUserDefaults } from 'defaults/user';
import {
  initGameDefaults,
  initPlayerDefaults
} from 'defaults/games/floating-point-online';

import {
  CreateDataGame,
  UpdateDataGame,
  DeleteDataGame,
  GetDataGame,
  CreateDataPlayer,
  UpdateDataPlayer,
  DeleteDataPlayer,
  GetDataPlayer,
  InitGame,
  RemoveListenersGame
} from 'types/games/generic';

import {
  InitUserDB,
  RemoveListenerUser,
  CreateDataUser,
  GetDataUser,
  GetDataUserGames,
  GetDataUserGame,
  UpdateDataUser,
  UpdateDataUserGame,
  GameDataList,
  Games,
  StatesUser
} from 'types/user';

export const createDataUser: CreateDataUser = async (user, data) => {
  const userRef = firebase.database().ref(`users/${user}`);

  await userRef.set(data).catch(err => console.error(err));
};

export const updateDataUser: UpdateDataUser = async (user, update) => {
  const userRef = firebase.database().ref(`users/${user}`);

  await userRef.update(update).catch(err => console.error(err));
};

export const updateDataUserGame: UpdateDataUserGame = async (
  game,
  user,
  update
) => {
  const gameRef = firebase.database().ref(`users/${user}/games/${game}`);

  await gameRef.update(update).catch(err => console.error(err));
};

export const getDataUser: GetDataUser = async user => {
  const userRef = firebase.database().ref(`users/${user}`);

  const userData: StatesUser = await userRef
    .once('value')
    .then(snapshot => snapshot.val())
    .catch(err => console.error(err));

  return userData;
};

export const getDataUserGames: GetDataUserGames = async user => {
  const gamesRef = firebase.database().ref(`users/${user}/games`);

  const gamesData: Games = await gamesRef
    .once('value')
    .then(snapshot => snapshot.val())
    .catch(err => console.error(err));

  return gamesData;
};

export const getDataUserGame: GetDataUserGame = async (user, game) => {
  const gameRef = firebase.database().ref(`users/${user}/games/${game}`);

  const gameData: GameDataList = await gameRef
    .once('value')
    .then(snapshot => snapshot.val())
    .catch(err => console.error(err));

  return gameData;
};

export const initUserDB: InitUserDB = async (user, handleData) => {
  const { uid } = user;

  const userRef = firebase.database().ref(`users/${uid}`);

  const userExists = await userRef
    .once('value')
    .then(data => data.exists())
    .catch(err => console.error(err));

  if (!userExists) {
    const userData = initUserDefaults(user);

    createDataUser(uid, userData);
  }

  userRef.on('value', data => {
    handleData(data.val());
  });
};

export const removeListenerUser: RemoveListenerUser = user => {
  const userRef = firebase.database().ref(`users/${user}`);

  userRef.off('value');
};

export const createDataGame: CreateDataGame = async (game, data) => {
  const gameRef = firebase.database().ref(`games/${game}/game`);

  await gameRef.set(data).catch(err => console.error(err));
};

export const updateDataGame: UpdateDataGame = async (game, update) => {
  const gameRef = firebase.database().ref(`games/${game}/game`);

  await gameRef.update(update).catch(err => console.error(err));
};

export const deleteDataGame: DeleteDataGame = async game => {
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

export const deleteDataPlayer: DeleteDataPlayer = async (game, player) => {
  const playerRef = firebase.database().ref(`games/${game}/players/${player}`);

  await playerRef.remove().catch(err => console.error(err));
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
        const gameData = initGameDefaults(player);

        createDataGame('floatingPoint', gameData);
      }

      if (!playerExist) {
        const playerData = initPlayerDefaults(user);

        createDataPlayer('floatingPoint', player, playerData);
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

export const removeListenersGame: RemoveListenersGame = game => {
  const gameRef = firebase.database().ref(`games/${game}`);

  switch (game) {
    case 'floatingPoint':
      gameRef.child('game').off('value');
      gameRef.child('players').off('value');
      gameRef.child('fp').off('value');

      break;
  }
};

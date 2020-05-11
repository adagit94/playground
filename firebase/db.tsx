import * as firebase from 'firebase/app';
import 'firebase/firebase-database';

import { defaultsUser } from '../defaults/user';
import { GetDataFP, UpdateDataFP } from '../types/games/floating-point-online';
import {
  InitGame,
  UpdateDataGame,
  CreateDataPlayer,
  UpdateDataPlayer
} from '../types/games/generic';

import {
  StatesUser,
  CreateDataUser,
  GetDataUser,
  UpdateDataUser
} from '../types/user';

export const createDataUser: CreateDataUser = async (user, data) => {
  const userRef = firebase.database().ref(`users/${user}`);

  await userRef.set(data).catch(err => console.error(err));
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

export const updateDataUser: UpdateDataUser = async (user, update) => {
  const userRef = firebase.database().ref(`users/${user}`);

  await userRef.update(update).catch(err => console.error(err));
};

export const updateDataGame: UpdateDataGame = async (game, update) => {
  const gameRef = firebase.database().ref(`games/${game}/game`);

  await gameRef.update(update).catch(err => console.error(err));
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

const getDataFP: GetDataFP = async dataSet => {
  const dataSetRef = firebase.database().ref(`games/floatingPoint/${dataSet}`);

  const data = await dataSetRef
    .once('value')
    .then(snapshot => snapshot.val())
    .catch(err => console.error(err));

  return data;
};

export const updateDataFP: UpdateDataFP = async update => {
  const pointRef = firebase.database().ref('games/floatingPoint/fp');

  await pointRef.update(update).catch(err => console.error(err));
};

export const initGame: InitGame = async (game, admin, handleData) => {
  const gameRef = firebase.database().ref(`games/${game}`);

  const exists = await gameRef
    .once('value')
    .then(snapshot => snapshot.exists())
    .catch(err => console.error(err));

  switch (game) {
    case 'floatingPoint':
      gameRef.child('game').on('value', data => {
        console.log(data.val());
        handleData('game', data.val());
      });

      gameRef.child('players').on('value', data => {
        handleData('players', data.val());
      });

      gameRef.child('fp').on('value', data => {
        handleData('fp', data.val());
      });

      if (!exists) {
        await gameRef
          .child('game')
          .set({ state: 'conf', admin })
          .catch(err => console.error(err));
      }

      break;
  }
};

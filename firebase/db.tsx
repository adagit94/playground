import * as firebase from 'firebase/app';
import 'firebase/firebase-database';

import { defaultsUser } from '../defaults/user';
import {
  StatesUser,
  CreateDataUser,
  GetDataUser,
  UpdateDataUser
} from '../types/user';
import { InitGame, UpdateDataGame } from '../types/games/generics';
import {
  StatesPlayers,
  Player,
  CreateDataPlayer,
  UpdateDataPlayer,
  GetData,
  UpdateDataFP
} from '../types/games/floating-point-online';

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

  if (Array.isArray(update)) {
    const [game, action] = update;

    await userRef
      .child(`games/${game}`)
      .transaction(data => {
        switch (action) {
          case 'addPoint':
            return data[game].gatheredPoints++;

          case 'win':
            return data[game].wins++;
        }
      })
      .catch(err => console.error(err));
  } else {
    await userRef.update(update).catch(err => console.error(err));
  }
};

const getData: GetData = async dataSet => {
  const dataSetRef = firebase.database().ref(`games/floatingPoint/${dataSet}`);

  const data = await dataSetRef
    .once('value')
    .then(snapshot => snapshot.val())
    .catch(err => console.error(err));

  return data;
};

export const initGame: InitGame = async (game, handleData) => {
  const gameRef = firebase.database().ref(`games/${game}`);

  const haveData = await gameRef
    .once('value')
    .then(snapshot => snapshot.hasChildren())
    .catch(err => console.error(err));

  //console.log(haveData);

  switch (game) {
    case 'floatingPoint':
      if (!haveData) {
        gameRef
          .child('game')
          .set({ state: 'conf', width: 0, height: 0 })
          .catch(err => console.error(err));

        gameRef
          .child('players')
          .set({})
          .catch(err => console.error(err));

        gameRef
          .child('fp')
          .set({ top: 0, left: 0 })
          .catch(err => console.error(err));
      }

      gameRef.child('game').on('value', async () => {
        const data = await getData('game');

        handleData('game', data);
      });

      gameRef.child('players').on('value', async () => {
        const data = await getData('players');
        //console.log(players);

        handleData('players', data);
      });

      gameRef.child('fp').on('value', async () => {
        const data = await getData('fp');

        handleData('fp', data);
      });

      break;
  }
};

export const createDataPlayer: CreateDataPlayer = async user => {
  const playerRef = firebase
    .database()
    .ref(`games/floatingPoint/players/${user.uid}`);

  const player: Player = {
    username: user.displayName || user.email,
    avatar: user.photoURL,
    top: 0,
    left: 0,
    score: 0,
    isReady: false
  };

  await playerRef.set(player).catch(err => console.error(err));
};

export const updateDataPlayer: UpdateDataPlayer = async (
  player,
  action,
  conf
) => {
  const playerRef = firebase
    .database()
    .ref(`games/floatingPoint/players/${player}`);

  if (action !== 'changePos') {
    await playerRef
      .transaction(data => {
        switch (action) {
          case 'move':
            return conf.move.operation === 'add'
              ? {
                  ...data,
                  [conf.move.direction]: data[conf.move.direction]++
                }
              : {
                  ...data,
                  [conf.move.direction]: data[conf.move.direction]--
                };

          case 'changeReady':
            return { ...data, isReady: !data.isReady };

          case 'addScore':
            return { ...data, score: data.score++ };
        }
      })
      .catch(err => console.error(err));
  } else {
    await playerRef
      .update({
        top: conf.changePos.top,
        left: conf.changePos.left
      })
      .catch(err => console.error(err));
  }
};

export const updateDataFP: UpdateDataFP = async update => {
  const pointRef = firebase.database().ref('games/floatingPoint/fp');

  await pointRef.update(update).catch(err => console.error(err));
};

export const updateDataGame: UpdateDataGame = async (game, update) => {
  const gameRef = firebase.database().ref(`games/${game}`);

  await gameRef.update(update).catch(err => console.error(err));
};

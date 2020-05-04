import * as firebase from 'firebase/app';
import 'firebase/firebase-database';

import { defaultsUser } from '../defaults/user';
import {
  StatesUser,
  CreateRecordUser,
  GetRecordUser,
  UpdateRecordUser
} from '../types/user';
import { InitGame, UpdateRecordGame } from '../types/games/generics';
import {
  StatesPlayers,
  Player,
  CreateRecordPlayer,
  UpdateRecordPlayer,
  GetRecordPlayers,
  UpdateRecordFP
} from '../types/games/floating-point-online';

export const createRecordUser: CreateRecordUser = async (user, record) => {
  const userRef = firebase.database().ref(`users/${user}`);

  await userRef.set(record).catch(err => console.error(err));
};

export const getRecordUser: GetRecordUser = async user => {
  const userRef = firebase.database().ref(`users/${user}`);

  const userRecord: StatesUser = await userRef
    .once('value')
    .then(snapshot => snapshot.val())
    .catch(err => console.error(err));

  if (!userRecord) createRecordUser(user, defaultsUser);

  return userRecord || defaultsUser;
};

export const updateRecordUser: UpdateRecordUser = async (user, update) => {
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

export const getRecordPlayers: GetRecordPlayers = async () => {
  const playersRef = firebase.database().ref('games/floatingPoint/players');

  const players: StatesPlayers = await playersRef
    .once('value')
    .then(snapshot => snapshot.val())
    .catch(err => console.error(err));

  return players;
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

      gameRef.child('game').on('child_changed', data => {
        console.log('game change');
        console.log(data.val());
        handleData('game', data.val());
      });

      gameRef.child('players').on('child_added', async data => {
        console.log('player added');
        const player = data.val();
        const playerID = data.key;

        let players = await getRecordPlayers();

        players = { ...players, [playerID]: { ...player } };

        handleData('players', players);
      });

      gameRef.child('players').on('child_changed', data => {
        console.log('players change');
        console.log(data.val());
        handleData('player', data.val(), data.key);
      });

      gameRef.child('fp').on('child_changed', data => {
        console.log('fp change');
        console.log(data.val());
        handleData('fp', data.val());
      });

      break;
  }
};

export const createRecordPlayer: CreateRecordPlayer = async user => {
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

export const updateRecordPlayer: UpdateRecordPlayer = async (
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
              ? data[conf.move.direction]++
              : data[conf.move.direction]--;

          case 'changeReady':
            return !data.isReady;

          case 'addScore':
            return data.score++;
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

export const updateRecordFP: UpdateRecordFP = async update => {
  const pointRef = firebase.database().ref('games/floatingPoint/fp');

  await pointRef.update(update).catch(err => console.error(err));
};

export const updateRecordGame: UpdateRecordGame = async (game, update) => {
  const gameRef = firebase.database().ref(`games/${game}`);

  await gameRef.update(update).catch(err => console.error(err));
};

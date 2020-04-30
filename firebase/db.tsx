import * as firebase from 'firebase/app';
import 'firebase/firebase-database';

import { defaultsUser } from '../defaults/user';
import { initFirebaseApp } from './init-firebase';
import { initPlayer, getCurrentUser } from './helpers';
import { StatesUser, GamesList, UpdatesList } from '../types/user';
import {
  StatesPlayers,
  UpdatePlayer,
  StatesFP,
  HandleChange
} from '../types/games/floating-point-online';

export const createRecordUser = async (
  uid: string,
  record: StatesUser
): Promise<void> => {
  const userRef = firebase.database().ref(`users/${uid}`);

  await userRef.set(record).catch(err => console.error(err));
};

export const getRecordUser = async (uid: string): Promise<StatesUser> => {
  const userRef = firebase.database().ref(`users/${uid}`);

  const user: StatesUser = await userRef
    .once('value')
    .then(snapshot => snapshot.val())
    .catch(err => console.error(err));

  if (!user) createRecordUser(uid, defaultsUser);

  return user || defaultsUser;
};

export const updateRecordUser = async (
  user: string,
  update: UpdatesList,
  game?: GamesList
): Promise<void> => {
  const userRef = firebase.database().ref(`users/${user}`);

  if (game) {
    await userRef.child(`games/${game}`).update(update);
  } else {
    await userRef.update(update);
  }
};

export const initGameFP = async (): Promise<void> => {
  const gameRef = firebase.database().ref('games/floatingPoint');

  const haveData = await gameRef
    .once('value')
    .then(snapshot => snapshot.exists())
    .catch(err => console.error(err));

  if (!haveData) {
    gameRef.child('game').set({ kind: 'game', state: 'conf' });
    gameRef.child('players').set({ kind: 'players' });
    gameRef.child('fp').set({ kind: 'fp', top: null, left: null });
  }

  gameRef.child(`players/${user.uid}`).set(initPlayer(user));
};

export const getRecordPlayers = async (): Promise<StatesPlayers> => {
  const playersRef = firebase.database().ref('games/floatingPoint/players');

  const players: StatesPlayers = await playersRef
    .once('value')
    .then(snapshot => snapshot.val())
    .catch(err => console.error(err));

  return players;
};

export const updateRecordPlayer = async (
  player: string,
  update: UpdatePlayer
): Promise<void> => {
  const playerRef = firebase
    .database()
    .ref(`games/floatingPoint/players/${player}`);

  await playerRef.update(update);
};

export const updateRecordFP = async (update: StatesFP): Promise<void> => {
  const pointRef = firebase.database().ref('games/floatingPoint/fp');

  await pointRef.update(update);
};

export const addListenersFP = (handleChange: HandleChange): void => {
  const gameRef = firebase.database().ref('games/floatingPoint');

  gameRef.child('game').on('child_changed', snapshot => {
    handleChange(snapshot.val());
    console.log('game change');
    console.log(snapshot);
  });

  gameRef.child('players').on('child_changed', snapshot => {
    handleChange(snapshot.val());
    console.log('players change');
    console.log(snapshot);
  });

  gameRef.child('fp').on('child_changed', snapshot => {
    handleChange(snapshot.val());
    console.log('fp change');
    console.log(snapshot);
  });
};

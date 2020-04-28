import * as firebase from 'firebase/app';
import 'firebase/firebase-database';

import { StatesUser } from '../types/user';
import { StatesPlayers } from '../types/games/floating-point-online';
import { defaultsUser } from '../defaults/user';
import { initPlayer, getCurrentUser } from './helpers';
import { initGame, initFP } from '../inits/games/floating-point-online';

export const createRecordUser = async (uid, record): Promise<void> => {
  await firebase
    .database()
    .ref(`users/${uid}`)
    .set(record)
    .catch(err => console.error(err));
};

export const createRecordGame = async (game, uid, record): Promise<void> => {
  await firebase
    .database()
    .ref(`games/${game}/${uid}`)
    .set(record)
    .catch(err => console.error(err));
};

export const getRecordUser = async (uid): Promise<StatesUser> => {
  const user = await firebase
    .database()
    .ref(`users/${uid}`)
    .once('value')
    .then(snapshot => snapshot.val())
    .catch(err => console.error(err));

  if (!user) createRecordUser(uid, defaultsUser);

  return user || defaultsUser;
};

export const initGameFP = async (): Promise<void> => {
  const user = getCurrentUser();
  const gameRef = firebase.database().ref('games/floatingPoint');

  const haveData = await gameRef
    .once('value')
    .then(snapshot => snapshot.exists())
    .catch(err => console.error(err));

  if (!haveData) {
    gameRef.child('statesGame').set(initGame);
    gameRef.child('statesFP').set(initFP);
  }

  gameRef.child(`statesPlayers/${user.uid}`).set(initPlayer(user));
};

export const getPlayersFP = async (): Promise<StatesPlayers> => {
  const playersRef = firebase
    .database()
    .ref('games/floatingPoint/statesPlayers');

  const players = await playersRef
    .once('value')
    .then(snapshot => snapshot.val())
    .catch(err => console.error(err));

  return players;
};

export const addListenersFP = (/*handleChange: Function*/): void => {
  const gameRef = firebase.database().ref('games/floatingPoint');

  gameRef.child('statesGame').on('child_changed', snapshot => {
    //handleChange();
    console.log('statesGame change');
    console.log(snapshot);
  });

  gameRef.child('statesPlayers').on('child_changed', snapshot => {
    //handleChange();
    console.log('statesPlayers change');
    console.log(snapshot);
  });

  gameRef.child('statesFP').on('child_changed', snapshot => {
    // handleChange();
    console.log('statesFP change');
    console.log(snapshot);
  });
};

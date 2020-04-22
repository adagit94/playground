import * as firebase from 'firebase/app';
import 'firebase/firebase-database';

import { StatesUser } from '../types/user';
import { defaultsUser } from '../defaults/user';

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

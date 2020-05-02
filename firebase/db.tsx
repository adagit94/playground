import * as firebase from 'firebase/app';
import 'firebase/firebase-database';

import { defaultsUser } from '../defaults/user';
import { StatesUser, GamesList, UpdatesList } from '../types/user';
import {
  StatesPlayers,
  UpdatePlayer,
  StatesFP,
  HandleChange,
  Player
} from '../types/games/floating-point-online';

export const createRecordUser = async (
  user: string,
  record: StatesUser
): Promise<void> => {
  const userRef = firebase.database().ref(`users/${user}`);

  await userRef.set(record).catch(err => console.error(err));
};

export const getRecordUser = async (user: string): Promise<StatesUser> => {
  const userRef = firebase.database().ref(`users/${user}`);

  const userRecord: StatesUser = await userRef
    .once('value')
    .then(snapshot => snapshot.val())
    .catch(err => console.error(err));

  if (!userRecord) createRecordUser(user, defaultsUser);

  return userRecord || defaultsUser;
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

export const createRecordPlayer = async (
  user: firebase.User
): Promise<void> => {
  const playerRef = firebase
    .database()
    .ref(`games/floatingPoint/players/${user.uid}`);

  const player: Player = {
    kind: 'player',
    username: user.displayName || user.email,
    avatar: user.photoURL,
    top: 0,
    left: 0,
    score: 0,
    isReady: false
  };

  await playerRef.set(player);
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

export const initGame = async (
  game: GamesList,
  handleChange: HandleChange
): Promise<void> => {
  const gameRef = firebase.database().ref(`games/${game}`);

  const haveData = await gameRef
    .once('value')
    .then(snapshot => snapshot.hasChildren())
    .catch(err => console.error(err));

  //console.log(haveData);

  switch (game) {
    case 'floatingPoint':
      if (!haveData) {
        gameRef.child('game').set({ kind: 'game', state: 'conf' });
        gameRef.child('players').set({ kind: 'players' });
        gameRef.child('fp').set({ kind: 'fp', top: 0, left: 0 });
      }

      gameRef.child('game').on('child_changed', snapshot => {
        console.log('game change');
        console.log(snapshot);
        handleChange(snapshot.val());
      });

      gameRef.child('players').on('child_added', async snapshot => {
        console.log('player added');
        const player = snapshot.val();
        const playerID = snapshot.key;

        let players = await getRecordPlayers();

        players = { ...players, [playerID]: { ...player } };

        handleChange(players);
      });

      gameRef.child('players').on('child_changed', snapshot => {
        console.log('players change');
        console.log(snapshot);
        handleChange(snapshot.val(), snapshot.key);
      });

      gameRef.child('fp').on('child_changed', snapshot => {
        console.log('fp change');
        console.log(snapshot);
        handleChange(snapshot.val());
      });

      break;
  }
};

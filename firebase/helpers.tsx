import * as firebase from 'firebase/app';
import 'firebase/firebase-auth';

import { Player } from '../types/games/floating-point-online';

export const getCurrentUser = (): firebase.User => firebase.auth().currentUser;

export const initPlayer = (user: firebase.User): Player => {
  const player: Player = {
    username: user.displayName || user.email,
    avatar: user.photoURL,
    top: undefined,
    left: undefined,
    score: undefined,
    isReady: false
  };

  return player;
};

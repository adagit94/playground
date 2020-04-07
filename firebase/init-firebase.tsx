import * as firebase from 'firebase/app';

import config from './config.json';

export const initFirebaseApp = (): firebase.app.App =>
  firebase.initializeApp(config);

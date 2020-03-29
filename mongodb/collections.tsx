import { Stitch, RemoteMongoClient } from 'mongodb-stitch-browser-sdk';

const APP_ID = 'playground-stitch-erflo';

const app = Stitch.hasAppClient(APP_ID)
  ? Stitch.getAppClient(APP_ID)
  : Stitch.initializeAppClient(APP_ID);

const db = app
  .getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas')
  .db('playground-db');

export const users = db.collection('users');

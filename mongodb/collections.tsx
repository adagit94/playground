import { RemoteMongoClient } from 'mongodb-stitch-browser-sdk';

import { stitchClient } from './stitch-client';

const db = stitchClient
  .getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas')
  .db('playground-db');

export const collectionUsers = db.collection('users');

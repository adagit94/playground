import * as firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyC8xL3bH7RArUFvJaimUj1LVhKIH8LnJcE',
  authDomain: 'playground-272209.firebaseapp.com',
  databaseURL: 'https://playground-272209.firebaseio.com',
  projectId: 'playground-272209',
  storageBucket: 'playground-272209.appspot.com',
  messagingSenderId: '808929928911',
  appId: '1:808929928911:web:fdfaead6189f1c0d5579ba'
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export const users = db.collection('users');

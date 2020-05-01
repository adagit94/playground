import * as firebase from 'firebase/app';
import 'firebase/firebase-auth';

export const getCurrentUser = (): firebase.User => firebase.auth().currentUser;

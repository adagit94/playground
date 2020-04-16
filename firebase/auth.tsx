import ReactDOM from 'react-dom';
import * as firebase from 'firebase/app';
import 'firebase/firebase-auth';

import { ValidatorReturn } from '../types/firebase';

const handleError = (err): void => {
  const el = document.querySelector('#errWindow');
  const msg = err.message;

  ReactDOM.render(msg, el);
};

export const initAuthObserver = (
  loggedIn: Function,
  loggedOut: Function
): void => {
  firebase.auth().onAuthStateChanged(
    user => {
      if (user) {
        loggedIn(user);
      } else {
        loggedOut();
      }
    },
    err => console.error(err)
  );
};

export const createUser = async (
  email: string,
  password: string
): Promise<void> => {
  await firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(credential => {
      history.back();

      credential.user
        .sendEmailVerification({ url: 'localhost:3000' })
        .catch(err => console.error(err));
    })
    .catch(err => handleError(err));
};

export const loginEmail = async (
  email: string,
  password: string
): Promise<void> => {
  await firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch(err => handleError(err));
};

export const loginProvider = async (
  service: 'fb' | 'google'
): Promise<void> => {
  let provider;

  switch (service) {
    case 'fb':
      provider = new firebase.auth.FacebookAuthProvider();
      break;
    case 'google':
      provider = new firebase.auth.GoogleAuthProvider();
      break;

    default:
      throw new Error('Unspecified / Wrong service');
  }

  await firebase
    .auth()
    .signInWithRedirect(provider)
    .catch(err => console.error(err));

  await firebase
    .auth()
    .getRedirectResult()
    .catch(err => console.error(err));
};

export const logout = async (): Promise<void> => {
  await firebase
    .auth()
    .signOut()
    .catch(err => console.error(err));
};

export const validator = (
  password: string,
  passwordConfirm: string
): ValidatorReturn => {
  let isValid = false;
  let equalPasswords = false;
  let count = false;
  let upper = false;
  let num = false;
  let special = false;

  if (password.length > 7) count = true;
  if (/[A-Z]/.test(password)) upper = true;
  if (/\d/.test(password)) num = true;
  if (/\W/.test(password)) special = true;

  if (password === passwordConfirm) equalPasswords = true;

  if (count && upper && num && special) isValid = true;

  return { isValid, equalPasswords, count, upper, num, special };
};

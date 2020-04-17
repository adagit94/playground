import ReactDOM from 'react-dom';
import * as firebase from 'firebase/app';
import 'firebase/firebase-auth';

import { ValidatorReturn } from '../types/firebase';

const handleError = (err, out: 'el' | 'alert' = 'alert'): void => {
  const msg = err.message;

  if (out === 'alert') {
    alert(msg);
  } else if (out === 'el') {
    const el = document.querySelector('#errWindow');

    ReactDOM.render(msg, el);
  }
};

export const logout = async (clearUser?: Function): Promise<void> => {
  await firebase
    .auth()
    .signOut()
    .catch(err => console.error(err));

  if (clearUser !== undefined) clearUser();
};

export const createUser = async (
  email: string,
  password: string
): Promise<void> => {
  await firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(credential => {
      credential.user.sendEmailVerification().catch(err => console.error(err));
      logout();
      history.back();
    })
    .catch(err => handleError(err, 'el'));
};

export const loginEmail = async (
  email: string,
  password: string,
  initUser: Function
): Promise<void> => {
  await firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(credential => {
      const user = credential.user;

      if (user.emailVerified) {
        initUser(user);
      } else {
        logout();
        alert('Please, verify your email before log in.');
      }
    })
    .catch(err => handleError(err, 'alert'));
};

export const loginProvider = async (
  service: 'fb' | 'google',
  initUser: Function
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
    .then(credential => initUser(credential.user))
    .catch(err => console.error(err));
};

export const resetPassword = async (email): Promise<void> => {
  await firebase
    .auth()
    .sendPasswordResetEmail(email)
    .then(() => history.back())
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

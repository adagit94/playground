import ReactDOM from 'react-dom';
import * as firebase from 'firebase/app';
import 'firebase/firebase-auth';
import 'firebase/firebase-storage';

import { getRecordUser } from './db';
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

export const logout = async (): Promise<void> => {
  await firebase
    .auth()
    .signOut()
    .catch(err => console.error(err));
};

export const initAuthObserver = (
  initUser: Function,
  clearUser: Function
): void => {
  firebase.auth().onAuthStateChanged(
    async userFirebase => {
      if (userFirebase) {
        if (userFirebase.emailVerified) {
          const userDB = await getRecordUser(userFirebase.uid);

          initUser(userFirebase, userDB);
        } else {
          logout();
        }
      } else {
        clearUser();
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
      credential.user.sendEmailVerification().catch(err => console.error(err));
      history.back();
    })
    .catch(err => handleError(err, 'el'));
};

export const updateUser = async (username, avatar): Promise<void> => {
  if (!username && !avatar) {
    alert('No changes were made');

    return;
  }

  const user = firebase.auth().currentUser;
  const updateObj: { displayName?: string; photoURL?: string } = {};

  if (username) updateObj.displayName = username;

  if (avatar) {
    const storage = firebase.storage();
    const avatarsUserRef = storage.ref(`images/avatars/${user.uid}`);
    const newAvatarRef = avatarsUserRef.child(`${avatar.name}`);
    const currentAvatar = await avatarsUserRef
      .listAll()
      .then(result => result.items[0])
      .catch(err => console.error(err));

    if (currentAvatar) {
      const currentAvatarRef = avatarsUserRef.child(`${currentAvatar.name}`);

      await currentAvatarRef.delete().catch(err => console.error(err));
    }

    await newAvatarRef.put(avatar).catch(err => console.error(err));

    await newAvatarRef
      .getDownloadURL()
      .then(url => {
        updateObj.photoURL = url;
      })
      .catch(err => console.error(err));
  }

  user.updateProfile(updateObj).catch(err => {
    handleError(err, 'alert');
  });
};

export const loginEmail = async (
  email: string,
  password: string,
  handleLoading: Function
): Promise<void> => {
  handleLoading(true);

  await firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(credential => {
      if (!credential.user.emailVerified) {
        alert('Please, verify your email before log in.');
      }
    })
    .catch(err => {
      handleLoading(false);
      handleError(err, 'alert');
    });
};

export const loginProvider = async (
  service: 'fb' | 'google',
  handleLoading: Function
): Promise<void> => {
  handleLoading(true);

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

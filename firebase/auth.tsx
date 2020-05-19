import * as firebase from 'firebase/app';
import 'firebase/firebase-auth';
import 'firebase/firebase-storage';

import {
  InitAuthObserver,
  CreateUser,
  UpdateUser,
  Logout,
  LoginEmail,
  LoginProvider,
  ResetPassword,
  Validator
} from 'types/auth';

export const logout: Logout = async () => {
  await firebase
    .auth()
    .signOut()
    .catch(err => console.error(err));
};

export const initAuthObserver: InitAuthObserver = (
  initUserFirebase,
  clearUserFirebase
) => {
  firebase.auth().onAuthStateChanged(
    user => {
      if (user) {
        if (user.emailVerified) {
          sessionStorage.setItem('uid', user.uid);

          initUserFirebase(user);
        } else {
          logout();
        }
      } else {
        sessionStorage.removeItem('uid');

        clearUserFirebase();
      }
    },
    err => console.error(err)
  );
};

export const createUser: CreateUser = async (email, password) => {
  await firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(credential => {
      credential.user.sendEmailVerification().catch(err => console.error(err));
      window.history.back();
    })
    .catch(err => alert(err));
};

export const updateUser: UpdateUser = async (user, username, avatar) => {
  if (!username && !avatar) {
    alert('No changes were made');

    return;
  }

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

  await user.updateProfile(updateObj).catch(err => alert(err));

  window.location.reload();
};

export const loginEmail: LoginEmail = async (
  email,
  password,
  handleLoading
) => {
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
      alert(err);
    });
};

export const loginProvider: LoginProvider = async (provider, handleLoading) => {
  handleLoading(true);

  let providerObj;

  switch (provider) {
    case 'fb':
      providerObj = new firebase.auth.FacebookAuthProvider();
      break;

    case 'google':
      providerObj = new firebase.auth.GoogleAuthProvider();
      break;
  }

  await firebase
    .auth()
    .signInWithRedirect(providerObj)
    .catch(err => console.error(err));

  await firebase
    .auth()
    .getRedirectResult()
    .catch(err => console.error(err));
};

export const resetPassword: ResetPassword = async email => {
  await firebase
    .auth()
    .sendPasswordResetEmail(email)
    .then(() => window.history.back())
    .catch(err => console.error(err));
};

export const validator: Validator = (password, passwordConfirm) => {
  let validPassword = false;
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

  if (count && upper && num && special) validPassword = true;

  return { validPassword, equalPasswords, count, upper, num, special };
};

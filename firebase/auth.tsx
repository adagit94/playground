import * as firebase from 'firebase/app';

export const initAuthObserver = (loggedIn, loggedOut): void => {
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

export const createUser = async (email, password): Promise<void> => {
  await firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .catch(err => console.error(err));
};

export const loginEmail = async (email, password): Promise<void> => {
  await firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch(err => console.error(err));
};

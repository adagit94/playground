import * as firebase from 'firebase/app';
import 'firebase/firebase-auth';

export const initAuthObserver = (
  loggedIn: Function,
  loggedOut: Function
): void => {
  firebase.auth().onAuthStateChanged(
    user => {
      if (user) {
        loggedIn(user);
      } else {
        console.log(1);
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
    .catch(err => console.error(err));
};

export const loginEmail = async (
  email: string,
  password: string
): Promise<void> => {
  await firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch(err => console.error(err));
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
//var credential = firebase.auth.EmailAuthProvider.credential(email, password);

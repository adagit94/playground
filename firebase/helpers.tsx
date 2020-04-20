import { users } from './collections';

export const getUser = (user): firebase.firestore.DocumentData => {
  const userData = users
    .doc(user)
    .get()
    .then(data => data.data())
    .catch(err => console.error(err));

  return userData;
};

export const initUser = (user, fields): void => {
  users
    .doc(user)
    .set(fields)
    .then(() => console.log('data uploaded'))
    .catch(err => console.error(err));
};

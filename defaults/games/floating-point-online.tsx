import { Player } from '../../types/games/floating-point-online';

const Defaults = {
  dimensions: 10
};

export const initPlayerDefaults = (user: firebase.User): Player => {
  return {
    username: user.displayName || user.email,
    avatar: user.photoURL,
    top: 0,
    left: 0,
    score: 0,
    isReady: false
  };
};

export default Defaults;

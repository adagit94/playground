import { InitPlayerDefaults } from '../../types/games/floating-point-online';

export const DEFAULTS = {
  dimensions: 10,
  timer: 180
};

export const initPlayerDefaults: InitPlayerDefaults = user => {
  return {
    username: user.displayName || user.email,
    avatar: user.photoURL,
    top: 0,
    left: 0,
    score: 0,
    isReady: false
  };
};

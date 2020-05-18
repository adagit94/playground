import { Player } from '../../types/games/floating-point-online';

export const DEFAULTS_GAME_FP = {
  dimensions: 10,
  timer: 180,
  initPlayerDefaults: (user: firebase.User): Player => {
    return {
      username: user.displayName || user.email,
      avatar: user.photoURL,
      top: 0,
      left: 0,
      score: 0,
      isReady: false
    };
  }
};

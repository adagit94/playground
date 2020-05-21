import {
  Defaults,
  InitGameDefaults,
  InitPlayerDefaults,
  CreateGame,
  CreatePlayer
} from 'types/games/floating-point-online';

export const DEFAULTS: Defaults = {
  dimensions: 90,
  timer: 5
};

export const initGameDefaults: InitGameDefaults = admin => {
  const gameDefaults: CreateGame = {
    admin,
    timer: DEFAULTS.timer
  };

  return gameDefaults;
};

export const initPlayerDefaults: InitPlayerDefaults = user => {
  const playerDefaults: CreatePlayer = {
    username: user.displayName || user.email,
    avatar: user.photoURL,
    isReady: false
  };

  return playerDefaults;
};

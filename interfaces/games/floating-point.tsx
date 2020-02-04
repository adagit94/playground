interface PlayersPlayer {
  top: number;
  left: number;
  score: number;
}

interface ParamsPlayer {
  shape: string;
  color: string;
}

interface Key {
  pressed: boolean;
  operation: string;
  direction: string;
  player: string;
  limit: string;
}

export interface ControlKeys {
  ArrowUp: Key;
  ArrowRight: Key;
  ArrowDown: Key;
  ArrowLeft: Key;
  w: Key;
  d: Key;
  s: Key;
  a: Key;
  i: Key;
  l: Key;
  k: Key;
  j: Key;
  '8': Key;
  '6': Key;
  '5': Key;
  '4': Key;
}

export interface StatesGame {
  players: number;
  state: string;
  mode: string;
  width: number;
  height: number;
}

export interface StatesPlayers {
  P1: PlayersPlayer;
  P2: PlayersPlayer;
  P3: PlayersPlayer;
  P4: PlayersPlayer;
}

export interface StatesParams {
  P1: ParamsPlayer;
  P2: ParamsPlayer;
  P3: ParamsPlayer;
  P4: ParamsPlayer;
  shapesOthers: Array<string>;
  colorsOthers: Array<string>;
  dimensions: number;
  speed: number;
}

export interface StatesFP {
  top: number;
  left: number;
}

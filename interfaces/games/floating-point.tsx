interface Positions {
  top: number;
  left: number;
}

interface Players {
  P1: PlayersPlayer;
  P2: PlayersPlayer;
  P3: PlayersPlayer;
  P4: PlayersPlayer;
  shapesOthers: Array<string>;
  colorsOthers: Array<string>;
}

interface PlayersPlayer {
  positions: Positions;
  shape: string;
  color: string;
  score: number;
}

interface DefaultsPlayer {
  color: string;
}

interface Key {
  pressed: boolean;
}

export interface Defaults {
  readonly P1: DefaultsPlayer;
  readonly P2: DefaultsPlayer;
  readonly P3: DefaultsPlayer;
  readonly P4: DefaultsPlayer;
  readonly dimensions: number;
  readonly speed: number;
  readonly fpPadding: number;
}

export interface Directions {
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

export interface InitStates {
  readonly isTurnedOn: boolean;
  readonly isRunning: boolean;
  readonly isPaused: boolean;
  readonly mode: string;
  readonly dimensions: number;
  readonly speed: number;
  readonly visibility: string;
  readonly players: Players;
  readonly fP: Positions;
}

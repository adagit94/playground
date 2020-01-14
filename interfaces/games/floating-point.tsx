interface PlayersPlayer {
  top: number;
  left: number;
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

export interface InitGame {
  readonly isTurnedOn: boolean;
  readonly isRunning: boolean;
  readonly isPaused: boolean;
  readonly mode: string;
  readonly dimensions: number;
  readonly speed: number;
  readonly visibility: string;
}

export interface InitPlayers {
  readonly P1: PlayersPlayer;
  readonly P2: PlayersPlayer;
  readonly P3: PlayersPlayer;
  readonly P4: PlayersPlayer;
  readonly shapesOthers: Array<string>;
  readonly colorsOthers: Array<string>;
}

export interface InitFp {
  readonly top: number;
  readonly left: number;
}

export interface Reducer {
  (state: object, action: object): object;
}

export interface Initializer {
  (initStates: InitGame | InitPlayers | InitFp): object;
}

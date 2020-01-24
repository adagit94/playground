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
  condition: string;
  operation: string;
  direction: string;
  player: string;
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

export interface Initializer {
  (initStates: InitGame | InitPlayers | InitFP | ControlKeys): object;
}

export interface InitGame {
  readonly players: number;
  readonly isTurnedOn: boolean;
  readonly isRunning: boolean;
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

export interface InitFP {
  readonly top: number;
  readonly left: number;
}

export interface Reducer {
  (state: any, action: any): any;
}

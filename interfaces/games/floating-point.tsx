interface PlayersPlayer {
  top: number;
  left: number;
  score: number;
}

interface ParamsPlayer {
  shape: string;
  color: string;
}

interface DefaultsPlayer {
  color: string;
}

interface Key {
  pressed: boolean;
  operation: string;
  direction: string;
  player: string;
}

interface Monitor {
  width: number;
  height: number;
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
  topLeft: Array<string>;
  bottom: Array<string>;
  right: Array<string>;
}

export interface Initializer {
  (initStates: InitGame | InitPlayers | InitParams | InitFP): object;
}

export interface InitGame {
  readonly players: number;
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
}

export interface InitParams {
  readonly P1: ParamsPlayer;
  readonly P2: ParamsPlayer;
  readonly P3: ParamsPlayer;
  readonly P4: ParamsPlayer;
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

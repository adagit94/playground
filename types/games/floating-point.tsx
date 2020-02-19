type PlayersPlayer = {
  top: number;
  left: number;
  score: number;
};

type ParamsPlayer = {
  shape: string;
  color: string;
};

type ChangePlayer = {
  type: 'changePlayer';
  operation: string;
  player: string;
};

export type Key = {
  operation: string;
  direction: string;
  player: string;
  limit: string;
};

export type ControlKeys = {
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
};

export type StatesGame = {
  players: Array<string | boolean>;
  state: Array<string>;
  mode: string;
  width: Array<number>;
  height: Array<number>;
};
export type StatesPlayers = {
  pressedKeys: Array<string>;
  P1: PlayersPlayer;
  P2: PlayersPlayer;
  P3: PlayersPlayer;
  P4: PlayersPlayer;
};

export type StatesParams = {
  P1: ParamsPlayer;
  P2: ParamsPlayer;
  P3: ParamsPlayer;
  P4: ParamsPlayer;
  shapesOthers: Array<string>;
  colorsOthers: Array<string>;
  dimensions: number;
  speed: number;
};

export type StatesFP = {
  top: number;
  left: number;
};

export type ActionsGame =
  | {
      type: 'changeState';
      state: string;
    }
  | {
      type: 'calculateDimensions';
      width: number;
      height: number;
    }
  | { type: 'changePlayers'; operation: string; pos: string };

export type ActionsPlayers =
  | {
      type: 'init';
      player: string;
      top: number;
      left: number;
    }
  | {
      type: 'recalculatePos';
      player: string;
      top: number;
      left: number;
    }
  | { type: 'move'; player: string; direction: string; operation: string }
  | { type: 'addScore'; player: string }
  | { type: 'changePressedKeys'; key: string; operation: string }
  | ChangePlayer;

export type ActionsParams =
  | { type: 'reset' }
  | {
      type: 'changeShape';
      player: string;
      operation: string;
      shape?: string;
    }
  | {
      type: 'changeColor';
      player: string;
      color: string;
    }
  | { type: 'changeDimensions'; dimensions: number }
  | { type: 'changeSpeed'; speed: number }
  | ChangePlayer;

export type ActionsFP = { type: 'move'; top: number; left: number };

export type Inits = StatesGame | StatesPlayers | StatesParams | StatesFP;

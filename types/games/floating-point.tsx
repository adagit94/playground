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

type Inits = StatesGame | StatesPlayers | StatesParams | StatesFP;

export type Key = {
  pressed: boolean;
  operation: string;
  direction: string;
  player: string;
  limit: string;
};

export type ControlKeys2P = {
  ArrowUp: Key;
  ArrowRight: Key;
  ArrowDown: Key;
  ArrowLeft: Key;
  w: Key;
  d: Key;
  s: Key;
  a: Key;
};

export type ControlKeys3P = ControlKeys2P & {
  i: Key;
  l: Key;
  k: Key;
  j: Key;
};

export type ControlKeys4P = ControlKeys3P & {
  '8': Key;
  '6': Key;
  '5': Key;
  '4': Key;
};

export type ControlKeys = ControlKeys2P | ControlKeys3P | ControlKeys4P;

export type PropsOptions = {
  player: string;
};

export type PropsButtons = {
  pos: string;
};

export type StatesGame = {
  players: Array<string | boolean>;
  state: string;
  width: Array<number>;
  height: Array<number>;
};

export type StatesPlayers = {
  P1: PlayersPlayer;
  P2: PlayersPlayer;
  P3: PlayersPlayer;
  P4: PlayersPlayer;
};

export type StatesParams = {
  shapesOthers: Array<string>;
  colorsOthers: Array<string>;
  dimensions: number;
  speed: number;
  P1: ParamsPlayer;
  P2: ParamsPlayer;
  P3: ParamsPlayer;
  P4: ParamsPlayer;
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
  | ChangePlayer;

export type ActionsParams =
  | { type: 'reset' }
  | {
      type: 'handleShape';
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

export type Init = (initStates: Inits) => any; // return Inits zpusobuje error (963)C:\_data\projects\GitHub\playground\node_modules\@types\react\index.d.ts

export type Dispatches = {
  game: React.Dispatch<ActionsGame>;
  players: React.Dispatch<ActionsPlayers>;
  params: React.Dispatch<ActionsParams>;
  fp: React.Dispatch<ActionsFP>;
};

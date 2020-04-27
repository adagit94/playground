type PlayersPlayer = {
  top: number;
  left: number;
  score: number;
};

type ChangePlayer = {
  type: 'changePlayer';
  operation: string;
  player: string;
};

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

export type PropsAvatar = {
  state: string;
  bg: string;
};

export type PropsOptions = {
  state: string;
  player: string;
};

export type PropsOptionsPlayer = {
  player: string;
};

export type PropsButtons = {
  pos: string;
};

export type StatesGame = {
  state: string;
  players: number;
  width: number;
  height: number;
};

export type StatesPlayers = {
  P1: PlayersPlayer;
  P2: PlayersPlayer;
  P3: PlayersPlayer;
  P4: PlayersPlayer;
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
      type: 'changeDimensions';
      width: number;
      height: number;
    }
  | { type: 'changePlayers'; operation: string };

export type ActionsPlayers =
  | {
      type: 'init';
      player: string;
      top: number;
      left: number;
    }
  | {
      type: 'move';
      player: string;
      operation: string;
      direction?: string;
      top?: number;
      left?: number;
    }
  | { type: 'addScore'; player: string }
  | ChangePlayer;

export type ActionsFP = { type: 'move'; top: number; left: number };

export type DispatchesFP = {
  game: React.Dispatch<ActionsGame>;
  players: React.Dispatch<ActionsPlayers>;
  fp: React.Dispatch<ActionsFP>;
};

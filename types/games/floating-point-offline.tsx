type PlayersPlayer = {
  top: number;
  left: number;
  score: number;
};

type ParamsPlayer = {
  icon: string;
  color: string;
};

type ChangePlayer = {
  type: 'changePlayer';
  operation: string;
  player: string;
};

type Icon = {
  viewBox: string;
  path: string;
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

export type PropsButton = {
  pos: string;
};

export type PropsButtons = { children: Array<JSX.Element> | JSX.Element };

export type StatesGame = {
  players: Array<boolean | string>;
  state: string;
  width: number;
  height: number;
  profile: string;
};

export type StatesPlayers = {
  P1: PlayersPlayer;
  P2: PlayersPlayer;
  P3: PlayersPlayer;
  P4: PlayersPlayer;
};

export type StatesParams = {
  iconsOthers: Array<string>;
  colorsOthers: Array<string>;
  size: number;
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
      type: 'changeDimensions';
      width: number;
      height: number;
    }
  | { type: 'changePlayers'; operation: string; pos: string }
  | { type: 'changeProfile'; player: string };

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

export type ActionsParams =
  | { type: 'reset' }
  | {
      type: 'handleIcon';
      player: string;
      operation: string;
      icon?: string;
    }
  | {
      type: 'changeColor';
      player: string;
      color: string;
    }
  | { type: 'changeDimensions'; size: number }
  | { type: 'changeSpeed'; speed: number }
  | ChangePlayer;

export type ActionsFP = { type: 'move'; top: number; left: number };

export type DispatchesFP = {
  game: React.Dispatch<ActionsGame>;
  players: React.Dispatch<ActionsPlayers>;
  params: React.Dispatch<ActionsParams>;
  fp: React.Dispatch<ActionsFP>;
};

export type Icons = {
  ball1: Icon;
  ball2: Icon;
  ball3: Icon;
  ball4: Icon;
};

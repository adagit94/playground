export type Player = {
  username: string;
  avatar: string;
  top: number;
  left: number;
  score: number;
  isReady: boolean;
};

export type PropsAvatar = {
  state?: string;
  avatar: string;
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
  [key: string]: Player;
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
      payload: StatesPlayers;
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
  | {
      type: 'changePlayer';
      operation: string;
      player: string;
      payload: Player;
    }
  | { type: 'changeReady'; player: string };

export type ActionsFP = { type: 'move'; top: number; left: number };

export type DispatchesFP = {
  game: React.Dispatch<ActionsGame>;
  players: React.Dispatch<ActionsPlayers>;
  fp: React.Dispatch<ActionsFP>;
};

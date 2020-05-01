type DataList = StatesGame | Player | StatesFP;

export type Player = {
  kind?: 'player';
  username: string;
  avatar: string;
  top: number;
  left: number;
  score: number;
  isReady: boolean;
};

export type UpdatePlayer = {
  username?: string;
  avatar?: string;
  top?: number;
  left?: number;
  score?: number;
  isReady?: boolean;
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
  kind?: 'game';
  state: string;
  width: number;
  height: number;
};

export type StatesPlayers = {
  [uid: string]: Player;
};

export type StatesFP = {
  kind?: 'fp';
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
  | { type: 'setData'; payload: StatesGame };

export type ActionsPlayers =
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
  | { type: 'setData'; payload: Player; uid: string };

export type ActionsFP =
  | { type: 'move'; top: number; left: number }
  | { type: 'setData'; payload: StatesFP };

export type DispatchesFP = {
  game: React.Dispatch<ActionsGame>;
  players: React.Dispatch<ActionsPlayers>;
  fp: React.Dispatch<ActionsFP>;
};

export type HandleChange = (data: DataList, key?: string) => void;

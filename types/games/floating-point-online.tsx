export type Player = {
  username: string;
  avatar: string;
  top: number;
  left: number;
  score: number;
  isReady: boolean;
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
  width: number;
  height: number;
};

export type UpdateGameFP = {
  state?: string;
};

export type StatesPlayers = { [uid: string]: Player };

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
  | { type: 'setData'; payload: object };

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
  | { type: 'setData'; payload: object; player?: string };

export type ActionsFP =
  | { type: 'move'; top: number; left: number }
  | { type: 'setData'; payload: object };

export type DispatchesFP = {
  game: React.Dispatch<ActionsGame>;
  players: React.Dispatch<ActionsPlayers>;
  fp: React.Dispatch<ActionsFP>;
};

type StatesList = 'game' | 'players' | 'player' | 'fp';

export type HandleData = (
  states: StatesList,
  statesObj: object,
  key?: string
) => void;

export type Operations = 'add' | 'subtract';

export type Directions = 'top' | 'left';

export type Limits = 'top' | 'right' | 'bottom' | 'left';

export type Position = { top: number; left: number };

type ActionsList = 'move' | 'changePos' | 'changeReady' | 'addScore';

export type UpdateRecordPlayer = (
  player: string,
  action: ActionsList,
  conf?: {
    move?: { operation: Operations; direction: Directions };
    changePos?: Position;
  }
) => Promise<void>;

export type GetRecordPlayers = () => Promise<StatesPlayers>;

export type UpdateRecordFP = (update: StatesFP) => Promise<void>;

export type CreateRecordPlayer = (user: firebase.User) => Promise<void>;

type Keys = 'ArrowUp' | 'ArrowRight' | 'ArrowDown' | 'ArrowLeft';

export type HandleMove = (key: Keys) => void;

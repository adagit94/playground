type Keys = 'ArrowUp' | 'ArrowRight' | 'ArrowDown' | 'ArrowLeft';

type DataSetsList = 'game' | 'players' | 'fp';

type GameStatesList = 'conf' | 'init' | 'run' | 'eval';

export type Winner = { name: string; score: number };

export type Player = {
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
  initPossible: boolean;
  setInitPossible?: React.Dispatch<React.SetStateAction<boolean>>;
};

export type StatesGame = {
  state: GameStatesList;
  admin: string;
  winner: Winner;
  timer: number;
  timestamp: number;
  width: number;
  height: number;
};

export type CreateGame = {
  admin: string;
  timer: number;
};

export type CreatePlayer = {
  username: string;
  avatar: string;
  isReady: boolean;
};

export type DataSet = {
  game: CreateGame;
  players: StatesPlayers;
  fp: StatesFP;
};

export type UpdateGame = {
  state?: GameStatesList;
  admin?: string;
  winner?: Winner;
  timer?: number;
  timestamp?: number;
  timestampEnd?: number;
};

export type StatesPlayers = { [uid: string]: Player };

export type StatesFP = { top: number; left: number };

export type ActionsGame =
  | {
      type: 'changeDimensions';
      width: number;
      height: number;
    }
  | { type: 'setData'; payload: any };

export type ActionsPlayers = { type: 'setData'; payload: any };

export type ActionsFP = { type: 'setData'; payload: StatesFP };

export type HandleData = (dataSet: DataSetsList, data: any) => void;

export type Operations = 'add' | 'subtract';

export type Directions = 'top' | 'left';

export type Limits = 'topLeft' | 'bottomRight';

export type UpdateDataFP = (update: StatesFP) => Promise<void>;

export type HandleMove = (key: Keys) => void;

export type Defaults = { dimensions: number; timer: number };

export type InitGameDefaults = (admin: string) => CreateGame;

export type InitPlayerDefaults = (user: firebase.User) => CreatePlayer;
